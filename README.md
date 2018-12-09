# udacicards

## Description
This is a mobile app to build flashcards on any topic of choice. Users will be able to create decks, add cards to the decks and be able to take quizzes on the decks created.

## Features
Following features describe the app in detail
* Decks - Users can create deck with a title. Newly created deck appears in the home screen along with other decks. Users can also delete the decks.
* Cards - Users can navigate to any deck and add cards to them. A card is composed of a question and answer that the user would like to input about a particular topic. Users can add any number of cards to a given deck
* Quiz - Once cards have been added to a deck, users will then be able to take a quiz on a deck where the app shows the question and answer and let the user record their response to the question (whether they got it correct/incorrect). At the end of the quiz, results are displayed on how the user performed and options to retake the quiz. The app also sends a notification reminding the users to take the quiz if they haven't on a given day.

## Implementation Notes
The app was developed using react native library and is targeted to work on both android and ios devices. Deck and Card information is saved to the phone's local storage and doesnt make any connections to external services. App built using  [Create React Native App](https://github.com/react-community/create-react-native-app)

## Installation
To install the app, simply clone the repo and build it using
```
npm install
```
Start the app using npm or yarn and run
```yarn start``` or ```npm start```
To run the app, you will need the install [Expo](https://docs.expo.io/versions/latest/introduction/installation), following the steps to install iOS/android simulators. You can also run this app on your own device by downloading the expo app from the appstore and follow instructions to point to the server.
