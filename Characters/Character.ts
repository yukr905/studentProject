export abstract class Characters{
    protected name:string
    protected health: number;
    protected maxHealth:number
    protected damage: number;
    protected protection: boolean;
    protected deathScrole:number

    get HP(): number {
        return this.health
    }
    print(){
        return `${this.name}`
    }
    get Damage():number{
        return this.Damage
    }
    protected():string{   
        this.protection = true
        setTimeout(()=>{
            this.protection = false        
        },30000)
        return "Protetion activated"
    }
    attack(enemy:any){  
        enemy.health -= this.damage
        if(enemy.health<=0){
            enemy.health = enemy.maxHealth
            enemy.deathScrole++
        }
    }
    get DeathScrole():string{
        return `You died: ${this.deathScrole}`
    }
}