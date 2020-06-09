package models

import (
	"database/sql"
	"fmt"
	"log"
)

// Chat type associates users and messages to target chat group
type Chat struct {
	UID      string `json:"uid"`
	Name     string `json:"name"`
	Password string `json:"password"`
}

// Message contains the message content and the author information
type Message struct {
	UID      string `json:"uid"`
	Text     string `json:"text"`
	FromUser User   `json:"user"`
}

func getDirectMessageChatByUserUIDs(aUID, bUID string) (Chat, error) {
	var uid, n string

	s := `select 
				uid, name 
			from 
				chat 
			where id = (
				select 
					chat_id 
				from 
					chat_users 
				group by 
					chat_id
				having sum(
					case 
						when 
							user_id <> (select id from users where uid = ?) 
						and 
							user_id <> (select id from users where uid = ?)
						then 
							1 
							else 
							0 
					end
				) = 0
			)`

	err := DB.QueryRow(s, aUID, bUID).Scan(&uid, &n)
	if err != nil && err != sql.ErrNoRows {
		log.Panic(err)
	}

	c := Chat{uid, n, ""}

	return c, err
}

// LoadDirectMessageByUserUIDs handles...
func LoadDirectMessageByUserUIDs(aUID, bUID string) {
	c, err := getDirectMessageChatByUserUIDs(aUID, bUID)
	if err != nil && err == sql.ErrNoRows {
		// Create new chat and insert users in chat_users
	} else {
		fmt.Println(c)
		// Load messages here
	}
}
