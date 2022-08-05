const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user')
const auth = require('basic-auth')

router.get('/getUser', (req, res, next) => {
    const user = auth(req)
    const username = "bahad"
    const password = "123456ab"
    if (user && user.name.toLowerCase() === username.toLowerCase() && user.pass == password) {
        User.find()
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    users: docs.map(doc => {
                        return {
                            id: doc._id,
                            username: doc.username,
                            fullname: doc.fullname,
                            email: doc.email,
                            phone: doc.phone,
                            media: doc.media,
                            isApproved: doc.isApproved,
                            isBanned: doc.isBanned,
                            badges: doc.badges,
                            level: doc.level,
                            createdAt: doc.createdAt,
                            comments: doc.comments,
                            followers: doc.followers,
                            geometry: doc.geometry,
                        }
                    })
                }
                res.status(200).json(response);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            })
    }
    else {
        res.status(401).send('Authentication required.');
    }

})

router.post('/signup', (req, res, next) => {
    const dateToday = new Date()
    const timeStamp = Date.parse(dateToday)
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Email is already registered"
                })
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    }
                    else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId,
                            username: req.body.username,
                            password: hash,
                            fullname: req.body.fullname,
                            email: req.body.email,
                            phone: req.body.phone,
                            media: req.body.media,
                            isApproved: req.body.isApproved,
                            isBanned: req.body.isBanned,
                            badges: req.body.badges,
                            level: req.body.level,
                            createdAt: timeStamp,
                            comments: req.body.comments,
                            followers: req.body.followers,
                            geometry: req.body.geometry,
                        })
                        user
                            .save()
                            .then(result => {
                                console.log('SignUp Result:', result)
                                res.status(201).json({
                                    "message": "user created",
                                    "user": {
                                        "id": user._id,
                                        "email": user.username,
                                    }
                                })
                            })
                            .catch(err => {
                                console.log("Singup Error:", err)
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                })
            }
        })
        .catch()

})

router.delete('/:userId', (req, res, next) => {
    const user = auth(req)
    const username = "bahad"
    const password = "123456ab"
    if (user && user.name.toLowerCase() === username.toLowerCase() && user.pass == password) {
        User.remove({ _id: req.params.userId })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: "User Deleted",
                })
            })
            .catch(err => {
                console.log(err);
                res.status(505).json({
                    error: err
                })
            })
    }
    else {
        res.status(401).send('Authentication required.');
    }

})

router.post('/login', (req, res, next) => {
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    "message": "Authentication Failed"
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        "message": "Authentication Failed"
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        username: user[0].username,
                        userId: user[0]._id

                    }, "secret", {
                        expiresIn: "1d"
                    })
                    return res.status(200).json({
                        "message": "You have logged in successfully",
                        "token": token,
                        "user": {
                            "userId": user[0]._id,
                            "username": user[0].username,
                            "password": user[0].password,
                            "fullname": user[0].fullname,
                            "email": user[0].email,
                            "phone": user[0].phone,
                            "media": user[0].media,
                            "isBanned": user[0].isBanned,
                            "isApproved": user[0].isApproved,
                            "level": user[0].level,
                            "badges": user[0].badges,
                            "createdAt": user[0].createdAt,
                            "comments": user[0].comments,
                            "followers": user[0].followers,
                            "geometry": user[0].geometry,
                        }
                    })
                }
                return res.status(401).json({
                    "message": "Authentication Failed"
                })
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
});

//GET BY ID
router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
        //.select('_ id name star discountedPrice singlePrice doublePrice triblePrice fourPrice currency hotelImage country province adress website tel services photos comments meta')
        .exec()
        .then(doc => {
            if (doc) {
                const response = {
                    id: doc._id,
                    username: doc.username,
                    fullname: doc.fullname,
                    email: doc.email,
                    phone: doc.phone,
                    media: doc.media,
                    isApproved: doc.isApproved,
                    isBanned: doc.isBanned,
                    badges: doc.badges,
                    level: doc.level,
                    createdAt: doc.createdAt,
                    comments: doc.comments,
                    followers: doc.followers,
                    geometry: doc.geometry,
                }
                res.status(200).json({ "user": response });
            }
            else {
                res.status(404).json({ "message": "User not found" })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

//UPDATE

router.put('/:userID', (req, res, next) => {
    //const param = req.params.userID;
    User.findByIdAndUpdate(req.params.userID, req.body, { new: true })
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'User Updated'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

});


module.exports = router