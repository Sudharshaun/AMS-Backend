const connection = require("./db/model");
require("dotenv").config();
const fastify = require('fastify')({
    logger: true
});
const institution = require('./institution/institution')


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