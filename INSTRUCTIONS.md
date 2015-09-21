# Overview

The homework is a way for you to show off your development skills.  We’re looking for your coding style, your ability to understand the requirements and create a functional piece of code as output.  Your project should include installation and run instructions, functional and working code, and an explanation of what the code does in this Readme.  As a deliverable, push your final code to to this repo. 

# Description

You have been tasked to design a code execution service using that can execute arbitrary JavaScript code within the context of a Docker container.  Create a web service in the language of your choice that responds to requests to execute the JavaScript code.  The service should manage the spinning up and orchestration of Docker containers that run the arbitrary scripts.  At minimum, your service should be able to execute the two scripts provided in this repository, but the service should also be able to receive arbitrary valid JavaScript code and execute it.  The included two scripts can be tested and executed at the command line using node.js. The result of the function call should be returned to the initiator of the request.   

Kinvey uses node.js as its primary development platform, but for this assignment you are free to develop the service using whatever language or frameworks you choose, but please be prepared to reason about your choices.  You may also use any open source libraries you find to assist in creating the service.  

Feel free to alter the JavaScript code provided in the samples to fit your model, so long as the primary function of those scripts is maintained.  

Some things to consider: 
* Testing Strategy
* Performance implications of Docker container orchestration i
* Security implications of accepting arbitrary JavaScript code via a public web service API.
* Security implications of executing arbitrary JavaScript code in a shared service context.  

# The Scripts

The scripts can currently be executed on the command line using node.js.  After installing node, you can execute each one from the command line.  

## script1.js

This script will return the factorial of the first argument.  For example:  

```
node script1.js 4
```

will return 24.  

## script2.js

This script will return the argument that is the largest of the arguments passed in.  For example:  

```
node script2.js 5 -15 27 50496 1049394 16 32 12
```

will return 1049394

# Final thoughts

Feel free to ask questions to clarify any of the requirements, and have fun with it!

