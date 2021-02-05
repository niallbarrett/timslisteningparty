require('dotenv').config()

const express = require('express')
const app = express()
const port = 4000
const Twit = require('twit')

// const TEST_ID = '1004998938804543489'
let FOLLOWING = []

const server = app.listen(`${port}`, function() {
  console.log(`Server started on port ${port}`)
})

const io = require("socket.io")(server)

const T = new Twit({
  consumer_key: process.env.VUE_APP_TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.VUE_APP_TWITTER_CONSUMER_SECRET,
  access_token: process.env.VUE_APP_TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.VUE_APP_TWITTER_ACCESS_TOKEN_SECRET
})

function startStream() {
  let stream = T.stream('statuses/filter', { follow: FOLLOWING })

  stream.on('tweet', function(tweet) {
    console.log(tweet, FOLLOWING.includes(tweet.user.id_str))
    if (FOLLOWING.includes(tweet.user.id_str))
      io.emit('tweet', tweet)
  })
}

io.on('connection', function(socket) {
  socket.on('search', function(query) {
    T.get('users/search', { q: query }, function(err, data, response) {
      socket.emit('users', data)
    })
  })

  socket.on('start', function(users) {
    FOLLOWING = users
    startStream()
  })
})
