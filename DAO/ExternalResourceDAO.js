import pg from 'pg';
import {DataAccessObjectFacade} from './DataAccessObjectFacade.js';
export class ExternalResourceDAO{
    
    constructor(dataAccessObjectFacade){
        
        this.dataAccessObjectFacade = dataAccessObjectFacade;
        
    }
    
    create(externalResource){
        let query = {
            name: "create external resource",
            text: "INSERT INTO external_resources (url, state) VALUES ($1,$2)",
            values: [externalResource.URL, externalResource.currentState.description]
        }
        
        return this.dataAccessObjectFacade.query(query);
        
    }
    
    createMany(externalResources){
        
        if(externalResources.length > 0){
            
            let queryText = "INSERT INTO external_resources (url, state) VALUES ($1,$2)";
            let values = [];
            externalResources.forEach((externalResource, index, array) => {
                if(index < externalResources.length-1){
                    queryText += ", ($" + (index * 2 + 3).toString() + ",$" + (index * 2 + 4).toString() + ")"
                }
                values.push(externalResource.URL);
                values.push(externalResource.currentState.description);
            })
        
            queryText += " ON CONFLICT (url) DO NOTHING";
            
            let query = {
                name: "create many instances if it causes no conflict",
                text: queryText,
                values: values
            }
            
            return this.dataAccessObjectFacade.query(query);
            
        }

        
    }
    
    readByURL(URL){
        
        let query = {
            name: "fetch external resource by url",
            text: "SELECT * FROM external_resources WHERE url = $1",
            values: [URL]
        }
        
        return this.dataAccessObjectFacade.query(query);
        
    }
    
    readManyByURLs(URLs){
        
            let queryText = "SELECT * FROM external_resources WHERE url = $1"
            for (let i = 0; i<URLs.length-1; i++){
                
                queryText += " OR url = $" + (i+2).toString();

            }
            
            let query = {
                name: "select all from external resources by urls",
                text: queryText,
                values: URLs
            }

            return this.dataAccessObjectFacade.query(query);
            
        
    }
    
    updateByURL(URL, externalResource){
                
        let query = {
            name: "update external resource by url",
            text: "UPDATE external_resources SET url = $1, state = $2 WHERE url = $3",
            values: [externalResource.URL, externalResource.currentState.description, URL]
        }
                
        return this.dataAccessObjectFacade.query(query);
        
    }
    
    deleteByURL(URL){
        
        let query = {
            name: "delete external resource by url",
            text: "DELETE FROM external_resources WHERE url = $1",
            values: [URL]
        }
        
        return this.dataAccessObjectFacade.query(query);
    
    }
    
}