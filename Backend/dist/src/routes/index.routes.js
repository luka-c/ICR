"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const baza = require("../../db/database");
const register = (server) => {
    server.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.send("Hello world!");
    }));
    server.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let registered = yield baza.Register(req.body);
        res.json(registered);
    }));
    server.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let user = yield baza.Login(req.body.email, req.body.password);
        res.json(user);
    }));
    server.get("/getEvents/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let events = yield baza.getEvents(req.params.userId);
        res.json(events);
    }));
    server.post("/insertEvent", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let result = yield baza.insertEvent(req.body);
        res.json(result);
    }));
    server.delete("/deleteEvent/:eventId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let result = yield baza.deleteEvent(req.params.eventId);
        res.json(result);
    }));
    server.put("/editEvent", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let result = yield baza.editEvent(req.body);
        res.json(result);
    }));
};
exports.register = register;
//# sourceMappingURL=index.routes.js.map