import fs from 'fs';
import pg from 'pg';
import * as yaml from 'js-yaml';
import {ExternalResource} from '../DOM/ExternalResource.js'
export class ExternalResourceConfigManager{
    
    constructor(clientConn){
        this.file = fs.readFileSync('./DOM/resources/config.yml').toString();
        this.externalResources = [];
        this.clientConn = clientConn;
        
   
        
    }
    
    getExternalResources(){
        this.#loadExternalResources();
        await this.#startStateSetting();
        
        
        return this.externalResources;
        
    }
    
    #loadExternalResources(){
        
        let externalResourcesYML = yaml.load(this.file);
        for(let i = 0; i<externalResourcesYML.ExternalResource.length; i++){
            
            let URL = externalResourcesYML.ExternalResource[i].URL;
            
            this.externalResources.push(new ExternalResource(URL));
            
        }
        
    }
    
    async #startStateSetting(){
    
        let externalResourceIndex = 0;

        const values = await this.#setExternalResourceState(externalResourceIndex);
        
   
    
    }
    
    #setExternalResourceState(externalResourceIndex){
    
        if (externalResourceIndex >= this.externalResources.length) return;
    
        let query = {
            name: "select state from external resources by url",
            text: "SELECT * FROM external_resources WHERE url = $1;",
            values: [this.externalResources[externalResourceIndex].URL]
        }
        
        return new Promise((resolve, reject)=>{
            let client = new pg.Client(this.clientConn);
            client.connect();
            client.query(query, (err,res)=>{
                client.end();
                if (err) reject();
                else {
                    if(res.rowCount > 0){
                        this.externalResources[externalResourceIndex].previousState = res.rows[0].state;
                    }
                    resolve();
                    
                }
            })
        }).then(()=>{
            return this.#setExternalResourceState(externalResourceIndex+1);
        })
    
    }
}

