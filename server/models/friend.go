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

// LoadFriendsByUID looks up a user's friends by and returns a json response
// containing a map of friend users with user uid key and User struct value.
func LoadFriendsByUID(uid string) ([]byte, int) {
	fm := getFriendUsersMapByUID(uid)

	res := struct {
		Friends map[string]User `json:"friends"`
	}{
		fm,
	}

	rj, _ := json.Marshal(res)
	return rj, http.StatusOK
}
