var http = require("http");

function getUserInput(request, response) {
    url = request.url;
    console.log("url: ", url);
    let query = url.split("?")[1] || "";
    response.end(query);
}

//used to create a new server
let server = http.createServer(getUserInput);

//initiating the server to listen on a particular server
server.listen(5000, () => {
  console.log("Server is listening on port 5000");
});