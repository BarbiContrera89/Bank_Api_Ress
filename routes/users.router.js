const {Router} = require ('express')
const { check } = require('express-validator')

const { historyUser, newUsers, loginUser } = require('../controllers/users.controller')
const { validateFields } = require('../middlewares/validateFields.middlewares')

const router = Router()

router.post('/signup', 
[
    check('name', 'The name must be mandatory').not().isEmpty(),
    check('password', 'The password must be mandatory').not().isEmpty(),
    validateFields
], newUsers)

router.post('/login', 
[
    check('accountNumber', 'The accountNumber must be mandatory').not().isEmpty(),
    check('password', 'The password musr be mandatory').not().isEmpty(),
    validateFields
], loginUser)

router.get('/:id/history', historyUser)

module.exports = {
    usersRouter: router
}