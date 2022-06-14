# Expense Tracker

A basic expense tracking web app where users login to their account to view, add, update and delete expenses.

## Tech Stack

- React and css modules for the frontend UI
- Firebase 9 backend for database and authorization
- CRUD operations

### NOTES

This app is an extension of an assignment from the course: [Build Websites with React & Firebase](https://netninja.dev/p/build-websites-with-react-firebase). I added to the project in several key ways:
- updated the code from Firebase 8 to Firebase 9 modules
- updated the routing to React Router 6
- added Edit/Update operations, so the user can edit/update their entries
- added an overview section to include: an editable initial budget amount, and coded mathematical functions for the amount spent and the remainder values
- added input logic so users can only enter amounts with upto 2 decimals, no negative values and no empty values.

To develop with Firebase 9, I referred to these repositories and tutorials:
  - [Firebase-user-auth](https://github.com/Tammibriggs/Firebase_user_auth/blob/main/src/App.js)
  - [react-firebase-authentication](https://github.com/machadop1407/react-firebase-authentication)
  - [Getting Started with Firebase 9](https://www.youtube.com/playlist?list=PL4cUxeGkcC9jERUGvbudErNCeSZHWUVlb)

For working with multiple collections in Cloud Firestore:
  - [Understanding Collection Group Queries in Cloud Firestore](https://firebase.blog/posts/2019/06/understanding-collection-group-queries)
