import {ExternalResourceDAO} from '../DAO/ExternalResourceDAO.js';
import {ExternalResourceStatesEnum} from './ExternalResourceStatesEnum.js';
export class Reporter{
    
    constructor(dataAccessObjectFacade){
        this.externalResourceDAO = new ExternalResourceDAO(dataAccessObjectFacade);
        this.statesEnum = new ExternalResourceStatesEnum().states;
    }
    
    async makeReport(externalResources){
        
        let report = "";
        
        let queryRes = await this.externalResourceDAO.readManyByURLs(externalResources.map(externalResource => externalResource.URL));
        let states = queryRes.rows
                    .sort((a,b) => a.url.length - b.url.length)
                    .map(externalResource => externalResource.state);
        externalResources.sort((a,b) => a.URL.length - b.URL.length);
        
        externalResources.forEach((externalResource, index, array) => {

            if(states[index] == this.statesEnum.UNDEFINED.description || states[index] == this.statesEnum.AVAILABLE.description){
                
                if (externalResource.currentState.description == this.statesEnum.DEVIATION.description){
                    
                    report += externalResource.URL + " has abnormal indicators\n";
                    
                } else if (externalResource.currentState.description == this.statesEnum.UNAVAILABLE.description){
                    
                    report += externalResource.URL + " is unavailable\n";
                    
                }
                
            } else if (states[index] == this.statesEnum.DEVIATION.description){
                
                if (externalResource.currentState.description == this.statesEnum.UNAVAILABLE.description){
                    
                    report += externalResource.URL + " is unavailable;\n";
                    
                }
                
            } else {
                
                report += externalResource.URL + " is available\n";
                
            }
            
        })
        
        return report;
        
    }
    
}