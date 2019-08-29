var http = require('http')


let addressbook = [];



//GET

// Id: 1,
// name: 'Anurakt',
// address: 'sector 12',oso
// mobile: '0987654321'


function getdetails(request, response) {
    console.log("A new request received - get");

    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(JSON.stringify(addressbook));
    response.end();
}






async function bodyParser(request) {
    return new Promise((resolve, reject) => {
        var data = "";
        request.on('data', function (chunk) { data += chunk })
        request.on('end', function () {
            request["rawBody"] = data;
            try {
                request["body"] = JSON.parse(data);
                resolve();
            } catch (er) {
                reject();
            }
        })
    });
}



// POST


async function postdetails(request, response) {
    await bodyParser(request)
    console.log("A new request received - post", request["body"]);
    addressbook.push(request["body"])
    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(JSON.stringify(addressbook));
    response.end();
}
      
// DELETE


function deletedetails(request,response){

    url = request.url;
    let queryFields = (url.split("?")[1] || "").trim();
    queryFields=queryFields.split("=") [1]
    for(i=0;i<addressbook.length;i++)
    {

    if(addressbook[i].id == queryFields)
    {
        addressbook.splice(i,1)
    console.log(queryFields)
    } 
}
    console.log("A request recieved- delete")
    response.writeHead(200,{"Content-Type": "application/json"})
    response.write(JSON.stringify(addressbook))
    response.end(queryFields)
}




function userRoutes(request, response) {
    let method = request.method;
    console.log("method: ", method);

    switch (method) {
        case 'GET':
            getdetails(request, response);
            break;
        case 'POST':
            postdetails(request, response);
            break;
        case 'DELETE':
            deletedetails(request, response);
            break;
        default:
            other(request, response);
            break;

    }
}

let server = http.createServer(userRoutes)

server.listen(5000, () => {
    console.log("Server is listening on port 5000");
});








// {
    // "Id": 4,
    // "name": "pie",
    // "address": "sector 18",
    // "mobile": "654321"
// },
// [
//     {
//         "Id": 4,
//         "name": "pie",
//         "address": "sector 18",
//         "mobile": "654321"
//     },
//     {
//         "Id": 3,
//         "name": "di",
//         "address": "sector 15",
//         "mobile": "7654321"
//     }