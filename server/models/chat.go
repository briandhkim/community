package models

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"time"

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
	UID         string `json:"uid"`
	Text        string `json:"text"`
	FromUser    User   `json:"user"`
	DateCreated string `json:"dateCreated"`
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

func getChatMessagesSlice(c Chat) []Message {
	sql := `select 
				m.uid mUID, m.message, m.date_created,
				u.email, u.uid uUID, u.firstName, u.lastName
			from 
				messages m
			join
				users u
			on
				m.user_id = u.id
			where
				m.chat_id = (
					select id from chat where uid = ?
				)
			order by m.date_created desc
			limit 75`

	rows, err := DB.Query(sql, c.UID)
	if err != nil {
		log.Panic(err)
	}
	defer rows.Close()

	var ms = make([]Message, 0, 75)

	for rows.Next() {
		var mUID, txt, d, em, userUID, fn, ln string
		if err := rows.Scan(&mUID, &txt, &d, &em, &userUID, &fn, &ln); err != nil {
			log.Panic(err)
		}

		u := User{em, userUID, fn, ln, ""}

		t, _ := time.Parse("2006-01-02 15:04:05", d)
		dc := t.Format("Jan 02, 06 - 03:04pm")

		m := Message{mUID, txt, u, dc}

		ms = append(ms, m)
	}

	return ms
}

// LoadDMDataByUserUIDs handles...
func LoadDMDataByUserUIDs(aUID, bUID string) ([]byte, int) {

	c := getDMChatByUserUIDs(aUID, bUID)

	ms := getChatMessagesSlice(c)

	res := struct {
		C  Chat      `json:"chat"`
		MS []Message `json:"messages"`
	}{
		c,
		ms,
	}

	rj, _ := json.Marshal(res)
	return rj, http.StatusOK
}
