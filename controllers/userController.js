'use strict';

const firebase = require('../db');
const User = require('../models/user');
const firestore = firebase.firestore();


const signIn = async (req, res,next) => {
   try{

    const user = {
        email: req.body.email,
        password: req.body.password,
      };
    await firebase.auth().signInWithEmailAndPassword(user.email, user.password);
    res.status(200).json({
        status:200,
        message:'User SignIn Successfully'
    });
    }catch(error){
        res.status(400).send(error.message);
    }
         
  };

  const createUser = async (req, res,next) => {
    try{
        const userdata = {
            email: req.body.email,
            password: req.body.password,
          };
        const newUser= await firebase
        .auth()
        .createUserWithEmailAndPassword(userdata.email, userdata.password);
        const data = {
            name: req.body.name,
            email: req.body.email,
            address:req.body.address,
            phone:req.body.phone
        }
        await firestore.collection('users').doc(newUser.user.uid).set(data);
        res.status(200).json({
            status:200,
            message:'User Create Successfully'
        });
    }
    catch(error){
        res.status(400).send(error.message);
    }
};
 const getAllUser = async (req,res,next) => {
//    try{
//     const userArray = [];
//     const data = await firestore.collection("Users").get();
//     data.forEach(doc => {
//     {
//         const user = { id: doc.uid, userData: doc.data()};
//         userArray.push(user);
//       }
//     });
//     res.send(userArray);

//    }catch(error){
//     res.status(400).send(error.message);
//    }
try{
    const users = await firestore.collection('users');
    const data = await users.get();
    const userArray = [];
    if(data.empty) {
        res.status(404).send('No User found');
    }else {
        data.forEach(doc => {
            const user = new User(
                doc.id,
                doc.data().name,
                doc.data().email,
                doc.data().address,
                doc.data().phone,
               
            );
            userArray.push(user);
        });
        res.send(userArray);
    }
} catch (error) {
    res.status(400).send(error.message);
}
 };
 const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const  user =  await firestore.collection('users').doc(id);
        await user.update(data);
        res.send('Users updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('users').doc(id).delete();
        res.send('User deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}
 const signOut = async (req, res) => {
    try {
      await firebase.auth().signOut();
      res.status(200).json({
        status:200,
        message:'User SignOut Successfully'
    });
    } catch (error) {
        res.status(400).send(error.message);
    }
  };

  module.exports = {
    signIn,
    createUser,
    getAllUser,
    updateUser,
    deleteUser,
    signOut
   
}
  