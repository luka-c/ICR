import express from "express";
import bodyParser from "body-parser";
import * as routesIndex from "./routes/index.routes";
import cors from "cors";

const server = express();
const port = 8080;

server.use(cors({ origin: "*", methods: ["GET", "POST", "DELETE"] } ));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded( {extended: false}) );

routesIndex.register( server );

server.listen(port, () => {
    console.log(`Server locally running at http://localhost:${port}/`);
});
