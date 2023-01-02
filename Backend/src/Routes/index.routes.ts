import * as express from "express";
import baza = require("../../db/database");

export const register = ( server: express.Application ) => {
    server.get( "/", async ( req: any, res ) => {
        res.send("Hello world!");
    } );

    server.post("/register", async ( req: any, res ) => {        
        let registered = await baza.Register(req.body);
        res.json(registered);
    });

    server.post("/login", async ( req: any, res ) => {        
        let user = await baza.Login(req.body.email, req.body.password);
        res.json(user);
    });

    server.get("/getEvents/:userId", async ( req: any, res ) => {
        let events = await baza.getEvents(req.params.userId);
        res.json(events);
    });

    server.post("/insertEvent", async ( req: any, res ) => {
        let result = await baza.insertEvent(req.body);
        res.json(result);
    });

    server.delete("/deleteEvent/:eventId", async ( req: any, res ) => {
        let result = await baza.deleteEvent(req.params.eventId);
        res.json(result);
    });
};