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
exports.editEvent = exports.deleteEvent = exports.isRecurring = exports.getEvents = exports.insertEvent = exports.getLastRecurringId = exports.getLastEventId = exports.getEmails = exports.getLastUserId = exports.Login = exports.Register = void 0;
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Planer',
    password: 'bazepodataka',
    port: 5432,
    ssl: false
});
function Register(user) {
    return __awaiter(this, void 0, void 0, function* () {
        let lastUserId = yield getLastUserId();
        if (lastUserId === null) {
            lastUserId = 0;
        }
        else {
            lastUserId += 1;
        }
        let emails = yield getEmails();
        let newEMail = true;
        emails.forEach((email) => {
            if (email.email === user.email) {
                newEMail = false;
            }
        });
        if (!newEMail) {
            return null;
        }
        const sql = `INSERT INTO userdata VALUES('${user.email}', '${user.password}', '${user.name}', '${user.surname}', ${lastUserId})`;
        yield pool.query(sql);
        let userReturn = {
            userId: lastUserId,
            email: user.email,
            name: user.name,
            surname: user.surname
        };
        return userReturn;
    });
}
exports.Register = Register;
function Login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT * FROM userdata WHERE email = '${email}'`;
        let userdata = (yield pool.query(sql)).rows[0];
        if (userdata === undefined) {
            return null;
        }
        if (userdata.password === password) {
            let userReturn = {
                userId: userdata.id_user,
                email: email,
                name: userdata.name,
                surname: userdata.surname
            };
            return userReturn;
        }
        return null;
    });
}
exports.Login = Login;
function getLastUserId() {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT id_user FROM userdata ORDER BY id_user DESC LIMIT 1`;
        let lastUserId = (yield pool.query(sql)).rows[0];
        if (lastUserId !== undefined) {
            return lastUserId.id_user;
        }
        else {
            return null;
        }
    });
}
exports.getLastUserId = getLastUserId;
function getEmails() {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT email FROM userdata`;
        let emails = (yield pool.query(sql)).rows;
        return emails;
    });
}
exports.getEmails = getEmails;
function getLastEventId() {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT id_event FROM event ORDER BY id_event DESC LIMIT 1`;
        let lastEventId = (yield pool.query(sql)).rows[0];
        if (lastEventId !== undefined) {
            return lastEventId.id_event;
        }
        else {
            return null;
        }
    });
}
exports.getLastEventId = getLastEventId;
function getLastRecurringId() {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT id_recurring FROM event WHERE id_recurring IS NOT NULL ORDER BY id_recurring DESC LIMIT 1`;
        let lastRecurringId = (yield pool.query(sql)).rows[0];
        if (lastRecurringId !== undefined) {
            return lastRecurringId.id_recurring;
        }
        else {
            return null;
        }
    });
}
exports.getLastRecurringId = getLastRecurringId;
function insertEvent(event) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(event);
        let lastEventId = yield getLastEventId();
        if (lastEventId === null) {
            lastEventId = 0;
        }
        else {
            lastEventId += 1;
        }
        let lastRecurringId = yield getLastRecurringId();
        if (lastRecurringId === null) {
            lastRecurringId = 0;
        }
        else {
            lastRecurringId += 1;
        }
        let dateStartInsert = new Date(event.dateStart);
        let dateEndInsert = new Date(event.dateEnd);
        try {
            if (event.recurringTypeId === 3) {
                for (let i = 0; i < 30; i++) {
                    let sql = `INSERT INTO event VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
                    yield pool.query(sql, [dateStartInsert.toISOString(), dateEndInsert.toISOString(), event.description,
                        event.name, lastEventId, event.eventTypeId, event.userId, lastRecurringId, event.recurringTypeId]);
                    dateStartInsert.setFullYear(dateStartInsert.getFullYear() + 1);
                    dateEndInsert.setFullYear(dateEndInsert.getFullYear() + 1);
                    lastEventId += 1;
                }
            }
            else if (event.recurringTypeId === 2) {
                for (let i = 0; i < 240; i++) {
                    let sql = `INSERT INTO event VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
                    yield pool.query(sql, [dateStartInsert.toISOString(), dateEndInsert.toISOString(), event.description,
                        event.name, lastEventId, event.eventTypeId, event.userId, lastRecurringId, event.recurringTypeId]);
                    dateStartInsert.setMonth(dateStartInsert.getMonth() + 1);
                    dateEndInsert.setMonth(dateEndInsert.getMonth() + 1);
                    lastEventId += 1;
                }
            }
            else if (event.recurringTypeId === 1) {
                for (let i = 0; i < 520; i++) {
                    let sql = `INSERT INTO event VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
                    yield pool.query(sql, [dateStartInsert.toISOString(), dateEndInsert.toISOString(), event.description,
                        event.name, lastEventId, event.eventTypeId, event.userId, lastRecurringId, event.recurringTypeId]);
                    dateStartInsert.setDate(dateStartInsert.getDate() + 7);
                    dateEndInsert.setDate(dateEndInsert.getDate() + 7);
                    lastEventId += 1;
                }
            }
            else if (event.recurringTypeId === 0) {
                for (let i = 0; i < 3652; i++) {
                    let sql = `INSERT INTO event VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
                    yield pool.query(sql, [dateStartInsert.toISOString(), dateEndInsert.toISOString(), event.description,
                        event.name, lastEventId, event.eventTypeId, event.userId, lastRecurringId, event.recurringTypeId]);
                    dateStartInsert.setDate(dateStartInsert.getDate() + 1);
                    dateEndInsert.setDate(dateEndInsert.getDate() + 1);
                    lastEventId += 1;
                }
            }
            else {
                let sql = `INSERT INTO event VALUES ($1, $2, $3, $4, $5, $6, $7, null, null)`;
                yield pool.query(sql, [dateStartInsert.toISOString(), dateEndInsert.toISOString(), event.description,
                    event.name, lastEventId, event.eventTypeId, event.userId]);
            }
            return true;
        }
        catch (error) {
            return false;
        }
    });
}
exports.insertEvent = insertEvent;
function getEvents(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT * FROM event WHERE id_user = ${userId} ORDER BY datestart ASC`;
        let eventsData = (yield pool.query(sql)).rows;
        let events = [];
        eventsData.forEach(element => {
            const event = {
                eventId: element.id_event,
                dateStart: element.datestart,
                dateEnd: element.dateend,
                name: element.name,
                description: element.description,
                eventTypeId: element.id_eventtype,
                recurringId: element.id_recurring,
                recurringTypeId: element.id_reccuringType
            };
            events.push(event);
        });
        return events;
    });
}
exports.getEvents = getEvents;
function isRecurring(eventId) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT id_recurring FROM event WHERE id_event = ${eventId}`;
        let result = (yield pool.query(sql)).rows[0];
        if (result !== undefined) {
            return result.id_recurring;
        }
        return null;
    });
}
exports.isRecurring = isRecurring;
function deleteEvent(eventId) {
    return __awaiter(this, void 0, void 0, function* () {
        const recurringId = yield isRecurring(eventId);
        try {
            let sql = null;
            if (recurringId === null) {
                sql = `DELETE FROM event WHERE id_event = ${eventId}`;
            }
            else {
                sql = `DELETE FROM event WHERE id_recurring = ${recurringId}`;
            }
            yield pool.query(sql);
            return true;
        }
        catch (_a) {
            return false;
        }
    });
}
exports.deleteEvent = deleteEvent;
function editEvent(event) {
    return __awaiter(this, void 0, void 0, function* () {
        let resDelete = yield deleteEvent(event.eventId);
        if (resDelete) {
            let resInsert = yield insertEvent(event);
            if (resInsert) {
                return true;
            }
            return false;
        }
        return false;
    });
}
exports.editEvent = editEvent;
//# sourceMappingURL=database.js.map