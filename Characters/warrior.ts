import {Characters} from "./Character"
export class Warrior extends Characters{
    constructor(name:string){
        super()
        this.name = name
        this.health = 200
        this.maxHealth =200
        this.damage = 50
        this.protection = false
        this.deathScrole = 0
    }
    print(){
        return `Warrior: ${this.name}`
    }
    protected(){  // временная способность пока что ничего не делает только появляется
        return "Protection activated"
    }
    public get HP():number{
        return this.health
    }
    public get Damage():number{
        return this.damage
    }
    attack(enemy:any){  // ПРОСТО ТЕСТ РАБОТАЕТ ЛИ 
    }
    public get DeathScrole():string{
        return `You died: ${this.deathScrole}`
    }
}
