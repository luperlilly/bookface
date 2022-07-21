const PF = process.env.REACT_APP_PUBLIC_FOLDER

export const Users = [
  {
    id: 1,
    profilePicture: `${PF}default-profile.png`,
    username: 'Todd Bonzalez'
  },
  {
    id: 2,
    profilePicture: `${PF}default-profile.png`,
    username: 'Bobson Dugnutt'
  },
  {
    id: 3,
    profilePicture: `${PF}default-profile.png`,
    username: 'Dwigt Rortugal'
  },
]

export const Posts = [
  {
    id: 1,
    content: "Hello there",
    img: `${PF}ad.jpg`,
    date: "5 mins ago",
    userId: 2,
    likes: 2,
    comments: 2
  },
  {
    id: 2,
    content: "Oi oi",
    img: `${PF}ad.jpg`,
    date: "10 mins ago",
    userId: 1,
    likes: 2,
    comments: 2
  },
  {
    id: 3,
    content: "Alright",
    img: `${PF}ad.jpg`,
    date: "15 mins ago",
    userId: 3,
    likes: 2,
    comments: 2
  },
  {
    id: 4,
    content: "Yo",
    img: `${PF}ad.jpg`,
    date: "20 mins ago",
    userId: 1,
    likes: 22,
    comments: 25
  }
]