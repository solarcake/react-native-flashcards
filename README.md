# Flash Cards for mobile

**Test you quiz skills with flash cards, an application for android and and ios, this application is built using react native**

## Prerequities

This app is not available on the app stores as of yet.  To run it on both ios and android the following software must be installed. You can alternatively also run this software on expo

- expo (install expo app on you mobile phone) - instructions are available here on how to do this for ios and android https://expo.io/ 

-  install android studio (https://developer.android.com/studio/install.html) this will enable you to run the application on the android simulator

- install xcode, this would enable you to run the application on ios simulator (https://developer.apple.com/xcode)

- yarn must be installed on your application machine (https://yarnpkg.com/lang/en/docs/install/) this is a package manager

## Compatability

This application has been built with react native with support for both ios and adroid

## Starting the application

- make sure you have your android simulator and ios simulator running on your computer (if this is were you are testing the applicaiton)

- if running through expo make sure you have this installed on your mobile device and that you are connected to the same network as your PC.

Simply run **yarn start** in the application directory to bring up the application

- click i to bring up the ios simulator
- a for android simulator 
- q to display your qr code for expo, go to yout mobile phone and scan the code in the expo app. This would launch the expo app on your phone

## Overview

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

Below you'll find information about performing common tasks. The most recent version of this guide is available [here](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md).


The application has the following features

- Add a deck for your quiz
- Add multiple cards for a deck, this will represent the question and answers for your quiz
- Start a quiz (see if you got a correct answer or not)
- Results are given in percentage after the quiz is done
- notifications are also provided if you did not take a quiz in the given day