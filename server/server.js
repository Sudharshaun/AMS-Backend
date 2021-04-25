const connection = require("./db/model");
console.log("inside dockers");
const fastify = require('fastify')({
    logger: true
});

fastify.get('/', (request, reply) => {
    console.log("Inside Route");
    reply.send({ hello: 'world' })
})

fastify.listen(3000, (err, address) => {
    if (err) throw err
    fastify.log.info(`server listening on ${address}`)
})