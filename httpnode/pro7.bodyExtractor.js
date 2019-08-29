var http = require("http");

/**
 * a plugin to fetch the body parameters
 * @param {*} request 
 */
async function bodyParser(request) {
    return new Promise((resolve, reject) => {
        var data = "";
        request.on('data', function(chunk){ data += chunk })
        request.on('end', function(){
            request["rawBody"] = data;
            try {
                request["body"] = JSON.parse(data);
                resolve();
            } catch(er) {
                reject();
            }
        })
    });
}

async function getUserInput(request, response) {
    try {
        await bodyParser(request);
        response.writeHead(200, { "Content-type": "application/json" });
        response.write( JSON.stringify(request["body"]) );
        response.end();
    } catch(err) {
        response.writeHead(400, { "Content-type": "text/plain" });
        response.write("Invalid body data was provided");
        response.end();
    }
}

//used to create a new server
let server = http.createServer(getUserInput);

//initiating the server to listen on a particular server
server.listen(5000, () => {
  console.log("Server is listening on port 5000");
});