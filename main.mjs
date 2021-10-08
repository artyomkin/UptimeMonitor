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
import {DataAccessObjectFacade} from './DAO/DataAccessObjectFacade.js';
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
    
    let daoFacade = new DataAccessObjectFacade(clientConn);
    let configManager = new ExternalResourceConfigManager(daoFacade);
    console.log(await configManager.getExternalResources());
    
    //TODO дальше по алгоритму + не забыть переделать пингер
}

main();