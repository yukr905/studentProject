import {Mage} from "./Characters/mage"
import { Warrior } from "./Characters/warrior"
import {Thief} from "./Characters/thief"

let Jhon = new Warrior("Jhon")
let Frid = new Thief("Frid")
let Jhon1 = new Mage("Jhon1")
console.log(Jhon.print())
console.log(Jhon1.print())
console.log(Frid.print())
console.log(Jhon.protected())
console.log(Jhon1.protected())
console.log(Jhon.Damage)
console.log(Jhon1.Health)
Jhon.attack(Jhon1)
Jhon.attack(Jhon1)
console.log(Jhon1.DeathScrole)
console.log(Jhon1.Health)


