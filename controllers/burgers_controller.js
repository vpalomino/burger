var express = require('express')
var router = express.Router()
var burger = require('../models/burger.js')

router.get('/', function (req, res) {
    res.redirect('/index')
})

router.get('/index', function (req, res) {
    burger.selectAll(function (data) {
        var bObject = {
            burgers: data
        }
        res.render('index', bObject)
    })
})

router.post('/api/burgers', function (req, res) {
    burger.insertOne([
        'burger_name', 'devoured'
    ], [
            req.body.burger_name, false
        ], function (result) {
            res.json({ id: result.insertId })
        })
})

router.put('/api/burgers/:id', function (req, res) {
    var condition = 'id = ' + req.params.id

    console.log('condition', condition)

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function () {
        if (res.changedRows == 0) {
            return res.status(404).end()
        } else {
            res.status(200).end()
        }
    })
}) 

router.delete('/api/burgers/:id', function(req, res) {
    var condition = 'id = ' + req.params.id

    burger.deleteOne(condition, function(result) {
        if (result.affectedRows == 0) {
            return res.status(404).end()
        } else {
            res.status(200).end()
        }
    })
})

module.exports = router