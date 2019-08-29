var http = require("http");

/**
 * used to send text response
 * @param {*} request 
 * @param {*} response 
 */
function textSender(request, response) {
    console.log("A new request received - textSender");
  
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("I am text response");
    response.end();
}

/**
 * used to send html response
 * @param {*} request 
 * @param {*} response 
 */
function htmlSender(request, response) {
    console.log("A new request received - htmlSender");
  
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<h1>I am html response</h1>");
    response.end();
}

/**
 * used to send json response
 * @param {*} request 
 * @param {*} response 
 */
function jsonSender(request, response) {
    console.log("A new request received - jsonSender");
  
    response.writeHead(200, {"Content-Type": "application/json"});
    response.write( JSON.stringify({ key: "I am JSON response" }) );
    response.end();
}

/**
 * used to default response
 * @param {*} request 
 * @param {*} response 
 */
function defaultResponseSender(request, response) {
    console.log("A new request received - defaultResponseSender");
  
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("I am default response");
    response.end();
}


/**
 * used to route the requests
 * @param {*} request 
 * @param {*} response 
 */
function customRouter(request, response) {
    let url = request.url;
    console.log("url: ", url)
    
    switch(url) {
        case '/text':
            textSender(request, response);
            break;
        case '/html':
            htmlSender(request, response);
            break;
        case '/json':
            jsonSender(request, response);
            break;
        default:
            defaultResponseSender(request, response);
            break;
    }
}

//used to create a new server
let server = http.createServer(customRouter);

//initiating the server to listen on a particular server
server.listen(5000, () => {
  console.log("Server is listening on port 5000");
});