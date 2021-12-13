const mongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;
var express = require("express")
var app = express()
const PORT = 3000;
const path = require('path');
const opers = require("./modules/Operations.js")
var formidable = require('formidable');
app.use(express.json());
console.log(opers)

let _db;
let server
let list
let currentDB

app.use(express.static('static'))

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/index.html"))
})


app.post("/connect", function (req, res) {
    server = req.body.server
    console.log(req.body);
    console.log("connecting...")
    setDBs(req, res)
})
app.post('/addDB', function (req, res) {
    const newDB = req.body.newDB
    mongoClient.connect("mongodb://" + server + "/" + newDB, function (err, db) {
        if (err) console.log("nie działa :(")
        else {
            opers.addDB(db)
            res.end(JSON.stringify({ newDB: newDB }))
        }
    })
})
app.post('/delDB', function (req, res) {
    const delDB = req.body.delDB
    mongoClient.connect("mongodb://" + server + "/" + delDB, function (err, db) {
        if (err) console.log("nie działa :(")
        else {
            opers.delDB(db)
        }
    })
    setDBs(req, res)
})

app.post("/showCols", function (req, res) {
    currentDB = req.body.currentDB
    console.log(req.body);
    showCols(req, res)
})

app.post('/addCol', function (req, res) {
    const newCol = req.body.newCol
    console.log(newCol)
    mongoClient.connect("mongodb://" + server + "/" + currentDB, function (err, db) {
        if (err) console.log("nie działa :(")
        else {
            opers.addCol(db, newCol)
            res.end(JSON.stringify({ newCol: newCol }))
        }
    })
})
app.post('/delCol', function (req, res) {
    const delCol = req.body.delCol
    mongoClient.connect("mongodb://" + server + "/" + currentDB, function (err, db) {
        if (err) console.log("nie działa :(")
        else {
            opers.delCol(db, delCol)
        }
    })
    showCols(req, res)
})

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

function setDBs(req, res) {
    mongoClient.connect("mongodb://" + server + "/IgorSwierczynski", function (err, db) {
        if (err) {
            const list = "error"
            res.end(JSON.stringify(list, null, 5))
        }
        else {
            db.createCollection("defaultCol", function (errrr, coll) { })
            _db = db;
            console.log("Connected")
            opers.showDB(db, function (list) {
                res.end(JSON.stringify(list))
            })
        }
    })
}
function showCols(req, res) {
    mongoClient.connect("mongodb://" + server + "/" + currentDB, function (err, db) {
        if (err) {
            const list = "error"
            res.end(JSON.stringify(list, null, 5))
        }
        else {
            _db = db;
            console.log("Db - " + currentDB)
            opers.showCol(db, function (list) {
                console.log(list)
                res.end(JSON.stringify(list))
            })
        }
    })
}