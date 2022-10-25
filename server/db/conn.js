const { MongoClient } = require('mongodb')
const Db = process.env.ATLAS_URI

let dbConnection

module.exports = {
    connectToServer: (cb) => {
        MongoClient.connect(Db)
            .then((client) => {
                dbConnection = client.db()
                return cb()
            })
            .catch(err => {
                console.log(err)
                return cb(err)
            })
    },
    getDb: () => dbConnection
}