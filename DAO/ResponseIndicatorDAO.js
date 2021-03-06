import pg from 'pg';

export class ResponseIndicatorDAO{

    constructor(dataAccessObjectFacade){
        this.dataAccessObjectFacade = dataAccessObjectFacade;
    }
    
    create(responseIndicator){
        
        let accessTime = responseIndicator.accessTime;
        let pageSize = responseIndicator.pageSize;
        let externalResourceURL = responseIndicator.externalResource.URL;
        let responseCode = responseIndicator.responseCode;
        
        let query = {
            name: "insert response indicator",
            text: "INSERT INTO response_indicators (url, access_time, page_size, response_code) VALUES($1,$2,$3,$4);",
            values: [externalResourceURL, accessTime, pageSize, responseCode]
        };
        
        return this.dataAccessObjectFacade.query(query);
        
    }
    
    readByURL(URL){
        
        let query = {
            name: "select reponse indicator by url",
            text: "SELECT * FROM response_indicators WHERE url = $1",
            values: [URL]
        };
        
        return this.dataAccessObjectFacade.query(query);
        
    }
    
    updateByURL(URL, responseIndicator){
        
        let accessTime = responseIndicator.averageAccessTime;
        let pageSize = responseIndicator.averagePageSize;
        let oldURL = responseIndicator.externalResource.URL;
        let responseCode = responseIndicator.responseIndicator;
        
        let query = {
            name: "update average response indicator by url",
            text: "UPDATE average_response_indicators SET access_time = $1, page_size = $2, response_code = $3, url = $4 WHERE url = $5",
            values: [accessTime, pageSize, responseCode, oldURL, URL]
        };
        
        return this.dataAccessObjectFacade.query(query);
        
    }
    
    deleteByURL(URL){
        
        let query = {
            name: "delete response indicator by url",
            text: "DELETE FROM response_indicators WHERE url = $1",
            values: [URL]
        };
                
        return this.dataAccessObjectFacade.query(query);
        
    }
    
    

    
}