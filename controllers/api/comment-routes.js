const router = require('express').Router();
const { User, Post, Comment } = require('../../models')
const withAuth = require('../../utils/auth')

// Get All Comments
router.get('/', (req, res) => {
    Comment.findAll({})
        .then(dbCommentData => {
            res.json(dbCommentData)
        })

        .catch(err => {
            res.status(500).json(err)
        })
})

// Insert a New Comment API 
router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        })
            .then(dbCommentData => {
                res.json(dbCommentData)
            })

            .catch(err => {
                res.status(400).json(err)
            })
    }
})

// Delete COmment API
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id,

        }

    })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json(
                    {
                        message: "No Comment Found with that ID?"
                    }
                )
            return
            }
            res.json(dbCommentData)
        })
        
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router