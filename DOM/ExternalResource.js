export class ExternalResource{
    
    constructor(URL){
        this.URL = URL;
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