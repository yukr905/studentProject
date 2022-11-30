import { json } from "stream/consumers";
import { Warrior } from "./Characters/warrior";

let Jhon = new Warrior("Jhon")
let Frid = new Warrior("Frid")
console.log(Jhon.Health)
console.log(Jhon.print())
Jhon.protected()
console.log(Jhon.protection)
setTimeout(()=>{console.log(Jhon.protection)},4000)

Jhon.fight(Frid.Damage)
Jhon.fight(Frid.Damage)
Jhon.fight(Frid.Damage)
Jhon.fight(Frid.Damage)
console.log(Jhon.DeathScrole)
console.log(Jhon.Health)