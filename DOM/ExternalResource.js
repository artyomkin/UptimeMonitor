import {ExternalResourceStatesEnum} from './ExternalResourceStatesEnum.js';
export class ExternalResource{
    
    constructor(URL){
        this.URL = URL;
        this.states = new ExternalResourceStatesEnum().states;
        this.previousState = this.states.UNDEFINED;
        this.currentState = this.states.UNDEFINED;
    }
    
    setURL(URL){
        this.URL = URL;
    }
    
    setPreviousState(state){
        this.previousState = state;
    }
    
    setCurrentState(state){
        this.currentState = state;
    }
}