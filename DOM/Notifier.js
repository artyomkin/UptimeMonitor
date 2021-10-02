export class Notifier{
    
    notify(telegramChat, message){
        
        let exec = require('child_process').exec;
        
        exec('curl -X POST  '+ telegramChat.webHook +' -d "message='+ message +'"');
        
    }
    
}