import {AverageResponseIndicatorDAO} from '../DAO/AverageResponseIndicatorDAO.js';
import {AverageResponseIndicator} from './AverageResponseIndicator.js';
import {ExternalResourceStatesEnum} from './ExternalResourceStatesEnum.js';
import {ExternalResourceDAO} from '../DAO/ExternalResourceDAO.js';
import {ExternalResource} from './ExternalResource.js';
export class ExternalResourcesStateResolver{
    
    constructor(dataAccessObjectFacade){
        this.averageResponseIndicatorDAO = new AverageResponseIndicatorDAO(dataAccessObjectFacade);
        this.externalResourceDAO = new ExternalResourceDAO(dataAccessObjectFacade);
        this.states = new ExternalResourceStatesEnum().states;
    }
    
    async resolveState(externalResource, responseIndicators){
        
        let result = await this.averageResponseIndicatorDAO.readByURL(externalResource.URL);
        let state;
        let resultState;
        
        if (result.rowCount > 0){
            let rows = result.rows;
            let averageResponseIndicator = new AverageResponseIndicator(rows[0].average_access_time, rows[0].average_page_size, externalResource);
            
            
            let normalIndicatorsCount = 0;
            responseIndicators.forEach((responseIndicator, index, array) => {
                
                if (responseIndicator.responseCode < 300){
                    
                    let deviation = this.#calculatePercentage(
                        Math.abs(averageResponseIndicator.averageAccessTime - responseIndicator.accessTime), averageResponseIndicator.averageAccessTime
                    );
                    if (deviation < 20) {
                        normalIndicatorsCount += 1;
                    } else {
                        if (state != this.states.UNAVAILABLE){
                            state = this.states.DEVIATION;
                        }
                    }
                    
                } else {
                    
                    state = this.states.UNAVAILABLE;
                    
                }

            })
            
            if (normalIndicatorsCount > 0){
                resultState = this.states.AVAILABLE;
            } else {
                resultState = state;
            }
        } else {
            
            resultState = this.states.UNAVAILABLE;
            
        }
        
        externalResource.setCurrentState(resultState);
        
    }
                                       
    #calculatePercentage(a, b){
    
        if(b == 0){
            return 0;
        } else {
            return a / b * 100
        }
                            
                                       
    }                     
    
}