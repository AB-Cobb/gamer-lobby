const express = require('express');
const app = express();
const userRoute = express.Router();

let User = require('../models/User')

userRoute.route('/get-all-users').get((req, res) => {
    User.find((error, data) => {
        if (error) {
            console.log(error);
            return next(error);
        } else {
            res.json(data);
        }
    })
})

module.exports = userRoute;