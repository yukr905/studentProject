import {Mage} from "./Characters/mage"
import { Warrior } from "./Characters/warrior"
import {Thief} from "./Characters/thief"

let Jhon = new Warrior("Jhon")
let Frid = new Thief("Frid")
let Jhon1 = new Mage("Jhon1")
console.log(Jhon.print())
console.log(Jhon1.print())
console.log(Frid.print())
Jhon.protected()
console.log(Jhon.protection)
setTimeout(()=>{console.log(Jhon.protection)},4000)

Jhon.deffend(Jhon1.Damage)
Jhon.deffend(Jhon1.Damage)
Jhon1.deffend(Frid.Damage)
console.log(Jhon1.Health)
console.log(Jhon.DeathScrole)
console.log(Jhon.Health)
