module.exports = {

    //select - zwraca tablicę pasujących dokumentów, z ograniczeniem do {login:"test"}

    showDB: function (db, callback) {
        db.admin().listDatabases(function (err, dbs) {
            if (err)
                console.log(err)
            else {
                const list = dbs.databases.map(item => {
                    if (item.name != "admin" && item.name != "config" && item.name != "local")
                        return item.name
                })
                callback(list)
            }
        })
    },

    showCol: function (db, callback) {
        db.listCollections().toArray(function (err, colls) {
            if (err) console.log(err)
            else {
                const listCols = colls.map(item => {
                    return item.name
                });
                callback(listCols)
            }
        });
    },

    delDB: function (db) {
        db.dropDatabase(function (err, res) {
            if (err) console.log(err)
            console.log(db + " - usunięto")
        })
    },

    addDB: function (db) {
        db.createCollection("defaultCol", function (err, coll) {
            console.log("defaultCol were added")
        })
    },

    addCol: function (db, newCol) {
        db.createCollection(newCol, function (err, coll) {
            console.log(coll, " were added")
        })
    },
    delCol: function (db, col) {
        console.log(col)
        db.collection(col).drop(function (err, delOK) {
            if (err) throw err
            else console.log(`powiedzmy że ${col} została usunięta`)
        })

    },
    addDoc: function (db, col, obj, callback) {
        db.collection(col).insertOne(obj, function (err, res) {
            if (err) throw err;
            else {
                console.log("created doc")
                callback()
            }
        })
    },
    showDocs: function (db, col, callback) {
        db.collection(col).find({}).toArray(function (err, res) {
            callback(res)
        })
    },
    delDoc: function (db, col, id, callback) {
        db.collection(col).deleteOne({ "_id": id }, function (err, res) {
            if (err) throw err;
            else {
                console.log("created doc")
                callback()
            }
        })
    }

}