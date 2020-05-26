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
// and user. The users in the map are the request recipients
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
// The users in the map are the request senders
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
