import fs from 'fs';
import * as yaml from 'js-yaml';
import {ExternalResource} from './ExternalResource.js'
export class ExternalResourcesLoader{
    
    constructor(){
        this.file = fs.readFileSync('resources/config.yml').toString();
        this.externalResources = [];
    }
    
    loadExternalResources(){
        
        let externalResourcesYML = yaml.load(this.file);
        for(let i = 0; i<externalResourcesYML.ExternalResource.length; i++){
            
            let URL = externalResourcesYML.ExternalResource[i].URL;
            
            this.externalResources.push(new ExternalResource(URL));
            
        }
        
        return this.externalResources;
        
    }
    
}

