
# Klicker

Simple Express/React multiplayer clicking game</br>
This application is homework for Vincit's Summer Developer position.

## Introduction

Application consists of front- and backend. </br>
Backend is powered with Node.js/Express, and is used for data storage and manipulation.</br>
Frontend is ran by React, and is only used for displaying the data that is being fetched from backend API

## Setup

### Requirements:
  1) Node.js
  2) Git
  </br>
  
### Steps:
  1) git clone https://github.com/akkilp/Klicker.git
  2) cd .../Klicker/backend
  3) npm run init-install (Script for installing dependencies for front- backend)
  4) npm run dev (concurrently starts server & client side)

## Folder Structure
</br>
<pre>
Klicker 
|
|--backend
|  |-- app.js       --> Entry point for launching the server
|  |-- routes.js    --> Routes that API can be communicated with ( GET(READ), POST(CREATE), PATCH(UPDATE), PATCH(UPDATE/RESET) )
|  |-- functions.js --> Functionality for manipulating the data 
|  |-- serverData   --> Global variables which are being used as data storage
|
|--frontend --> Frontend has been created with create-react-app, 
|  |--public
|  |--src
|     |--App.cs --> All the css for the application
|     |--App.js --> Entry point for frontend
|     |--... rest of the original React files
|     |--components
|        |--game-button.js      --> Component that used with /PATCH requests
|        |--info-container.js   --> Middle-container with information about the points
|        |--logo.js             --> KLICKER -logo
|        |--message.container.js--> Upper container that shows the messages
|        |--nameform.js         --> When application is launched without user being known, nameform is rendered instead of
|                                   game-button and info-container
</pre>
                                    
