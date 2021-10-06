import {ResponseIndicatorDAO} from './DAO/ResponseIndicatorDAO.js';
import {AverageResponseIndicatorDAO} from './DAO/AverageResponseIndicatorDAO.js';
import {AverageResponseIndicator} from './DOM/AverageResponseIndicator.js';
import {ResponseIndicator} from './DOM/ResponseIndicator.js';
import {Pinger} from './DOM/Pinger.js';
import {ExternalResource} from './DOM/ExternalResource.js';
import {XMLHttpRequest} from 'XMLHttpRequest';
import pg from 'pg';
import sleep from 'sleep';
function main(){

    
    const clientConn = {
        user: 'welllet',
        host: 'localhost',
        database: 'welllet',
        password: 'oi9oityu',
        port: 5433,
    }

    
    let averageResponseIndicatorDAO = new AverageResponseIndicatorDAO(clientConn);
    let responseIndicatorDAO = new ResponseIndicatorDAO(clientConn);
    let averageResponseIndicator = new AverageResponseIndicator(111,222,new ExternalResource("http://www.amazon.com"));
//    averageResponseIndicatorDAO.create(averageResponseIndicator).then(resolve=>{
//        let responseIndicator = new ResponseIndicator(222,333,200,new ExternalResource("http://www.amazon.com"));
//        responseIndicatorDAO.create(responseIndicator);
//    });
        let responseIndicator = new ResponseIndicator(222,333,200,new ExternalResource("http://www.amazon.com"));
        responseIndicatorDAO.create(responseIndicator);
    
    
    
}

main();