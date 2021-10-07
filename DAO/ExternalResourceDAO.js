import pg from 'pg';
export class ExternalResourceDAO{
    
    constructor(clientConn){
        
        this.clientConn = clientConn;
        
    }
    
    create(externalResource){
        
        let query = {
            name: "create external resource",
            text: "INSERT INTO external_resources (url, state) VALUES ($1,$2)",
            values: [externalResource.URL, externalResource.currentState.description]
        }
        
        return this.#getPromiseResult(query);
        
    }
    
    readByURL(URL){
        
        let query = {
            name: "fetch external resource by url",
            text: "SELECT * FROM external_resources WHERE url = $1",
            values: [URL]
        }
        
        return this.#getPromiseResult(query);
        
    }
    
    updateByURL(URL, externalResource){
                
        let query = {
            name: "update external resource by url",
            text: "UPDATE external_resources SET url = $1, state = $2 WHERE url = $3",
            values: [externalResource.URL, externalResource.currentState.description, URL]
        }
        
        return this.#getPromiseResult(query);
        
    }
    
    deleteByURL(URL){
        
        let query = {
            name: "delete external resource by url",
            text: "DELETE FROM external_resources WHERE url = $1",
            values: [URL]
        }
        
        return this.#getPromiseResult(query);
        
    }
    
    #getPromiseResult(query){
    
        return new Promise((resolve, reject) => {
            let client = new pg.Client(this.clientConn);
            client.connect();
            client.query(query,(err,res)=>{
                client.end();
                if(err) reject(err);
                else resolve(res);
            })
        });
    
    }
    
}