console.log('this is loaded');

var spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

var imdb = {
    id: process.env.IMDB_API_KEY
}

var BandsInTown = {
    id: process.env.BANDSINTOWN_API_KEY
}

module.exports = {
    spotify: spotify,
    imdb: imdb,
    BandsInTown: BandsInTown
}