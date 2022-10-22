const { ObjectId } = require('mongodb')
const express = require('express')
const { connectToDb, getDb } = require('./db')

const app = express()
app.use(express.json())

let db

connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log('app listening on port 3000')
        })
        db = getDb()
    }
})

app.get('/session', (req, res) => {
    let sessions = []

    db.collection('session')
        .find()
        .forEach(session => sessions.push(session))
        .then(() => {
            res.status(200).json(sessions)
        })
        .catch(() => {
            res.status(500).json({error: 'Could not fetch documents'})
        })
})

app.post('/session', (req, res) => {
    const session = req.body

    db.collection('session')
    .insertOne(session)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(() => {
        response.status(500).json({err: 'could not create new session'})
    })
})

app.get('/exercises', (req, res) => {
    let exercises = []

    db.collection('exercises')
        .find()
        .forEach(exercise => exercises.push(exercise))
        .then(() => {
            res.status(200).json(exercises)
        })
        .catch(() => {
            res.status(500).json({error: 'Could not fetch documents'})
        })
})

app.get('/exercises/arms', (req, res) => {
    let exercises = []

    db.collection('exercises')
        .find({ arms: { $exists: true } })
        .forEach(exercise => exercises.push(exercise))
        .then(() => {
            res.status(200).json(exercises)
        })
        .catch(() => {
            res.status(500).json({error: 'Could not fetch documents'})
        })
})