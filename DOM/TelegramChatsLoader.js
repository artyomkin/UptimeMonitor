import fs from 'fs'
import * as yaml from 'js-yaml';

export class TelegramChatsLoader{

    constructor(){
        
        this.file = fs.readFileSync('./DOM/resources/telegramChats.yml').toString();
        
    }
    
    getChats(){
        
        return yaml.load(this.file).telegramChats;
        
    }

}