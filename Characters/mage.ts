export class Mage{
    name:string 
    private deathScrole:number =0 
    private health:number = 80
    private damage:number = 100
    private protected:boolean // СПОСОБНОСТЬ ПОКА ЧТО В РАЗРАБОТКЕ
    constructor(name:string){
        this.name = name
    }
    print(){
        return `Mage: ${this.name}`
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
            this.health = 80
            this.deathScrole++
        }
    }
    public get DeathScrole():string{
        return `You died: ${this.deathScrole}`
    }
}