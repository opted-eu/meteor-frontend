# Meteor Frontend

Code repository for the frontend, user facing web pages of the Meteor linked political data archive.

## Summary

Written in JSX and ES6 using the *ReactJS* framework and *node.js*

Fetches data from the Meteor API

Current state: **Beta**

## Local Installation

- Clone this repository
- set the server address in `.env` (e.g., `REACT_APP_API=https://meteor.opted.eu/api/`)
- run `npm install`
- start development server with `npm run start`

## Troubleshooting
**Babel devdependencies issue**

npm install --save-dev @babel/plugin-proposal-private-property-in-object

https://stackoverflow.com/questions/76435306/babel-preset-react-app-is-importing-the-babel-plugin-proposal-private-propert
