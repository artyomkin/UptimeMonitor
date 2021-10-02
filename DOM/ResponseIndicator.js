export class ResponseIndicator{
    
    constructor(){
        this.accessTime = 0;
        this.pageSize = 0;
        this.responseCode = 0;
    }
    
    setAccessTime(accessTime){
        this.accessTime = accessTime;
    }
    
    setPageSize(pageSize){
        this.pageSize = pageSize;
    }
    
    setResponseCode(responseCode){
        this.responseCode = responseCode;
    }
    
}

