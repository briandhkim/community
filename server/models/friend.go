package models

import (
	"encoding/json"
	"log"
	"net/http"
)

func getFriendUserSliceByUID(uid string) []User {
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
						select
							id
						from
							users
						where
							uid = ?)
				union distinct
					select
						user_b_id as userID
					from
						friends
					where
						user_a_id = (
						select
							id
						from
							users
						where
							uid = ?) )
			order by
				lastName asc`

	rows, err := DB.Query(sql, uid, uid)
	if err != nil {
		log.Panic(err)
	}
	defer rows.Close()

	var us []User

	for rows.Next() {
		var em, uid, fn, ln string
		if err := rows.Scan(&em, &uid, &fn, &ln); err != nil {
			log.Panic(err)
		}

		u := User{em, uid, fn, ln, ""}
		us = append(us, u)
	}

	return us
}

// LoadFriendsByUID looks up a user's friends by and returns a json response
// containing a slice of friend users.
func LoadFriendsByUID(uid string) ([]byte, int) {
	fs := getFriendUserSliceByUID(uid)

	res := struct {
		Friends []User `json:"friends"`
	}{
		fs,
	}

	rj, _ := json.Marshal(res)
	return rj, http.StatusOK
}
