require('dotenv').config()

const express = require('express')
const app = express()
const port = 4000
const Twit = require('twit')

const server = app.listen(`${port}`, function() {
  console.log(`Server started on port ${port}`)
})

const io = require("socket.io")(server)

// const T = new Twit({
//   consumer_key: process.env.VUE_APP_TWITTER_CONSUMER_KEY,
//   consumer_secret: process.env.VUE_APP_TWITTER_CONSUMER_SECRET,
//   access_token: process.env.VUE_APP_TWITTER_ACCESS_TOKEN_KEY,
//   access_token_secret: process.env.VUE_APP_TWITTER_ACCESS_TOKEN_SECRET
// })

// let stream = T.stream('statuses/filter', { follow: ['1004998938804543489'] })

// stream.on('tweet', function(tweet) {
//   console.log(tweet)
//   io.emit('tweet', tweet)
// })
