'use strict';

var Hapi = require('hapi');
var Docker = require("dockerode-bluebird");
var PassThrough = require('stream').PassThrough;

var Executor = require('./app/executor');

var executor = new Executor();

var Spacer = require('./app/spacer');
var spacer = new Spacer();

var server = new Hapi.Server();
server.connection({ port: 3000 });

// For verifying the server is online
server.route({
    method: 'GET',
    path: '/canary',
    handler: function (request, reply) {
        reply('Tweet! Tweet!');
    }
});

server.route({
    method: 'GET',
    path: '/ls',
    handler: function(request, reply) {
        docker.listContainers(function (err, containers) {
            var results = "Containers:\n";
            containers.forEach(function (containerInfo) {
                results += containerInfo.Id + "\n";
            });

            reply(results);
        });
    }
});

server.route({
    method: 'POST',
    path: '/process',
    config: {
        payload:{
            maxBytes:209715200,
            output:'stream',
            parse: false
        }
    },
    handler: function (request, reply) {

        spacer.create(request.payload, function(err, space) {

            var passthrough = new PassThrough();

            reply(passthrough);
            executor.run(space, passthrough, function() {
                spacer.cleanup(space);
            });

        });
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
