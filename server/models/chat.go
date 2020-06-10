package models

import (
	"database/sql"
	"fmt"
	"log"

	uuid "github.com/satori/go.uuid"
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

func getDMChatByUserUIDs(aUID, bUID string) Chat {
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

	c := Chat{}
	if err != nil && err == sql.ErrNoRows {
		c, _ = createNewDMChat(aUID, bUID)
	} else {
		c = Chat{uid, n, ""}
	}

	return c
}

func insertNewDMChat() Chat {
	sql := `INSERT INTO chat
				(uid)
			VALUES
				(?)`
	stmt, _ := DB.Prepare(sql)
	defer stmt.Close()

	c := Chat{}
	for {
		uID, _ := uuid.NewV4()
		_, err = stmt.Exec(uID.String())

		if err == nil {
			c.UID = uID.String()
			break
		}
	}

	return c
}

func insertNewDMChatUsers(c Chat, aUID, bUID string) error {
	sql := `INSERT INTO chat_users
				(chat_id, user_id)
			VALUES
				((select id from chat where uid = ?), (select id from users where uid = ?)),
				((select id from chat where uid = ?), (select id from users where uid = ?))`

	stmt, _ := DB.Prepare(sql)
	defer stmt.Close()

	_, err = stmt.Exec(c.UID, aUID, c.UID, bUID)

	return err
}

func createNewDMChat(aUID, bUID string) (Chat, error) {

	c := insertNewDMChat()

	err := insertNewDMChatUsers(c, aUID, bUID)

	if err != nil {
		log.Panic(err)
	}

	return c, err
}

// LoadDMDataByUserUIDs handles...
func LoadDMDataByUserUIDs(aUID, bUID string) {

	c := getDMChatByUserUIDs(aUID, bUID)

	fmt.Println(c)
}
