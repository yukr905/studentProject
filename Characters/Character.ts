export abstract class Characters{
    protected name:string
    protected health: number;
    protected maxHealth:number
    protected damage: number;
    protected protection: boolean;
    protected deathScrole:number

    abstract get HP(): number 
    abstract print():string
    abstract get Damage():number
    abstract protected():string 
    abstract attack(enemy:any):any
    abstract get DeathScrole():string
}