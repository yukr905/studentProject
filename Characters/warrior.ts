
export class Warrior{
    name:string 
    private deathScrole:number =0 
    private health:number = 200
    private damage:number = 50
    protection:boolean = false
    constructor(name:string){
        this.name = name
    }
    print(){
        return `Warrior: ${this.name}`
    }
    protected(){  // временная способность пока что ничего не делает только появляется
        this.protection = true
        setTimeout(()=>{
            this.protection = false        
        },1000)
    }
    public get Health():number{
        return this.health
    }
    public get Damage():number{
        return this.damage
    }
    public deffend(n:number){  // ПРОСТО ТЕСТ РАБОТАЕТ ЛИ 
        this.health -= n   
        if(this.health<=0){
            this.health = 200
            this.deathScrole++
        }
    }
    public get DeathScrole():string{
        return `You died: ${this.deathScrole}`
    }
}
