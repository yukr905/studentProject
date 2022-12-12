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
    protected(){  
        return "Protection activated"
    }
    public get HP():number{
        return this.health
    }
    public get Damage():number{
        return this.damage
    }
    attack(enemy:any){  
    }
    relive(){
        this.deathScrole++ 
        this.health = this.maxHealth
    }
    public get DeathScrole():string{
        return `You died: ${this.deathScrole}`
    }
}
