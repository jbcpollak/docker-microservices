'use strict';

var temp = require('temp');
var fs = require('fs');
var rimraf = require('rimraf');

var Spacer = function(opts) {
    if (!(this instanceof Spacer)) return new Spacer(opts);
};

Spacer.prototype.create = function(istream, callback) {
    temp.mkdir({ dir: process.cwd(), prefix: 'space-'}, function(err, space) {

        fs.chmodSync(space, '755');

        console.log("Created Space: ", space);

        var scriptName = space + "/script.js";

        var ostream = fs.createWriteStream(scriptName);

        istream.pipe(ostream);

        istream.on('end', function() {
            console.log("Script saved as ", scriptName);

            callback(err, space);
        });

    });
}

Spacer.prototype.cleanup = function(space) {
    rimraf(space, function() {
        console.log("Space Removed: ", space);
    });
}

module.exports = Spacer;