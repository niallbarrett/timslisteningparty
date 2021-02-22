# timslisteningparty

An application for [#TimsListeningParty](https://timstwitterlisteningparty.com). Grab a beer and listen along through Spotify while following realtime tweets from selected users, all in one place. Uses the Twitter and Spotify APIs.

## Prerequisites

You will need to have both [yarn](https://yarnpkg.com) and [Node.js](https://nodejs.org/en) installed on your system. Include a `.env` file in the project root. This contains your secret Twitter and Spotify API credentials along with global port settings:

```
# Ports
VUE_APP_PORT=8080
VUE_APP_NODE_PORT=4000
# Twitter API
TWITTER_CONSUMER_KEY=
TWITTER_CONSUMER_SECRET=
TWITTER_ACCESS_TOKEN_KEY=
TWITTER_ACCESS_TOKEN_SECRET=
# Spotify API
VUE_APP_SPOTIFY_CLIENT_ID=
```

- [Install Node.js](https://nodejs.org/en)
- [Install Yarn using Chocolatey](https://chocolatey.org/install)
- [Get Twitter developer credentials](https://developer.twitter.com/en)
- [Get Spotify developer credentials](https://developer.spotify.com/dashboard/login)

## Setup

Download, cd to the project folder and simply double-click `run.bat`. 

Alternatively, you can run:

```
yarn
```

...which will download and build the required packages. Start the server with:

```
node server.js
```

and run the application:

```
yarn serve
```
