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
        
        return "Protection activated"
    }
    public get HP():number{
        return this.health
    }
    public get Damage():number{
        return this.damage
    }
    attack(enemy:any){
        enemy.health -= this.damage    
    }
    relive(){
        this.deathScrole++ 
        this.health = this.maxHealth
    }
    public get DeathScrole():string{
        this.deathScrole++ 
        this.health = this.maxHealth
        return `You died: ${this.deathScrole}`
    }
}