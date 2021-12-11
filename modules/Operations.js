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
    addDB: function (db) {
        db.createCollection("defaultCol", function (err, coll) {
            console.log(coll.name, "defaultCol were added")
        })
    },

    delDB: function (db) {
        db.dropDatabase(function (err, res) {
            if (err) console.log(err)
            db.close()
        })
    },



}