import fs from 'fs';
import pg from 'pg';
import * as yaml from 'js-yaml';
import {ExternalResource} from '../DOM/ExternalResource.js';
import {DataAccessObjectFacade} from './DataAccessObjectFacade.js';
import {ExternalResourceDAO} from './ExternalResourceDAO.js';
export class ExternalResourceConfigManager{
    
    constructor(dataAccessObjectFacade){
        this.file = fs.readFileSync('./DOM/resources/config.yml').toString();
        this.dataAccessObjectFacade = dataAccessObjectFacade;
        this.externalResourceDAO = new ExternalResourceDAO(dataAccessObjectFacade);
        this.statesOfExternalResourcesInitialized = false;
        this.externalResources = [];
    }
    
    async getExternalResources(){
        
        if (!this.statesOfExternalResourcesInitialized){
            
            this.statesOfExternalResourcesInitialized = true;
            await this.#loadExternalResources()
            
        }
        
        return this.externalResources;
        
    }
    
    async #loadExternalResources(){
        
        let externalResourcesYML = yaml.load(this.file);
        for(let i = 0; i<externalResourcesYML.ExternalResource.length; i++){
            
            let URL = externalResourcesYML.ExternalResource[i].URL;
            
            this.externalResources.push(new ExternalResource(URL));
            
        }

        this.externalResourceDAO.createMany(this.externalResources);

        this.#getExternalResourcesStatesFromDB();
    }
    
    async #getExternalResourcesStatesFromDB(){
    
        if(this.externalResources.length > 0){
            
            let URLs = this.externalResources.map(externalResource => externalResource.URL);
            
            let states = await this.externalResourceDAO.readManyByURLs(URLs)
            
            this.#setExternalResourcesStatesLocally(states);
                
            
        }
       
    }
    
    
    async #setExternalResourcesStatesLocally(states){   
        
            for (let i = 0; i<states.length; i++){
                
                this.externalResources[i].setPreviousState(states[i]);
                
            }

    }
    

}

