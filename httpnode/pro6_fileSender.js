var http = require("http");
var fs = require("fs");

/**
 * a plugin to fetch the query parameters
 * @param {*} request 
 */
function queryExtractor(request) {
    request["query"] = {};
    url = request.url;
    let queryFields = (url.split("?")[1] || "").trim();
    queryFields = queryFields.replace(/%20/g, " ")
    if(queryFields == "") {
        return
    }
    queryFields.split("&").forEach(element => {
        element = element.trim();
        if(element != "") {
            element = element.split("=");
            let e1 = element[0].trim();
            let e2 = element[1].trim();
            if(e1!="") {
                request["query"][e1] = e2;
            }
        }
    });
    return;
}

function getUserInput(request, response) {
    queryExtractor(request);

    if(!request["query"]["file"]) {
        response.writeHead(400, { "Content-type": "text/plain" });
        response.write("Send the file name");
        response.end();
    } else {
        let file = request["query"]["file"];
        fs.readFile(__dirname+"/files/"+file, (err, data) => {
            if(err) {
                console.log("err: ", err);
                response.writeHead(404, { "Content-type": "text/plain" });
                response.write("File not found");
                response.end();
            } else {
                response.writeHead(200, { "Content-type": "text/plain" });
                response.write(data);
                response.end();
            }
        });
    }
}

//used to create a new server
let server = http.createServer(getUserInput);

//initiating the server to listen on a particular server
server.listen(5000, () => {
  console.log("Server is listening on port 5000");
});