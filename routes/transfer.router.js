const { Router } = require('express');
const { check } = require('express-validator');
const { transfer } = require('../controllers/transfer.controller');
const { validateFields } = require('../middlewares/validateFields.middlewares');

const router = Router();

router.post(
  '/',
  [
    check('sendUserId').not().isEmpty,
    check('receiverUserId').not().isEmpty,
    check('amount').not().isEmpty,
    validateFields,
  ],
  transfer
);

module.exports = {
  transferRouter: router,
};
