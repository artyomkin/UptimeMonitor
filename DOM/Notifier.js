import * as child_process from 'child_process';
export class Notifier{
    
    constructor(telegramChats){
        this.telegramChats = telegramChats;
    }
    
    setTelegramChats(telegramChats){
        
        this.telegramChats = telegramChats;
        
    }
    
    notify(message){
        
        if(message != undefined && message.length > 0){
            let exec = child_process.exec;
            this.telegramChats.forEach((telegramChat,index,array) => {
                exec('curl -X POST '+ telegramChat.webHook +' -d "message='+ message +'"');
            })
        }

        
    }
    
}