require('dotenv').config()

const express = require('express')
const app = express()
const Twit = require('twit')

let FOLLOWING = []

const server = app.listen(process.env.VUE_APP_NODE_PORT, function() {
  console.log(`Server started on port ${process.env.VUE_APP_NODE_PORT}`)
})

const io = require("socket.io")(server)

const T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

function startStream() {
  let stream = T.stream('statuses/filter', { follow: FOLLOWING })

  stream.on('tweet', function(tweet) {
    if (FOLLOWING.includes(tweet.user.id_str))
      io.emit('tweet', tweet)
  })
}

io.on('connection', function(socket) {
  socket.on('search', function(query) {
    T.get('users/search', { q: query }).then((result) => {
      socket.emit('users', result.data)
    })
  })

  socket.on('user', function(user_id) {
    T.get('users/show', { user_id: user_id }).then((result) => {
      socket.emit('user', result.data)
    })
  })

  socket.on('start', function(users) {
    FOLLOWING = users
    startStream()
  })
})
