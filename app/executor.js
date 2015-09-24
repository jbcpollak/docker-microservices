'use strict';

var fs = require("fs");
var extend = require('extend');
var Docker = require("dockerode-bluebird");

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

// docker run -it --rm --name my-running-script -v /Users/jpollak/src/homework-josh-chaitin-pollak:/usr/src/app -w /usr/src/app node:4.1.1 node examples/script1.js 3
var dockerOptions = {
    Image: nodeImage,
    Tty: true,
    "WorkingDir": "/usr/src/app",
    Cmd: ["node","script.js"],
    "HostConfig": {
        "Binds": []
    }
};


var Executor = function(opts) {
    if (!(this instanceof Executor)) return new Executor(opts);
};


Executor.prototype.run = function(space, ostream, param, callback) {
    docker.pullAsync(nodeImage).then(function(err, data) {

        var opts = {};

        // deep copy
        extend(true, opts, dockerOptions);

        opts['HostConfig']['Binds'] = [ "" + space + ":/usr/src/app" ];
        opts['Cmd'][2] = param;

        docker.runAsync(null, null, ostream, opts).then(function(data) {

            var container = data[1];
            container.removeAsync().then(function(err, data) {
                console.log("Container ", container.id, " removed");

                callback();
            });
        });
    });
}
module.exports = Executor;