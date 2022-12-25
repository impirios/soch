import config from "../config/config";
import UserService from "../services/user.service";
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userService = new UserService();

function convertToSlug(Text) {
    return Text.toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
}

async function signup(req, res, next) {
    console.log(req.body)
    const user = req.body;
    if(user.email && user.alias && user.name && user.password){

    
    const userExists = await userService.get(user.alias, user.email);
    if (userExists) {
        return res.status(409).send({
            message: 'User with this alias/email already exists!'
        });
    }

    if (user.password) {
        user.password = bcrypt.hashSync(user.password, 4);
    }

    user.alias = convertToSlug(user.alias);
    console.log(user)
    return userService.create(user)
        .then(savedUser => {
            console.log(savedUser)
            try {
                const authToken = jwt.sign({
                    _id: savedUser._id,
                    hashedPassword: savedUser.password,
                    name: savedUser.name,
                    alias: savedUser.alias,
                    email: savedUser.email,
                }, config.jwtSecret);
                console.log(authToken)
                return res.json({ status: true, data: authToken, message: "account created" })

            } catch (error) {
                console.log(error)
            }

        })
        .catch(err => res.status(500).send({
            message: 'Internal server error!',
            err
        }))

    }
    else{
        return res.status(400).send({
            message: 'please enter all the fields!'
        })
    }

}

async function login(req, res, next) {
    const { username, password } = req.body;
    let user = await userService.get(username,username);

    if (!user) {
        return res.status(404).send({
            message: 'user does not exist!'
        });
    }

    if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({
            _id: user._id,
            hashedPassword: user.password,
            name: user.name,
            alias: user.alias,
            email: user.email,
        }, config.jwtSecret);
        user.token = token;
        delete user.password;
        return res.json({ status: true, data: user });
    }
    else{
        return res.status(401).send({
            message: 'Incorrect credentials!'
        });
    }
}

async function getProfile(req, res, next) {
    let alias = req.query.alias,id = '';
    if(alias.length == 24){
        id = alias;
    }
    const user = await userService.get(alias,alias,id);
    if (!user) {
        return res.status(404).send({
            message: 'user does not exist!'
        });
    }
    delete user.password;
    return res.json({ status: true, data: user });
}



function getUsers(req, res, next) {
    const query = req.query.text;
    return userService.search(query)
        .then(users => res.json({ status: true, data: users }))
        .catch(err => res.status(404).send({
            message: 'No such user!'
        }))
}

function getAllUsers(req, res, next) {
    let userId = req.user._id;
    return userService.getAll(userId)
        .then(users => res.json({ status: true, data: users }))
        .catch(err => res.status(404).send({
            message: 'No such user!',
            err
        }))
}

function updateProfile(req, res, next) {
    const user = req.body, alias = req.user.alias;
    delete user.password;
    user.alias = convertToSlug(user.alias);
    return userService.update(alias, user)
        .then(newUser => {
            delete newUser.password;
            return res.json({ status: true, data: newUser })
        })
        .catch(err => res.status(404).send({
            message: 'No such user!'
        }))

}




export default {
    signup,
    login,
    getProfile,
    updateProfile,
    getUsers,
    getAllUsers
}