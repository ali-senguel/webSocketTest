const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server
const http = require('http');

// Spinning the http server and the WebSocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
console.log('listening on port 8000')

const wsServer = new webSocketServer({ 
    httpServer: server });

const clients = {};

const sleep = (miliseconds)=>{
    const date = Date.now();
    let currentDate = null;
    do{
        currentDate = Date.now();
    }while (currentDate-date < miliseconds);
}

// Generates unique userid for every user.
const getUniqueID = () => {

	const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

	return s4() + '-' + s4() + '-' + s4();
};

wsServer.on('request', function(request){
    var userID = getUniqueID();
    console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');

	// You can rewrite this part of the code to accept only the requests from allowed origin
	const connection = request.accept(null, request.origin);

	clients[userID] = connection;
	console.log('connected: ' + userID)

    connection.on('message', function(message){
        if (message.type ==='utf8'){
            console.log("Received Message: ", message.utf8Data);
        }

        for (key in clients){
            for (let i=0; i<5; i++){
                //clients[key].sendUTF(message.utf8Data)
                const msg = {
                    type: "message",
                    id: i,
                    date: Date.now(),
                  };
                clients[key].send(JSON.stringify(msg));
                sleep (2000);

            }
            //console.log("Sent Message to: ");
        }
    })

});