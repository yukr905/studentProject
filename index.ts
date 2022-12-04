import {Factory} from "./pattern/Factory"

let mage = Factory.createCharacter("Mage","Jhon")
let warrior = Factory.createCharacter("Warrior","Jhon")
console.log(mage.print())
console.log(warrior.print())




