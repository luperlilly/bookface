# Bookface

This is a Facebook clone built using the MERN stack. It has a React frontend, a Node/Express backend and a MongoDB database storing data for users and posts, with Redux state management.

Users can create an account, sign in, post, delete their own posts, follow/unfollow other users, like/unlike each others' posts, update their profile/cover pictures and display personal information on their profiles.

A user's profile displays only their posts, while the feed on their homepage displays posts from themselves and all the people they follow. They are unable to see the posts of users they don't follow, but they can visit their profile page to follow them.

<img width="1440" alt="bookface" src="https://user-images.githubusercontent.com/97295867/180749433-ce8919c6-ef14-4677-a6d9-cab26ab566f7.png">

---

## Video Demo

https://user-images.githubusercontent.com/97295867/181215897-4c97ac67-6ee0-4697-bd8b-74797cf7eeca.mp4

---

## Database Setup

Install MongoDB. If you are using a Mac you can do this via [Homebrew](https://brew.sh/):

```
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

Set your local MongoDB data directory, for example:

```
mkdir $HOME/mongodb-data
```

Start MongoDB:

```
mongod --dbpath $HOME/mongodb-data
```

Set your MongoDB URI:

```
echo MONGO_URI=mongodb://localhost:27017/bookface >> .env
```

---

## Installation

Run `npm install` from both the `./server` and `./client` directories.

---

## Running

Launch MongoDB with `mongod`.

Run `npm run dev` from the `./server` directory.

---

## Technologies Used

* React.js
* Node.js
* Express.js
* MongoDB
* Redux
* JSON Web Token
* Thunder Client
* Material UI/Icons

---

## Future Improvements

I'd like to add functionality for users to comment on posts, probably by creating a Comment component and model, storing the author's name from the currently logged-in user.

Live messaging is also something I plan to try at some point.

---

[Jonny Abrams](https://github.com/jonnyabrams)
