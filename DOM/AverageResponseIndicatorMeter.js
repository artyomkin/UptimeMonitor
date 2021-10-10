import {AverageResponseIndicatorDAO} from '../DAO/AverageResponseIndicatorDAO.js';
import {Pinger} from './Pinger.js'
import {ResponseIndicator} from './ResponseIndicator.js';
import {AverageResponseIndicator} from './AverageResponseIndicator.js';
import {ExternalResource} from './ExternalResource.js';
import {ExternalResourceStatesEnum} from './ExternalResourceStatesEnum.js';
export class AverageResponseIndicatorMeter{
    

    
    constructor(dataAccessObjectFacade){
        
        this.MAXIMUM_REDIRECT_PING_TIMES = 3;
        this.MAXIMUM_PING_TIMES = 5;
        this.MINIMUM_GOOD_RESPONSE_COUNT = 3;
        
        this.averageResponseIndicatorDAO = new AverageResponseIndicatorDAO(dataAccessObjectFacade);
        this.pinger = new Pinger();
        this.redirectPingTimes = 0;
        this.pingTimes = 0;
        this.goodResponseCount = 0;
        
    }
        
    async hasAverageResponseIndicator(externalResource){
        
        let averageResponseIndicator = await this.averageResponseIndicatorDAO.readByURL(externalResource.URL);
        
        return averageResponseIndicator.rowCount != 0;
        
    }

    setAverageResponseIndicator(externalResource){
        
        let responseIndicators = this.#getPingResponses(externalResource);
        
        let averageResponseIndicator = this.#calculateAverageResponseIndicator(responseIndicators);
        
        if (averageResponseIndicator.externalResource.URL.length > 0){
            
            this.averageResponseIndicatorDAO.create(averageResponseIndicator);
            
        } else {
            
            externalResource.setCurrentState(new ExternalResourceStatesEnum().states.UNAVAILABLE);
            
        }
        
    }

    #getPingResponses(externalResource){
    
    
        let responseIndicators = []
        
        while (
            this.goodResponseCount < this.MINIMUM_GOOD_RESPONSE_COUNT && 
            this.pingTimes < this.MAXIMUM_PING_TIMES
        ){
            
            this.pingTimes += 1;
            
            let responseIndicator = this.pinger.ping(externalResource);
        
            if (responseIndicator.responseCode >= 300 && responseIndicator.responseCode < 400){
                
                
                let redirectionResponseIndicator = this.pinger.ping(new ExternalResource(this.pinger.redirectURL));
            
                while (
                    redirectionResponseIndicator.responseCode >= 300 && 
                    redirectionResponseIndicator.responseCode < 400 &&
                    this.redirectPingTimes < this.MAXIMUM_REDIRECT_PING_TIMES
                ){
            
                    this.redirectPingTimes += 1;
                    redirectionResponseIndicator = this.pinger.ping(new ExternalResource(this.pinger.redirectURL));

                }
                
                responseIndicator.setAccessTime(redirectionResponseIndicator.accessTime);
                responseIndicator.setPageSize(redirectionResponseIndicator.pageSize);
                responseIndicator.setResponseCode(redirectionResponseIndicator.responseCode);
                
            } 
            
            if (responseIndicator.responseCode < 300 && responseIndicator.responseCode != 0){
                
                this.goodResponseCount += 1;
                responseIndicators.push(responseIndicator);
                
            }
            
            
        }

        this.redirectPingTimes = 0;
        this.pingTimes = 0;
        this.goodResponseCount = 0;

        return responseIndicators;
    
    }
    
    #calculateAverageResponseIndicator(responseIndicators){

        if (responseIndicators.length > 0){
            
            let averageResponseIndicator = new AverageResponseIndicator(0,0,responseIndicators[0].externalResource);
            let averageAccessTime = 0;
            let averagePageSize = 0;
            for (let i = 0; i < responseIndicators.length; i++){
                
                averageAccessTime += responseIndicators[i].accessTime;
                averagePageSize += responseIndicators[i].pageSize;
                
            }
            
            averageAccessTime = parseInt(averageAccessTime / responseIndicators.length);
            averagePageSize = parseInt(averagePageSize / responseIndicators.length);
            
            averageResponseIndicator.averageAccessTime = averageAccessTime;
            averageResponseIndicator.averagePageSize = averagePageSize;
            
            return averageResponseIndicator;
            
        } else {
                        
            return new AverageResponseIndicator(0,0, new ExternalResource(""));
            
        }
    
    }
    

    
}