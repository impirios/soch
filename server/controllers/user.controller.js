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
    console.log(user.alias)
    return userService.create(user)
        .then(user => {
            const authToken = jwt.sign({
                _id: user._id,
                hashedPassword: user.password,
                name: user.name,
                alias: user.alias,
                email: user.email,
            }, config.jwtSecret);

            return res.json({ status: true, data: authToken, message: "account created" })

        })
        .catch(err => res.status(500).send({
            message: 'Internal server error!',
            err
        }))

}

async function login(req, res, next) {
    const { username, password } = req.body;
    let user = await userService.get(username);

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
}

async function getProfile(req, res, next) {
    const alias = req.user.alias;
    const user = await userService.get(alias);
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
    getUsers
}