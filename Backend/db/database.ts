import {Pool} from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Planer',
    password: 'bazepodataka',
    port: 5432,
    ssl : false
});

export type user = {
    email: string,
    password: string,
    name: string,
    surname: string
};
export type userReturn = {
    userId: number,
    email: string,
    name: string,
    surname: string
}

export type event = {
    dateStart: Date,
    dateEnd: Date,
    name: string,
    description: string,
    eventTypeId: number,
    userId: number,
    recurringEvent: number
}

export type eventsReturn = {
    eventId: number,
    dateStart: Date,
    dateEnd: Date,
    name: string,
    description: string,
    eventTypeId: number,
    recurringId: number
}

export async function Register(user: user): Promise<userReturn> {    
    let lastUserId = await getLastUserId();
    if(lastUserId === null) {
        lastUserId = 0;
    }
    else {
        lastUserId += 1;
    }
    let emails = await getEmails();
    let newEMail = true;
    emails.forEach((email) => {
        if(email.email === user.email) {  
            newEMail = false;
        }
    });
    if(!newEMail) {
        return null;
    }
    const sql = `INSERT INTO userdata VALUES('${user.email}', '${user.password}', '${user.name}', '${user.surname}', ${lastUserId})`;
    await pool.query(sql);  
    let userReturn: userReturn = { 
        userId: lastUserId,
        email: user.email,
        name: user.name,
        surname: user.surname
    };    
    return userReturn;
}

export async function Login(email: string, password: string): Promise<userReturn> {    
    const sql = `SELECT * FROM userdata WHERE email = '${email}'`;
    let userdata = (await pool.query(sql)).rows[0];
    if(userdata === undefined) {
        return null;
    }
    if(userdata.password === password) {
        let userReturn: userReturn = { 
            userId: userdata.id_user,
            email: email,
            name: userdata.name,
            surname: userdata.surname
        }; 
        return userReturn;
    }
    return null
}

export async function getLastUserId(): Promise<number> {
    const sql = `SELECT id_user FROM userdata ORDER BY id_user DESC LIMIT 1`;
    let lastUserId = (await pool.query(sql)).rows[0];
    
    if(lastUserId !== undefined) {
        return lastUserId.id_user;
    }
    else {
        return null;
    }
}

export async function getEmails(): Promise<{email: string}[]> {
    const sql = `SELECT email FROM userdata`;
    let emails = (await pool.query(sql)).rows;
    return emails;
}

export async function getLastEventId(): Promise<number> {
    const sql = `SELECT id_event FROM event ORDER BY id_event DESC LIMIT 1`;
    let lastEventId = (await pool.query(sql)).rows[0];
    
    if(lastEventId !== undefined) {
        return lastEventId.id_event;
    }
    else {
        return null;
    }
} 

export async function getLastRecurringId(): Promise<number> {
    const sql = `SELECT id_recurring FROM event ORDER BY id_recurring DESC LIMIT 1`;
    let lastRecurringId = (await pool.query(sql)).rows[0];
    
    if(lastRecurringId !== undefined) {
        return lastRecurringId.id_recurring;
    }
    else {
        return null;
    }
}

export async function insertEvent(event: event): Promise<boolean> {
    let lastEventId = await getLastEventId();    
    if(lastEventId === null) {
        lastEventId = 0;        
    }
    else {
        lastEventId += 1;        
    }
    let lastRecurringId = await getLastRecurringId();
    if(lastRecurringId === null) {
        lastRecurringId = 0;        
    }
    else {
        lastRecurringId += 1;        
    }

    let dateStartInsert = new Date(event.dateStart);
    dateStartInsert.setHours(dateStartInsert.getHours() + 1);
    let dateEndInsert = new Date(event.dateEnd);
    dateEndInsert.setHours(dateEndInsert.getHours() + 1);
    try {
        if(event.recurringEvent === 3) {
            for(let i = 0; i < 30; i++) {                       
                let sql = `INSERT INTO event VALUES ('${dateStartInsert.toISOString()}','${dateEndInsert.toISOString()}', 
                    '${event.description}', '${event.name}', ${lastEventId}, ${event.eventTypeId}, ${event.userId}, ${lastRecurringId})`
                await pool.query(sql);
                dateStartInsert.setFullYear(dateStartInsert.getFullYear() + 1);
                dateEndInsert.setFullYear(dateEndInsert.getFullYear() + 1);
                lastEventId += 1;
            }
        }
        else if (event.recurringEvent === 2) {
            for(let i = 0; i < 240; i++) {                       
                let sql = `INSERT INTO event VALUES ('${dateStartInsert.toISOString()}','${dateEndInsert.toISOString()}', 
                    '${event.description}', '${event.name}', ${lastEventId}, ${event.eventTypeId}, ${event.userId}, ${lastRecurringId})`
                await pool.query(sql);
                dateStartInsert.setMonth(dateStartInsert.getMonth() + 1);
                dateEndInsert.setMonth(dateEndInsert.getMonth() + 1);
                lastEventId += 1;
            }
        } 
        else if (event.recurringEvent === 1) {
            for(let i = 0; i < 520; i++) {                       
                let sql = `INSERT INTO event VALUES ('${dateStartInsert.toISOString()}','${dateEndInsert.toISOString()}', 
                    '${event.description}', '${event.name}', ${lastEventId}, ${event.eventTypeId}, ${event.userId}, ${lastRecurringId})`
                await pool.query(sql);
                dateStartInsert.setDate(dateStartInsert.getDate() + 7);
                dateEndInsert.setDate(dateEndInsert.getDate() + 7);
                lastEventId += 1;
            }
        } 
        else if (event.recurringEvent === 0) {
            for(let i = 0; i < 3652; i++) {                       
                let sql = `INSERT INTO event VALUES ('${dateStartInsert.toISOString()}','${dateEndInsert.toISOString()}', 
                    '${event.description}', '${event.name}', ${lastEventId}, ${event.eventTypeId}, ${event.userId}, ${lastRecurringId})`
                await pool.query(sql);
                dateStartInsert.setDate(dateStartInsert.getDate() + 1);
                dateEndInsert.setDate(dateEndInsert.getDate() + 1);
                lastEventId += 1;
            }
        } 
        else {
            let sql = `INSERT INTO event VALUES ('${event.dateStart}','${event.dateEnd}', 
                '${event.description}', '${event.name}', ${lastEventId}, ${event.eventTypeId}, ${event.userId}, null)`
            await pool.query(sql);
        }
        return true;
    }
    catch {
        return false;
    }
}

export async function getEvents(userId: number): Promise<eventsReturn[]> {
    const sql = `SELECT * FROM event WHERE id_user = ${userId} ORDER BY datestart ASC`;
    let eventsData = (await pool.query(sql)).rows;
    let events: eventsReturn[] = [];
    eventsData.forEach(element => {
        const event: eventsReturn = {
            eventId: element.id_event,
            dateStart: element.datestart,
            dateEnd: element.dateend,
            name: element.name,
            description: element.description,
            eventTypeId: element.id_eventtype,
            recurringId: element.id_recurring
        }
        events.push(event);
    });
    return events;
}

export async function isRecurring(eventId: number): Promise<number> {
    const sql = `SELECT id_recurring FROM event WHERE id_event = ${eventId}`;
    let result = (await pool.query(sql)).rows[0];   
    if(result !== undefined) {
        return result.id_recurring;
    } 
    return null;
}

export async function deleteEvent(eventId: number): Promise<boolean> {
    const recurringId = await isRecurring(eventId);
    
    try {
        let sql = null;
        if (recurringId === null) {
            sql = `DELETE FROM event WHERE id_event = ${eventId}`;
        }
        else {
            sql = `DELETE FROM event WHERE id_recurring = ${recurringId}`;
        }
        await pool.query(sql);
        return true;
    }
    catch {
        return false;
    }    
}