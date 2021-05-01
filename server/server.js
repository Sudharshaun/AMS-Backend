const connection = require("./db/model");
require("dotenv").config();
const fastify = require('fastify')({
    logger: true
});
const institution = require('./institution/institution')
const user = require('../server/user/auth')


fastify.get('/user/:id', async (request, reply) => {
    let response = await user.getUser(request.params.id);
    return response;
})

const userSchema = {
    body: {
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                status: { type: 'string' }
            }
        }
    }
}

fastify.post('/user', userSchema, async (request, reply) => {
    let response = await user.addUser(request.body);
    reply.send(response);
})


fastify.get('/institution/:id', async (request, reply) => {
    let response = await institution.getInstitution(request.params.id);
    return response;
})

const institutionSchema = {
    body: {
        name: { type: 'string' },
        address: { type: 'string' },
        email: { type: 'string' },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                status: { type: 'string' }
            }
        }
    }
}

fastify.post('/institution', institutionSchema, async (request, reply) => {
    let response = await institution.addInstitution(request.body);
    reply.send(response);
})

fastify.listen(3000);