const { MongoClient } = require('mongodb')
const Db = 'mongodb+srv://repapproot:6xSrXGO5cCtOtK5F@cluster0.v6zsnxn.mongodb.net/?retryWrites=true&w=majority'

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