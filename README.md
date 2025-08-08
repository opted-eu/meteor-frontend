# Meteor Frontend

Code repository for the frontend, user facing web pages of the Meteor linked political data archive.

## Summary

Written in JSX and ES6 using the *ReactJS* framework and *node.js*

Fetches data from the Meteor API

Current state: **Production**

## Local Installation

- Install Node: https://nodejs.org/en/download
- Clone this repository
- set the server address in `.env` (e.g., `REACT_APP_API=https://meteor.opted.eu/api/`)
- run `npm install`
- start development server with `npm start`

## Production Deployment

- Clone this repository
- set the server address in `.env` (e.g., `REACT_APP_API=https://meteor.opted.eu/api/`)
- run `npm install`
- test server with `npm start`
- install `serve` as root user with `npm install -g serve`
- build the react app with `npm run build`
- Use `misc/meteor_frontend.service` to run it with system.d
- Reload systemctl: `sudo systemctl daemon-reload` & `sudo systemctl enable meteor_frontend.service`
- Pass the socket connection to your nginx configuration


## Troubleshooting
**Babel devdependencies issue**

npm install --save-dev @babel/plugin-proposal-private-property-in-object

https://stackoverflow.com/questions/76435306/babel-preset-react-app-is-importing-the-babel-plugin-proposal-private-propert
