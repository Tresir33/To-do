# Welcome to my To-do list mobile app - quick summary👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app). 

Users create & save real-time task to help them organize the their daily task in a more managable manner.

## Pre-requirements

install node.js
install react native
install andriod studio/expo.dev 
install JDK 

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

3. Extra dependecies installation
    
    ```bash
    npm install @react-native-firebase/app
    ```
    ```bash
    npm install @react-native-firebase/auth
    ```
    ```bash
    npm install @react-native-async-storage/async-storage
    ```
    ```bash
    npm install firbase
    ```

4. Github

    ```bash/prompt/powershell etc...
    nevigate to project root & git clone git@github.com:MelvinAssi/FitnessDev.git
    ```

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Tech Stack

* Frontend: React-Native
* Backend: node.js
* Database: 
   - Firebase: save user auth, eg. username, email etc...
   - AsyncStorage: save task data
* test: 
   - Console for errors
   - Postman for API
* Deployment: Google store
* tools:
   - Trello: task manager
   - Github: Version control.
   - VSCode: Coding environment
        

## Project structure

* To-do/:
   - src/: Code source (components, config, screens, API, etc...)
   - .gitignore/: Ignore node_modules/, .vscode/.
   - eslint.config/:
   - App.tsx: main app view module
   - package.json : Dépendances.
   - package-lock.json : Existing versions.


## Functionality

* Sign-up: users register their email, password.
* log-in: users log in through email verification.
* Add task: add written task to storage.
* delete task: delete existing task.

## Technologies

* Trello
* Canvas
* VSCode
* Postman
* Github
