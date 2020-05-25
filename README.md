## YAML | YetAnotherMessagingLink

### Project Overview

#### Frontend

* React
* Redux
* [MaterializeCSS](https://materializecss.com/getting-started.html)

#### Backend

* Golang

##### Features

- [x] Allow new user signup
- [x] Verify existing user login
- [x] Load friends list
- [ ] Search users by name or email
- [ ] Add users to friends list
- [ ] Delete users from friends list
- [ ] One-on-one messaging with users in friends list
- [ ] Group messaging with users

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

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

