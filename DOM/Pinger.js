export class Pinger{
    
    ping(externalResource){
        let request = new XMLHttpRequest();

        request.open("GET",externalResource.URL,false);
        
        let responseIndicator = new ResponseIndicator();
        
        request.addEventListener("readystatechange",()=>{
            
            if (request.readyState == 4) {
                    responseIndicator.setPageSize(request.responseText.length);
                    responseIndicator.setResponseCode(request.status);
                
            }
            
        })
        
        let startTime = Date.now();
        request.send();
        let accessTime = Date.now() - startTime;
        
        responseIndicator.setAccessTime(accessTime);
        
        return responseIndicator;
        
    }
    
}