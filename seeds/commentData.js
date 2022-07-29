// import Comment model
const  Comment  = require('../models/comments');

const commentData = [{
        // user_id: 1,
        teams_id: 4,
        comment_text: "best ever!"
    },
    {
        // user_id: 2,
        teams_id: 6,
        comment_text: "this is so cool"
    },
    {
        // user_id: 6,
        teams_id: 1, 
        comment_text: "WOAH! #1 team!"
    },
    {
        // user_id: 5,
        teams_id: 9,
        comment_text: "best team ever! "
    },
    {
        // user_id: 3,
        teams_id: 12, 
        comment_text: "love this team so much!"
    },
    {
        // user_id: 6,
        teams_id: 8,
        comment_text: "good work guys!"
    },
    {
        // user_id: 1,
        teams_id: 3,
        comment_text: "GREATEST GOAL SCORER OF ALL TIME!"
    },
    {
        // user_id: 4,
        teams_id: 31,
        comment_text: "good work!"
    },
]

// create variable to export data
const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;