const express = require('express');
const router = express.Router();

const userModel = require('./users');

/**
 * @access : Public 
 * @route : GET / 
 * @desc : GET home page.
 * */
router.get('/', (req, res)=> {
  res.json('hey');
});

/**
 * @access : Public 
 * @route : POST /create
 * @desc : Create Model.
 * */
router.post('/create', (req, res)=> {
  const {title, heading, imageUrl, content} = req.body;
  const newUser = new userModel({title, heading, imageUrl, content});

    newUser.save()
    .then(userCreated => {
      res.status(200).json({msg: 'created.', newUser});
    })
    .catch(err => res.status(500).json({msg: 'internal server error.', err}));
  
});

/**
 * @access : Public 
 * @route : GET /read
 * @desc : read model.
 * */
router.get('/read', (req, res)=> {
  userModel.find()
  .then(userFound => {
    res.status(200).json({msg: 'read successfully', userFound});
  })
  .catch(err => res.status(500).json({msg: 'internal server error.', err}));
});

/**
 * @access : Public
 * @route : PATCH /update/:id
 * @desc : update model.
 * */
router.patch('/update/:id', (req, res) => {
  const {title, heading, imageUrl, content} = req.body;
  const newUser = {title, heading, imageUrl, content};

    userModel.findOneAndUpdate({_id: req.params.id}, {$set: newUser}, {new: true})
    .then(userUpdated => {
      res.status(200).json({msg: 'updated successfully.', userUpdated});
    })
    .catch(err => res.status(500).json({msg: 'internal server error.', err}));
  
});

/**
 * @access : Public 
 * @route : DELETE /delete/:id 
 * @desc : delete model.
 * */
router.delete('/delete/:id', (req, res) => {

  userModel.findOneAndDelete({_id: req.params.id})
  .then(userDeleted => {
    res.status(200).json({msg: 'deleted successfully.', userDeleted});
  })
  .catch(err => res.status(500).json({msg: 'internal server error.', err}));
});

module.exports = router;
