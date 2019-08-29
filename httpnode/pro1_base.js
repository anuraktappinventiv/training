var http = require("http");

/**
 * used to send text response
 * @param {*} request 
 * @param {*} response 
 */
function textSender(request, response) {
  console.log("A new request received - textSender");

  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("I am working");
  response.end();
}

/**
 * used to send json response
 * @param {*} request 
 * @param {*} response 
 */
function jsonSender(request, response) {
  console.log("A new request received - jsonSender");

  // //perfect response - 1
  response.writeHead(200, {"Content-Type": "application/json"});
  response.write( JSON.stringify({ key1: "value1", key2: "value2" }) );
  response.end();

  //imperfect response - 2
  // response.writeHead(200, {"Content-Type": "application/json"});
  // response.write( JSON.stringify({ key1: "value1", key2: "value2" }) );
  // response.write( JSON.stringify({ key3: "value1", key4: "value2" }) );
  // response.end();

  //response - 3
  // response.writeHead(200, {"Content-Type": "application/json"});
  // response.write('{"key0":');
  // response.write( JSON.stringify({ key1: "value1", key2: "value2" }) );
  // response.write('}');
  // response.end();
}

/**
 * used to send html response
 * @param {*} request 
 * @param {*} response 
 */
function htmlSender(request, response) {
  console.log("A new request received - htmlSender");
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("<h1>Hello World</h1>");
  response.end();
}

//used to create a new server
let server = http.createServer(htmlSender);

//initiating the server to listen on a particular server
server.listen(5000, () => {
  console.log("Server is listening on port 5000");
});