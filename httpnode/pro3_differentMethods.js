var http = require("http");

/**
 * used for GET method
 * @param {*} request 
 * @param {*} response 
 */
function get(request, response) {
    console.log("A new request received - get");
  
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("GET request");
    response.end();
}

/**
 * used for POST method
 * @param {*} request 
 * @param {*} response 
 */
function post(request, response) {
    console.log("A new request received - post");
  
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("POST request");
    response.end();
}

/**
 * used for all methods
 * @param {*} request 
 * @param {*} response 
 */
function other(request, response) {
    console.log("A new request received - other");
  
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(request.method + " request");
    response.end();
}


/**
 * used to route the requests
 * @param {*} request 
 * @param {*} response 
 */
function customRouter(request, response) {
    let method = request.method;
    console.log("method: ", method)
    
    switch(method) {
        case 'GET':
            get(request, response);
            break;
        case 'POST':
            post(request, response);
            break;
        default:
            other(request, response);
            break;
    }
}

//used to create a new server
let server = http.createServer(customRouter);

//initiating the server to listen on a particular server
server.listen(5000, () => {
  console.log("Server is listening on port 5000");
});