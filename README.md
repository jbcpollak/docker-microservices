Introduction
==

This project executes arbitrary JavaScript code within the context of a Docker container.

It receives the code and a single parameter in an HTTP POST request, creates a docker container, executes the code in the container,
 and then returns the result over the same POST request.

I consider this at the proof-of-concept stage. I figured out how to do all the basic requirements, but I don't consider the project up to `professional` standards. For specifics, see the `Remaining Work` section below. For an idea of a more polished project, please see:

(ReactJS Example App)[https://github.com/jbcpollak/react-depression-screener]



Usage
==

    $ npm start
    $ curl -F "app=@examples/script2.js" -F param=4 http://veterok.local:3000/process

*Note*: It looks like the provided `script2.js` is a duplicate of `script1.js`.

Remaining Work
==

*   Automated Testing, Continuous Integration, etc
*   More flexible parameter handling
*   Authentication on HTTP requests
*   File System Security - Right now all spaces are readable by all users
*   General Cleanup - Code organization and conventions, promises vs callbacks, etc


Articles I read while implementing this
==

*   (Docker on OS X)[https://docs.docker.com/installation/mac/]
*   (Getting Started with Docer for the NodeJS Dev)[https://www.airpair.com/node.js/posts/getting-started-with-docker-for-the-nodejs-dev]
*   (Microservices, Node.js, Containers!)[https://www.airpair.com/node.js/posts/microservices-nodejs-containers]
*   (Decking.io)[http://decking.io/]
*   (Express / Koa / Hapi Comparison)[https://www.airpair.com/node.js/posts/nodejs-framework-comparison-express-koa-hapi]
*   (Docker remote api on OS X)[http://opensolitude.com/2015/07/12/curl-docker-remote-api-os-x.html]
    This helped me figure out how to address the Docker container vm

Dependencies
==
*   (HapiJS)[http://hapijs.com/]
*   (Dockerode)[https://github.com/apocas/dockerode]
*   (Dockerode-Bluebird)[https://github.com/Quobject/dockerode-bluebird]
