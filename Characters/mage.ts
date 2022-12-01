import {Characters} from "./Character"
export class Mage extends Characters{
    constructor(name:string){
        super()
        this.name = name
        this.health = 80
        this.maxHealth =80
        this.damage = 100
        this.protection = false
        this.deathScrole = 0
    }
    print(){
        return `Mage: ${this.name}`
    }
    protected():string{   // временная способность пока что ничего не делает только появляется
        super.protected()
        return "Protection activated"
    }
    public get Health():number{
        return this.health
    }
    public get Damage():number{
        return this.damage
    }
    attack(enemy:any){  // ПРОСТО ТЕСТ РАБОТАЕТ ЛИ 
        super.attack(enemy)
    }

    public get DeathScrole():string{
        return `You died: ${this.deathScrole}`
    }
}