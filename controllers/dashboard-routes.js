const router = require('express').Router();
const { User, Post, Comment } = require('../models')
const sequelize = require('../config/connection')

router.get('/', (req, res) => {
    Post.findAll({
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

            res.render('homepage', {
                posts,
                username: req.session.username,
                logged_in: req.session.loggedIn,

            })
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
})

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
})

router.get('/post/:id', (req, res) => {
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
            const post = dbPostData.get({ plane: true });

            post.user = JSON.parse(JSON.stringify(post.user));
            post.comments = JSON.parse(JSON.stringify(post.comments));


            res.render('single-post', {
                post,
                logged_in: req.session.loggedIn,
            })
        })

        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router