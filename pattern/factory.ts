import {classCharacter} from "./facade" 
import {Mage} from "../Characters/mage" 
import {Thief} from "../Characters/thief" 
import {Warrior} from "../Characters/warrior" 
export class Factory{ 
    static createCharacter(className:string,name:string){
         switch (className){ 
            case classCharacter.Thief:
                 return new Thief(name) 
            case classCharacter.Mage:
                 return new Mage(name)
            case  classCharacter.Warrior:
                 return new Warrior(name)
            default: throw new Error('Invalid class name'); 
        } 
    } 
}