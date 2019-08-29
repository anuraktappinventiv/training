var http = require("http");

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
    
    response.writeHead(200, { "Content-type": "application/json" });
    response.write( JSON.stringify(request["query"]) );
    response.end();
}

//used to create a new server
let server = http.createServer(getUserInput);

//initiating the server to listen on a particular server
server.listen(5000, () => {
  console.log("Server is listening on port 5000");
});