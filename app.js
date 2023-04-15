var createError = require('http-errors');
var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
app.use(logger('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var HTMLParser = require('node-html-parser');


app.get("/", async function(req, res) {

    console.log(req.body)

    // let info = [];
    // var root = HTMLParser.parse(data);
    await res.send("ok")

})


app.post("/a", async function(req, res) {

    let info = [];
    var root = HTMLParser.parse(req.body.htmldata);

    await root.querySelectorAll('li').forEach((node) => {
        info.push({
            jobtitle: node.querySelector('.sr-only').innerText,
            cname: node.querySelector('.hidden-nested-link').innerText,
            clogo: node.querySelector('.search-entity-media').innerHTML,
            location: node.querySelector('.job-search-card__location').innerText,
            time: (node.querySelector('.job-search-card__listdate')) ? node.querySelector('.job-search-card__listdate').innerText : null,
            link: node.querySelector('.base-card__full-link').rawAttributes.href.split("?")[0]
        })

    })


    res.send(info)

})

app.post("/b", async function(req, res) {

    let info = [];
    console.log(req.body.htmldata.length)

    //    var root = HTMLParser.parse(req.body.htmldata);

    // await root.querySelectorAll('li').forEach((node) => {
    //     info.push({
    //         jobtitle: node.querySelector('.sr-only').innerText,
    //         cname: node.querySelector('.hidden-nested-link').innerText,
    //         clogo: node.querySelector('.search-entity-media').innerHTML,
    //         location: node.querySelector('.job-search-card__location').innerText,
    //         time: (node.querySelector('.job-search-card__listdate')) ? node.querySelector('.job-search-card__listdate').innerText : null,
    //         link: node.querySelector('.base-card__full-link').rawAttributes.href.split("?")[0]
    //     })

    // })


    res.send(info)

})







app.listen(8080)