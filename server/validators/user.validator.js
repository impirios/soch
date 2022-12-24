import Joi from 'joi';

const login = {
    body: {
        alias: Joi.string().required(),
        password: Joi.string().required()
    }
};

const signup = {
    body: {
        alias: Joi.string().required(),
        password: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().required()
    }
};

export default{
    login,
    signup
}
