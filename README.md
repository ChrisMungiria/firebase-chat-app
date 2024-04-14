# React Native Real-time chat app created with Expo

### This is a simple real-time chat app created with React Native and Expo. The app uses Firebase Firestore as a backend and Firebase Authentication for user authentication.

## Features

- User authentication
- Real-time chat

## Technologies

- React Native
- Expo
- Firebase Firestore
- Firebase Authentication
- React Redux
- React Navigation

## Installation

1. Clone the repository
2. Install dependencies

```
npm install
```

3. Create a new Firebase project and add a web app to the project
4. Enable Firestore and Authentication in the Firebase console
5. Create a `.env` file in the root of the project and add the following environment variables

```
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
```

6. Run the app

```
npx expo start
```
