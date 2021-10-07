export function Enum(obj){
    
    const newObj = {};
    
    for (let property in obj){
        
        if (obj.hasOwnProperty(property)){
            
            newObj[property] = Symbol(obj[property]);
            
        }
        
    }
    
    return Object.freeze(newObj);
    
}