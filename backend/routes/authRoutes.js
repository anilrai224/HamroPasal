const express = require('express');
const {createUser, loginUserCtrl, getAUser, deleteAUser, updateUser} = require('../controllers/userCtrl');
const validateUser = require('../middleware/authToken');

const router = express.Router();

router.post('/register',createUser);
router.post('/login', loginUserCtrl);
router.get('/get-user-by-id',validateUser, getAUser);
router.delete('/:id',deleteAUser);
router.put('/:id',updateUser)

module.exports = router;