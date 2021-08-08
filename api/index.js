const express = require('express');
const path = require('path');
const fs = require("fs");
// const { getPostById } = require('./stub/posts');
const app = express();

const PORT = process.env.PORT || 3000;
const indexPath  = path.resolve(__dirname, '..', 'build', 'index.html');

// static resources should just be served as they are
app.use(express.static(
    path.resolve(__dirname, '..', 'build'),
    { maxAge: '30d' },
));
// here we serve the index.html page
app.get('/*', (req, res, next) => {
    fs.readFile(indexPath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('Error during file reading', err);
            return res.status(404).end()
        }
        // get post info
        // const postId = req.query.id;
        // const post = getPostById(postId);
        // if(!post) return res.status(404).send("Post not found");

        // inject meta tags
        console.log(htmlData)
        htmlData = htmlData.replace(
            "<title>TITLEPLACEHOLDER/title>",
            `<title>TITLE CHANGE SUCCESS</title>`
        )
        return res.send(htmlData);
    });
});
// listening...
app.listen(PORT, (error) => {
    if (error) {
        return console.log('Error during app startup', error);
    }
    console.log("listening on " + PORT + "...");
});
