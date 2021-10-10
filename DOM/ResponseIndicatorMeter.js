import {Pinger} from './Pinger.js';
import {ResponseIndicatorDAO} from '../DAO/ResponseIndicatorDAO.js';
import {ExternalResource} from './ExternalResource.js';
export class ResponseIndicatorMeter{
    
    constructor(dataAccessObjectFacade){
        this.TIMES_TO_PING = 2;
        this.MAXIMUM_REDIRECT_PING_TIMES = 3;
        this.responseIndicatorDAO = new ResponseIndicatorDAO(dataAccessObjectFacade);
        this.redirectPingTimes = 0;
        this.pinger = new Pinger();
    }
    
    #setResponseIndicatorsToDB(responseIndicators){
        
        responseIndicators.forEach((responseIndicator, index, array) => {
            this.responseIndicatorDAO.create(responseIndicator);
        })
        
    }
    
    ping(externalResource){
    
        let responseIndicators = [];

        for (let i = 0; i<this.TIMES_TO_PING; i++){
            
            let responseIndicator = this.pinger.ping(externalResource);
            
            if (responseIndicator.responseCode >= 300 && responseIndicator.responseCode < 400){
                
                let redirectionResponseIndicator = this.pinger.ping(new ExternalResource(this.pinger.redirectURL));
                while(
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
                responseIndicator.setExternalResource(externalResource);
                
            }
            
            responseIndicators.push(responseIndicator);
            
        }
        
        this.#setResponseIndicatorsToDB(responseIndicators);
        this.redirectPingTimes = 0;

        return responseIndicators;
    
    }
    
}