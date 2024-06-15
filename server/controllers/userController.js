const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const Task = require('../models/Task');

/**
 * @desc Get all users
 * @route GET /users
 * @access Private
 */
const getAllUsers = asyncHandler(async(req, res) => {
    // lean mean don't need extra functions... just data in json
    const users = await User.find().select('-password').lean();
    if(!users?.length)  // status 400: bad request
        return res.status(400).json({message: 'No user Found!'});
    res.json(users);
});


/**
 * @desc create a new user
 * @route POST /users
 * @access Private
 */
const createUser = asyncHandler(async(req, res) => {
    const {username, password, roles} = req.body;

    // check required fields
    if(!username || !password || !Array.isArray(roles) || !roles.length)
        return res.status(400).json({message: 'Required fields are missing!'});

    // check duplication
    // mongoogse says exec is used to exactly(confirm) get promise back from async when passing arg in find..
    // can work without exec too,, but following documentation.
    const duplicate = await User.findOne({username}).lean().exec();
    if(duplicate)
        return res.status(409).json({message: 'Already exist!'}); // 409: conflict

    // encrypt password
    const encrypted_password = await bcrypt.hash(password, 10);
    const user_object = {username, 'password': encrypted_password, roles};

    const user = await User.create(user_object);
    if(user)
        res.status(201).json({message: `user ${username} created`});
    else
        res.status(400).json({message: `Invalid user, can't add!`});
});

/**
 * @desc update user
 * @route PATCH /users
 * @access Private
 */
const updateUser = asyncHandler(async(req, res) => {
    const {id, username, password, roles, active} = req.body;

    // check required fields
    if(!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean')
        return res.status(400).json({message: 'Required fields are missing!'});

    const user = await User.findById(id).exec();
    if(!user)
        return res.status(400).json({message: 'User not found!'});

    // allow update to original user.
    const duplicate = await User.findOne({username}).lean().exec();
    if(duplicate && duplicate?._id.toString() !== id)
        return res.status(409).json({message: 'Username already exist!'});

    user.username = username;
    user.roles = roles;
    user.active = active;
    if(password)
        user.password = await bcrypt.hash(password, 10);

    const update_user = await user.save();
    res.json({message: `${update_user.username} updated.`});
});

/**
 * @desc delete user
 * @route DELETE /users
 * @access Private
 */
const deleteUser = asyncHandler(async(req, res) => {
    const {id} = req.body;

    if(!id)
        return res.status(400).json({message:`Insufficient parameters`});

    const user = await User.findById(id).exec();
    if(!user)
        return res.status(400).json({message: 'Already deleted!'});

    const tasks = await Task.findOne({user: id}).lean().exec();
    if(tasks)
        return res.status(400).json({message:`User already has some assigned tasks`});

    const result = await user.deleteOne();
    res.json({message: `User ${user.username} deleted Successfully!`})
});

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}