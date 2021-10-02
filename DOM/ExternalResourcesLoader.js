import fs from 'fs';
import * as yaml from 'js-yaml';
export class ExternalResourcesLoader{
    
    constructor(){
        this.file = fs.readFileSync('config.yml').toString();
    }
    
    loadExt(){
        
        return yaml.load(this.file);
        
    }
    
}

