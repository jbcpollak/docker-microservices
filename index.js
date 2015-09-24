'use strict';

var Hapi = require('hapi');
var Docker = require("dockerode-bluebird");
var fs = require("fs");
var PassThrough = require('stream').PassThrough;

var docker_cert_path = process.env.DOCKER_CERT_PATH || '';

var docker = new Docker({
    protocol: 'https', //you can enforce a protocol
    host: process.env.DOCKER_IP || '192.168.99.100',
    port: process.env.DOCKER_PORT || 2376,
    ca: fs.readFileSync(docker_cert_path + '/ca.pem'),
    cert: fs.readFileSync(docker_cert_path + '/cert.pem'),
    key: fs.readFileSync(docker_cert_path + '/key.pem')
});

var nodeImage = "node:slim";

docker.pullAsync(nodeImage).then(function(err, data) {
    var server = new Hapi.Server();
    server.connection({ port: 3000 });


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

    var dockerOptions = {
        Image: nodeImage,
        Tty: true,
        "WorkingDir": "/usr/src/app",
        Cmd: ["node","examples/script1.js","3"],
        "HostConfig": {
            "Binds": [
                "/Users/jpollak/src/homework-josh-chaitin-pollak:/usr/src/app"
            ]
        }

        //Cmd: ["node examples/script1.js 3"]
        //'ExposedPorts': {
        //    '2181/tcp': {}
        //},
        //name: 'zookeeper',
        //HostConfig: {
        //    PortBindings: {
        //        "2181/tcp": [
        //            {
        //                "HostPort": "2181"
        //            }
        //        ]
        //    }
        //}
    };


// docker run -it --rm --name my-running-script -v /Users/jpollak/src/homework-josh-chaitin-pollak:/usr/src/app -w /usr/src/app node:4.1.1 node examples/script1.js 3
    server.route({
        method: 'POST',
        path: '/process',
        handler: function (request, reply) {

            var passthrough = new PassThrough();

            docker.runAsync(null, null, passthrough, dockerOptions).then(function(data) {

                reply(passthrough);
                var container = data[1];
                console.log("Container Id: ", container.Id);
                container.removeAsync().then(function(err, data) {
                    console.log("Container removed");
                });
            });

            //docker.createContainerAsync(dockerConfig).then( function(container) {
            //    console.log('starting container = ' + container);
            //
            //    container.attach({stream: true, stdout: true, stderr: true}, function (err, stream) {
            //        reply(stream);
            //    });
            //
            //    container.startAsync().then(function(err, data) {
            //        console.log("Data: " + data);
            //        container.removeAsync().then(function(err, data) {
            //            console.log("Container removed");
            //        });
            //    });
            //}).catch(function(error) {
            //    console.log('container error = ' + error);
            //}).finally( function() {
            //    console.log('container finally ');
            //});
        }
    });


    server.start(function () {
        console.log('Server running at:', server.info.uri);
    });

});
