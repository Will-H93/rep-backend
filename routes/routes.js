const express = require('express')
const recordRoutes = express.Router();
const { connectToServer, getDb } = require("../db/conn")

let db
connectToServer((err) => {
    if (!err) {
        db = getDb()
    }
})

recordRoutes.get('/session', (req, res) => {
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

recordRoutes.post('/session', (req, res) => {
    const session = req.body

    db.collection('session')
    .insertOne(session)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(() => {
        res.status(500).json({err: 'could not create new session'})
    })
})

recordRoutes.get('/exercises', (req, res) => {
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

recordRoutes.get('/exercises/arms', (req, res) => {
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

module.exports = recordRoutes;