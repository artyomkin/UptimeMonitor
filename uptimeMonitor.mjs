import {ResponseIndicatorDAO} from './DAO/ResponseIndicatorDAO.js';
import {AverageResponseIndicatorDAO} from './DAO/AverageResponseIndicatorDAO.js';
import {AverageResponseIndicator} from './DOM/AverageResponseIndicator.js';
import {ResponseIndicator} from './DOM/ResponseIndicator.js';
import {Pinger} from './DOM/Pinger.js';
import {ExternalResource} from './DOM/ExternalResource.js';
import {Enum} from './DOM/Enum.js';
import {ExternalResourceDAO} from './DAO/ExternalResourceDAO.js';
import {ExternalResourceConfigManager} from './DOM/ExternalResourceConfigManager.js';
import {AverageResponseIndicatorMeter} from './DOM/AverageResponseIndicatorMeter.js';
import {ExternalResourcesStateResolver} from './DOM/ExternalResourcesStateResolver.js';
import {ResponseIndicatorMeter} from './DOM/ResponseIndicatorMeter.js';
import {XMLHttpRequest} from 'XMLHttpRequest';
import {DataAccessObjectFacade} from './DAO/DataAccessObjectFacade.js';
import {Reporter} from './DOM/Reporter.js';
import {Notifier} from './DOM/Notifier.js';
import {DBConfigLoader} from './DOM/DBConfigLoader.js';
import {TelegramChatsLoader} from './DOM/TelegramChatsLoader.js';
import {TelegramChat} from './DOM/TelegramChat.js';
import pg from 'pg';
import sleep from 'sleep';

async function main(){
    
    let configLoader = new DBConfigLoader();
    const clientConn = configLoader.getConfig();
    
    let daoFacade = new DataAccessObjectFacade(clientConn);
    let configManager = new ExternalResourceConfigManager(daoFacade);
    
    let externalResources = await configManager.getExternalResources();
    let pinger = new Pinger();

    let averageResponseIndicatorMeter = new AverageResponseIndicatorMeter(daoFacade);
    
    for (let i = 0; i< externalResources.length; i++){
        
        if (!(await averageResponseIndicatorMeter.hasAverageResponseIndicator(externalResources[i]))){
            
            averageResponseIndicatorMeter.setAverageResponseIndicator(externalResources[i]);
            
        }
        
    }
    
    let externalResourcesStateResolver = new ExternalResourcesStateResolver(daoFacade);
    let responseIndicatorMeter = new ResponseIndicatorMeter(daoFacade);
    
    for (let i = 0; i < externalResources.length; i++){
        
        let responseIndicators = responseIndicatorMeter.ping(externalResources[i]);
        await externalResourcesStateResolver.resolveState(externalResources[i], responseIndicators);
        
    }
    
    let reporter = new Reporter(daoFacade);

    let telegramChats = new TelegramChatsLoader().getChats().map(telegramChat => new TelegramChat(0,telegramChat.webHook));
    let notifier = new Notifier(telegramChats);

    let report = await reporter.makeReport(externalResources);
    if(report.length>0){
        report = "Report:\n" + report;
    }
    notifier.notify(report);

    let externalResourceDAO = new ExternalResourceDAO(daoFacade);
    
    externalResources.forEach((externalResource,index,array)=>{
        
        let newExternalResource = new ExternalResource(externalResource.URL);
        newExternalResource.setCurrentState(externalResource.currentState);
        externalResourceDAO.updateByURL(externalResource.URL, newExternalResource);
        
    })

}

main();