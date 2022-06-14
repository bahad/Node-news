const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Comment = require('../models/comment')

router.get('/getComment', (req, res, next) => {
    Comment.find()
        .exec()
        .then(docs => {
            const response = {
                comments: docs.map(doc => {
                    return {
                        _id: doc._id,
                        body: doc.body,
                        date: doc.date,
                        userId: doc.userId,
                        username: doc.username,
                        newsUrl: doc.newsUrl,
                        likeCount: doc.likeCount,
                        dislikeCount: doc.dislikeCount,
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })

})

//GET BY NEWS
router.get('/getCommentByNews/:newsUrl', (req, res, next) => {
    Comment.find({ newsUrl: req.params.newsUrl })
        .exec()
        .then(docs => {
            const response = {
                comments: docs.map(doc => {
                    return {
                        _id: doc._id,
                        body: doc.body,
                        date: doc.date,
                        userId: doc.userId,
                        username: doc.username,
                        newsUrl: doc.newsUrl,
                        likeCount: doc.likeCount,
                        dislikeCount: doc.dislikeCount,
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

//GET BY USERS
router.get('/getCommentByUser/:userId', (req, res, next) => {
    Comment.find({ userId: req.params.userId })
        .exec()
        .then(docs => {
            const response = {
                comments: docs.map(doc => {
                    return {
                        _id: doc._id,
                        body: doc.body,
                        date: doc.date,
                        userId: doc.userId,
                        username: doc.username,
                        newsUrl: doc.newsUrl,
                        likeCount: doc.likeCount,
                        dislikeCount: doc.dislikeCount,
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.post('/', (req, res, next) => {
    const comment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        body: req.body.body,
        date: req.body.date,
        userId: req.body.userId,
        username: req.body.username,
        newsUrl: req.body.newsUrl,
        likeCount: req.body.likeCount,
        dislikeCount: req.body.dislikeCount,
    });
    comment.save().then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Added Comment Succesfully',
            createdComment: {
                id: result._id,
                body: result.body,
                date: result.date,
                userId: result.bodyuserId,
                username: req.body.username,
                newsUrl: result.newsUrl,
                likeCount: result.likeCount,
                dislikeCount: result.dislikeCount,

            }
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

});

router.delete('/:commentId', (req, res, next) => {
        Comment.remove({ _id: req.params.commentId })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: "Comment Deleted",
                })
            })
            .catch(err => {
                console.log(err);
                res.status(505).json({
                    error: err
                })
            })
   

})
module.exports = router