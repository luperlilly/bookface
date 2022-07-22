# Bookface

## Database setup

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

## Installation

Run `npm install` from both the `./server` and `./client` directories.

## Running

Launch MongoDB with `mongod`.

Run `npm run dev` from the `./server` directory.
