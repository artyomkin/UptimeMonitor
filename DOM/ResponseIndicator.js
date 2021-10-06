export class ResponseIndicator{
    
    constructor(accessTime = 0, pageSize = 0, responseCode = 0, externalResource = "-"){
        this.accessTime = accessTime;
        this.pageSize = pageSize;
        this.responseCode = responseCode;
        this.externalResource = externalResource;
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
    
    setExternalResource(externalResource){
        this.externalResource = externalResource;
    }
    
}

