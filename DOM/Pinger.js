import {XMLHttpRequest} from 'XMLHttpRequest';
import {ResponseIndicator} from './ResponseIndicator.js';
export class Pinger{
    
    ping(externalResource){
        let request = new XMLHttpRequest();

        request.open("GET",externalResource.URL,false);
        
        let responseIndicator = new ResponseIndicator();
        
        request.addEventListener("readystatechange",()=>{
            
            let pageSize = -1;
            
            if (request.readyState == 4 && request.status >= 200 && request.status < 400) {
                
                pageSize = request.responseText.length;
                console.log(request.getAllResponseHeaders());
                console.log(request.status);
                console.log(request.statusText);
                //TODO - если response 300 - пингануть по location
            }
            
            responseIndicator.setPageSize(pageSize);
            responseIndicator.setResponseCode(request.status);
            
        })
        
        let startTime = Date.now();
        request.send();
        let accessTime = Date.now() - startTime;
        
        responseIndicator.setAccessTime(accessTime);
        responseIndicator.setExternalResource(externalResource);
        
        return responseIndicator;
        
    }
    
}