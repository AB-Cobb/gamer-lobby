const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Player = new Schema({
    player_name: {
        type: String
    },
    player_rank: {
        type: Number
    },
    player_score: {
        type: Number
    },
    player_time: {
        type: Number
    },
    player_fav_game: {
        type: String
    },
    player_satus: {
        type: Boolean
    }
})

module.exports = mongoose.model('Player', Player)