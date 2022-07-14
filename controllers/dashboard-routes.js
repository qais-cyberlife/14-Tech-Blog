const router = require('express').Router();
const { User, Post, Comment } = require('../../models')
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'created_at',
            'post_content'
        ],
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
            const posts = dbPostData.map(post => post.get({
                plain: true,
            }))

            res.render('dashboard', {
                posts,
                loggedIn: true,

            })
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.get('/edit/:id', withAuth, (req, res) => {

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
        const post = dbPostData.get({plane: true});
        res.render('edit-post', {
            post,
            loggedIn: true,
        })
        })

        .catch(err => {
            res.status(500).json(err)
        })
})

router.get('/create/', withAuth, (req,res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'created_at',
            'post_content'
        ],
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
            const posts = dbPostData.map(post => post.get({
                plain: true,
            }))

            res.render('create-post', {
                posts,
                loggedIn: true,
            })
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router