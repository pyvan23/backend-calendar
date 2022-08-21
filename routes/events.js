const { Router, application } = require('express');
const { getEventos, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const router = Router();
const { validateFields } = require('../middlewares/validate-fields')
const  { validateJWT } = require('../middlewares/validateJwt')
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');
//api/events

router.use(validateJWT)

router.get('/', getEventos);

router.post('/', 
[
check('title','Title is require').not().isEmpty(),
check('start','Start Date is require').custom( isDate ),
check('end','End date is require').custom( isDate ),
validateFields
],createEvent );

router.put('/:id', [],updateEvent);

router.delete('/:id', [], deleteEvent);


module.exports = router;












