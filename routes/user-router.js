const express = require('express');
const {
       signIn ,
       createUser,
       getAllUser,
       updateUser,
       deleteUser,
       signOut
      
      } = require('../controllers/userController');

const router = express.Router();

router.post('/signin', signIn);
router.post('/createuser',createUser);
router.get('/users', getAllUser);
router.get('/signout',signOut);
router.put('/users/:id', updateUser);
 router.delete('/user/:id', deleteUser);


module.exports = {
    routes: router
}