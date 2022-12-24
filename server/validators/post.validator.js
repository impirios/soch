import Joi from 'joi';

const post = {
    body: {
        content: Joi.string().required(),
    }
};

const update = {
    body: {
        content: Joi.string().required(),
        id: Joi.string().required()
    }
};

const getPost = {
    query: {
        id: Joi.string().required()
    }
}