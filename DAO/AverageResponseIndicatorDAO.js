import pg from 'pg';
export class AverageResponseIndicatorDAO{

    constructor(client){
        this.client = client;
    }
    
    create(averageResponseIndicator){
        
        console.log(this.client);
        this.client.connect()
        
        this.сlient.query('SELECT * from average_response_indicators', (err, res) => {
            console.log(res)
            client.end()
        })

        
    }
    
}