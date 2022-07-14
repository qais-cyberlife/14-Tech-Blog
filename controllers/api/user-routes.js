const router = require('express').Router();
const { User, Post, Comment } = require('../../models')
const withAuth = require('../../utils/auth')

// Get User Api //
router.get('/', (req, res) => {
    User.findAll({
        attributes: {
            exclude: ['password'],

        }

    })
        .then(dbUserData => res.json(dbUserData)).catch(err => {
            console.log(err)
            res.status(500).json(err)

        })
})

//  Get User with ID API
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_content', 'created_at'],

            },


            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title'],
                }

            },
        ]
    })

        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({
                    message: 'No User Found with This ID!!'
                })
                return
            }
            res.json(dbUserData)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        github: req.body.github,
        twitter: req.body.twitter,
    })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.github = dbUserData.github;
                req.session.twitter = dbUserData.twitter;
                req.session.loggedIn = true;
                res.json(dbUserData)
            })
        })
})

// Login Route
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({
                message: "No User with that Email Address",
            })
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password)
        if (!validPassword) {
            res.status(400).json({
                message: "Wrong Password",
            })
            return;
        }
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.github = dbUserData.github;
            req.session.twitter = dbUserData.twitter;
            req.session.loggedIn = true;
            res.json({user: dbUserData, message: "You are Logged In!"})
        })
    })
})

// Logout Route
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
            req.session.destory (() => {
                res.status(204).end()
            })
    } else {
        res.status(404).end()
    }
})

// User Modification API
router.put('/:id', withAuth, (req,res) => {
    User.update (req.body, {
        individualHooks: true, 
        where: {
            id: req.params.id, 
        }
    })
    .then (dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({
                message: "No User Found with that ID!"
            })
            return
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

// User Delete API
router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id, 
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({
                message: "No User Found with that ID!"
            })            
            return
        }
        res.json(dbUserData)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router