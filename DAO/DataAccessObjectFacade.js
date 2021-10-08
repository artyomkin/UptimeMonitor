import pg from 'pg';
export class DataAccessObjectFacade{
    
    constructor(clientConn){
        
        this.clientConn = clientConn;
        
    }
    
    async query(query){

        let client = new pg.Client(this.clientConn);
        client.connect();
        let result = await client.query(query);
        client.end();

        return result;
    
    }
    
}