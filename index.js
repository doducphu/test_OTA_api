var http = require('http');
var fs = require("fs");

var UPDATE = 1;
var PORT = 3000;  //Set whatever port you want to listen on

console.log("Starting Nodejs ESP32 OTA Update Server.");
console.log("Listening on 0.0.0.0:" +PORT.toString());
var server = http.createServer(function(request, response){

    if(request.url === "/update_OTA/update.bin"){
        user_agent = request.headers['user-agent']
        console.log("User-Agent:" + user_agent);

        if(UPDATE == 0){
            response.writeHead(304, {"Content-Type": "text/html"});
            response.end();
        }else{ //UPDATE
            path_to_file = "C:\\Users\\NC\\Desktop\\Kmin_Node4\\BEN4\\Buoi1\\tespOTA.ino.esp32.bin"
            fs.readFile(path_to_file, "binary", function(err, file){
                if(err){
                    response.writeHead(500, {"Content-Type": "text/plain"});
                    response.write(err + "\n");
                    response.end();
                    return; 
                }//End Error Code
                //Write file to resposne

                //Get File Size
                var stats = fs.statSync(path_to_file);
                response.setHeader("Content-Type", "text/html");
                response.setHeader("Content-Disposition", "attachment");
                response.setHeader("Content-Length", stats.size.toString());
                response.write(file, "binary");
                response.end();
        server.close();
        UPDATE = 0; //disable the updates
                
        });
        }

        
    }else{
        console.log("Invalid uri...");
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("<html> <head><title>Invalid Uri</title></head><body>Invalid Uri</body></html>")
        response.end();
    }
   
});
server.listen(PORT);