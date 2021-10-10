import fs from 'fs'
import * as yaml from 'js-yaml';

export class DBConfigLoader{

    constructor(){
        
        this.file = fs.readFileSync('./DOM/resources/db.yml').toString();
        
    }
    
    getConfig(){
        
        return yaml.load(this.file).clientConn;
        
    }

}