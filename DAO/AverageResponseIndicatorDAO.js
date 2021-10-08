import pg from 'pg';
import {DataAccessObjectFacade} from './DataAccessObjectFacade.js';
export class AverageResponseIndicatorDAO{

    constructor(dataAccessObjectFacade){
        this.dataAccessObjectFacade = dataAccessObjectFacade;
    }
    
    create(averageResponseIndicator){
        
        let accessTime = averageResponseIndicator.averageAccessTime;
        let pageSize = averageResponseIndicator.averagePageSize;
        let externalResourceURL = averageResponseIndicator.externalResource.URL;
        let query = {
            name: "insert average response indicator",
            text: "INSERT INTO average_response_indicators (url, average_access_time, average_page_size) VALUES($1,$2,$3);",
            values: [externalResourceURL, accessTime, pageSize]
        };
        
        return this.dataAccessObjectFacade.query(query);
        
        
    }
    
    readByURL(URL){
        
        let query = {
            name: "select average reponse indicator by url",
            text: "SELECT * FROM average_response_indicators WHERE url = $1",
            values: [URL]
        };
        
        return this.dataAccessObjectFacade.query(query);
        
    }
    
    updateByURL(URL, averageResponseIndicator){
        
        let accessTime = averageResponseIndicator.averageAccessTime;
        let pageSize = averageResponseIndicator.averagePageSize;
        let oldURL = averageResponseIndicator.externalResource.URL;
        
        let query = {
            name: "update average response indicator by url",
            text: "UPDATE average_response_indicators SET average_access_time = $1, average_page_size = $2, url = $3 WHERE url = $4",
            values: [accessTime, pageSize, oldURL, URL]
        };
        
        return this.dataAccessObjectFacade.query(query);
        
    }
    
    deleteByURL(URL){
        
        let query = {
            name: "delete average response indicator by url",
            text: "DELETE FROM average_response_indicators WHERE url = $1",
            values: [URL]
        };
                
        return this.dataAccessObjectFacade.query(query);
        
    }
    
    
}