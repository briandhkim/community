## YAML | YetAnotherMessagingLink

### Project Overview

#### Frontend

* React
* Redux
* [MaterializeCSS](https://materializecss.com/getting-started.html)

#### Backend

* [Golang](https://golang.org/)

#### Other

* [Electron](https://www.electronjs.org/)
    * just for fun.

##### Features

- [ ] User
    - [x] Allow new user signup
        - [x] Check if email is already being used
    - [x] Returning user login
    - [ ] Edit account details
    - [ ] Delete account
- [ ] Social
    - [x] Load friends list
        - [ ] Show users that are online
    - [ ] Search users by name or email
        - [x] Add "friend" label to users that are friends
        - [x] Show option to add user as friend for users that are not in the friends list
        - [ ] Show option to load more users matching the search
    - [x] Add users to friends list
        - [x] Send friend requests
        - [x] Show friend requests
        - [x] Accept friend requests
        - [x] Reject friend requests
    - [ ] Delete users from friends list
    - [x] One-on-one messaging with users in friends list
    - [ ] Group messaging with users
- [ ] Other
    - [ ] Show user stats on home
        - [ ] messages sent
        - [ ] messages received
        - [ ] active chats
        - [ ] friends
    - [ ] Set up migration
    - [ ] Set up electron
        - [x] configure electron for development
        - [ ] configure electron for production

### Development Details

#### Frontend scripts

###### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

###### `npm test` - this project does not contains tests yet

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

###### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### Backend scripts

###### `go fmt ./...`

Format the go source code.

See [The Go Blog](https://blog.golang.org/gofmt) for more information.

###### `go run *.go`

Run this in the `/server` directory. Starts the server that will listen for request on port `:8080`
`pakcage.json` file has a `proxy` setting that connects the frontend requests to the backend server.

#### Electron scripts

###### `npm run electron`

During development: run `npm run electron` **after** running `npm start` and the app displays in the browser.

References: 
- [Medium article for setting up React with Electron](https://medium.com/@brockhoff/using-electron-with-react-the-basics-e93f9761f86f)
- [Freecode camp tutorial for setting up React & Electron](https://www.freecodecamp.org/news/building-an-electron-application-with-create-react-app-97945861647c/#:~:text=Electron%20and,is%20Facebook's%20JavaScript%20view%20framework.&text=And%20Electron%20is%20GitHub's%20framework,platform%20desktop%20apps%20in%20JavaScript.&text=Most%20use%20webpack%20for%20the%20configuration%20necessary%20for%20React%20development.)

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

