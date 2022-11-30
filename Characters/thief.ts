
export class Thief{
    name:string 
    private deathScrole:number =0 
    private health:number = 100
    private damage:number = 25
    protection:boolean = false
    constructor(name:string){
        this.name = name
    }
    print(){
        return `Thief: ${this.name}`
    }
    protected(){   // временная способность пока что ничего не делает только появляется
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