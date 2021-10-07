import {ResponseIndicatorDAO} from './DAO/ResponseIndicatorDAO.js';
import {AverageResponseIndicatorDAO} from './DAO/AverageResponseIndicatorDAO.js';
import {AverageResponseIndicator} from './DOM/AverageResponseIndicator.js';
import {ResponseIndicator} from './DOM/ResponseIndicator.js';
import {Pinger} from './DOM/Pinger.js';
import {ExternalResource} from './DOM/ExternalResource.js';
import {Enum} from './DOM/Enum.js';
import {ExternalResourceDAO} from './DAO/ExternalResourceDAO.js';
import {ExternalResourceConfigManager} from './DAO/ExternalResourceConfigManager.js'
import {XMLHttpRequest} from 'XMLHttpRequest';
import pg from 'pg';
import sleep from 'sleep';
async function main(){

    
    const clientConn = {
        user: 'welllet',
        host: 'localhost',
        database: 'welllet',
        password: 'oi9oityu',
        port: 5433,
    }
    
//    let enumStates = Enum({UNDEFINED: "undefined", AVAILABLE: "available", DEVIATION: "deviation", UNAVAILABLE: "unavailable"});
//
//    let extDAO = new ExternalResourceDAO(clientConn);
//    
    let extManager = new ExternalResourceConfigManager(clientConn);
    console.log(extManager);
    console.log(extManager.getExternalResources());

}

main();