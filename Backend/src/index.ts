import express from "express";
import bodyParser from "body-parser";
import * as routesIndex from "./routes/index.routes";

const server = express();
const port = 8080;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded( {extended: false}) );

routesIndex.register( server );

server.listen(port, () => {
    console.log(`Server locally running at http://localhost:${port}/`);
});