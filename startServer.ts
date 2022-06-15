import { Express } from "express";
import serverConfig from './config/server.config.json';
import { IDatabase } from "pg-promise";
import { IClient } from "pg-promise/typescript/pg-subset";

const host:string = serverConfig.host
const port:string|number = process.env.PORT || serverConfig.port

export const serverStart = async (app:Express, db:IDatabase<{}, IClient>) => {
    app.listen(+port, host, async () => { 
        try {
            await db.connect()
            console.log('connected database')
        } catch(e) {
            console.log('not connected database')
        }
        console.log('start server' + ' ' + port);
    })
}