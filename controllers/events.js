const Event = require('../models/events')

const getEventos = (req, res) => {
    res.json({
        ok: true,
        msg: 'events'
    })
}
const createEvent = async (req, res) => {
    const event = new Event(req.body)

    try {

        event.user = req.uid
        const eventDb = await event.save()
        res.json({
            ok: true,
            eventDb
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'contact admin'
        })
    }


}
const updateEvent = (req, res) => {
    res.json({
        ok: true,
        msg: 'updateevents'
    })
}
const deleteEvent = (req, res) => {
    res.json({
        ok: true,
        msg: 'deleteevents'
    })


}
module.exports = { getEventos, createEvent, updateEvent, deleteEvent }