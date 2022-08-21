const Event = require('../models/events')

const getEventos = async (req, res) => {

    const events = await Event.find().populate('user','name')
    res.json({
        ok: true,
        events
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
       
        res.status(500).json({
            ok: false,
            msg: 'contact admin'
        })
    }


}
const updateEvent = async(req, res) => {

const evenId = req.params.id
const uid = req.uid


try {
    const event = await Event.findById(evenId) 
    if(!event){
      return  res.status(404).json({
            ok:false,
            msg:'event not exist for id'
        })
    }
    if(event.user.toString() !== uid){
        return res.status(401).json({
            ok:false,
            msg:'this user dont have the privilige to update'
        })
    }

    const newEvent = {...req.body,user:uid}

    const updateEvent = await Event.findByIdAndUpdate(evenId,newEvent,{new:true})

    res.json({
        ok:true,
        msg:updateEvent
    })

    
} catch (error) {
    res.status(500).json({
        ok:false,
        msg:'contact with admin'
    })
}

   
}
const deleteEvent = async (req, res) => {
    const evenId = req.params.id
    const uid = req.uid

    try {
        const event = await Event.findById(evenId) 
        if(!event){
           return res.status(404).json({
                ok:false,
                msg:'event not exist for id'
            })
        }
        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'this user dont have the privilige to delete'
            })
        }
    
    
        await Event.findByIdAndDelete(evenId)
    
        res.json({
            ok:true,
            msg:'event was deleted'
        })
    
        
    }catch (error) {
        res.status(500).json({
            ok:false,
            msg:'contact with admin'
        })


   
    }


}
module.exports = { getEventos, createEvent, updateEvent, deleteEvent }