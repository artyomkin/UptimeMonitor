import {Enum} from './Enum.js';
export class ExternalResourceStatesEnum{
    
    constructor(){
        
        this.states = Enum({UNDEFINED: "undefined", AVAILABLE: "available", DEVIATION: "deviation", UNAVAILABLE: "unavailable"});
        
    }
    
}