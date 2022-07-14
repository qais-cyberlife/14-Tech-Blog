const router = require('express').Router();
const { User, Post, Comment } = require('../../models')
const withAuth = require('../../utils/auth');

// Get all Users

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'created_at',
            'post_content'
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username', 'twitter', 'github']
                }
            },

            {
                model: User,
                attributes: ['username', 'twitter', 'github']
            }
        ]
    })
        .then(dbPostData => {
            res.json(dbPostData)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// Get Single Post
router.get('/', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },

        attributes: [
            'id',
            'title',
            'created_at',
            'post_content'
        ],

        include: [

            {
                model: User,
                attributes: ['username', 'twitter', 'github']
            },

            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username', 'twitter', 'github']
                }
            }
        ],
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({
                    message: "No Post Found with that ID"
                })
                return
            }
            res.json(dbPostData)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// Insert New Post API
router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        post_content: req.body.post_content,
        user_id: req.session.user_id,
    })
        .then(dbPostData => {
            res.json(dbPostData)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

// Update Post API 

router.put('/:id', withAuth, (req, res) => {
    Post.update({
        title: req.body.title,
        post_content: req.body.post_content,
    },

        {
            where: {
                id: req.params.id,
            }
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({
                    message: "No Post Found with that ID"
                })
                return
            }
            res.json(dbPostData)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// Delete Post ApI
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy ({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            
            res.status(404).json({
                message: "No Post Found with That ID!"
            })
         
        return               
        }

        res.json(dbPostData)
    })

    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router