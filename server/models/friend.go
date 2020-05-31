package models

import (
	"encoding/json"
	"log"
	"net/http"
)

func getFriendUsersMapByUID(uid string) map[string]User {
	sql := `select
				email, uid, firstName, lastName
			from
				users
			where
				id in (
					select
						user_a_id as userID
					from
						friends
					where
						user_b_id = (
							select id from users where uid = ?
						)
					union distinct
					select
						user_b_id as userID
					from
						friends
					where
						user_a_id = (
							select id from users where uid = ?
						) 
				)
			and
				date_deleted is null
			order by
				lastName asc`

	rows, err := DB.Query(sql, uid, uid)
	if err != nil {
		log.Panic(err)
	}
	defer rows.Close()

	var fm = make(map[string]User)

	for rows.Next() {
		var em, uid, fn, ln string
		if err := rows.Scan(&em, &uid, &fn, &ln); err != nil {
			log.Panic(err)
		}

		u := User{em, uid, fn, ln, ""}
		fm[uid] = u
	}

	return fm
}

// GetFriendsByUserUID looks up a user's friends by and returns a json response
// containing a map of friend users with user uid key and User struct value.
func GetFriendsByUserUID(uid string) ([]byte, int) {
	fm := getFriendUsersMapByUID(uid)

	res := struct {
		Friends map[string]User `json:"friends"`
	}{
		fm,
	}

	rj, _ := json.Marshal(res)
	return rj, http.StatusOK
}

// getFriendRequestRecipientsByUserUID looks up the friend requests that have
// been sent by a user and returns a map with key value pair of user UID
// and user.
// The users in the map are the users that will receive friend requests by the logged in user.
func getFriendRequestRecipientsByUserUID(uid string) map[string]User {
	sql := `select 
				email, uid, firstName, lastName 
			from 
				users
			where 
				id in (
					select 
						fr.to_user 
					from 
						friend_requests fr
					join 
						users u 
					on 
						u.id = fr.from_user
					where 
						u.uid = ?
					and 
						u.date_deleted is null 
					and 
						fr.date_deleted is null
				)`

	rows, err := DB.Query(sql, uid)
	if err != nil {
		log.Panic(err)
	}
	defer rows.Close()

	var rs = make(map[string]User)

	for rows.Next() {
		var em, uid, fn, ln string
		if err := rows.Scan(&em, &uid, &fn, &ln); err != nil {
			log.Panic(err)
		}

		u := User{em, uid, fn, ln, ""}
		rs[uid] = u
	}

	return rs
}

// getFriendRequestSendersByUserUID looks up the friend requests that
// a user received and returns a map with key value pair of user UID and user.
// The users in the map are the users that sent the friend request to the logged in user.
func getFriendRequestSendersByUserUID(uid string) map[string]User {
	sql := `select 
				email, uid, firstName, lastName 
			from 
				users
			where 
				id in (
					select 
						fr.from_user 
					from 
						friend_requests fr
					join 
						users u 
					on 
						u.id = fr.to_user
					where 
						u.uid = ?
					and 
						u.date_deleted is null 
					and 
						fr.date_deleted is null
				)`

	rows, err := DB.Query(sql, uid)
	if err != nil {
		log.Panic(err)
	}
	defer rows.Close()

	var rs = make(map[string]User)

	for rows.Next() {
		var em, uid, fn, ln string
		if err := rows.Scan(&em, &uid, &fn, &ln); err != nil {
			log.Panic(err)
		}

		u := User{em, uid, fn, ln, ""}
		rs[uid] = u
	}

	return rs
}

// GetFriendRequestDataByUserUID looks up the friend requests received
// and sent by the user with the provided UID
func GetFriendRequestDataByUserUID(uid string) ([]byte, int) {

	rrm := getFriendRequestRecipientsByUserUID(uid)
	rsm := getFriendRequestSendersByUserUID(uid)

	res := struct {
		RequestRecipients map[string]User `json:"requestRecipients"`
		RequestSenders    map[string]User `json:"requestSenders"`
	}{
		rrm,
		rsm,
	}

	rj, _ := json.Marshal(res)
	return rj, http.StatusOK
}

func insertNewFriendRequest(fromUserUID string, toUserUID string) error {

	sql := `INSERT INTO friend_requests 
				(from_user, to_user)
			VALUES
				(
					(select id from users where uid = ?),
					(select id from users where uid = ?)
				)
			ON DUPLICATE KEY UPDATE
				date_deleted = null`
	stmt, _ := DB.Prepare(sql)
	defer stmt.Close()

	_, err := stmt.Exec(fromUserUID, toUserUID)

	return err
}

// SendFriendRequest inserts a new friend request row based on user UIDs provided
// from the POST request.
func SendFriendRequest(fromUserUID string, toUserUID string) ([]byte, int) {

	err := insertNewFriendRequest(fromUserUID, toUserUID)

	s := true
	sc := http.StatusCreated

	if err != nil {
		s = false
		sc = http.StatusOK
	}

	res := struct {
		Success bool `json:"success"`
	}{
		s,
	}

	rj, _ := json.Marshal(res)
	return rj, sc

}

func deleteFriendRequestByUserData(fromUserUID string, toUserUID string) error {

	sql := `UPDATE 
				friend_requests
			SET
				date_deleted = CURRENT_TIMESTAMP
			WHERE
				from_user = (select id from users where uid = ?)
			AND
				to_user = (select id from users where uid = ?)
			LIMIT 1`

	_, err := DB.Exec(sql, fromUserUID, toUserUID)

	return err
}

// RejectFriendRequest soft deletes a friend request based on the user UIDs provided
// from the POST request.
func RejectFriendRequest(fromUserUID string, toUserUID string) ([]byte, int) {

	err := deleteFriendRequestByUserData(fromUserUID, toUserUID)

	s := true
	sc := http.StatusAccepted

	if err != nil {
		s = false
		sc = http.StatusOK
	}

	res := struct {
		Success bool `json:"success"`
	}{
		s,
	}

	rj, _ := json.Marshal(res)
	return rj, sc

}
