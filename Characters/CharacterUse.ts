export class CharacterUse{
    static attackUse(attacking:any, enemy:any){
        if ((enemy.health - attacking.damage) < 0) {
            return enemy.deathScroleUse(enemy)
        }

        attacking.attack(enemy);
    }
    static protectedUse(hero: any) {
        hero.protected();
    }

    static deathScroleUse(hero: any){
        if(hero.health > 0){
            console.log('Your character is  live')
        }    
        hero.relive()
    }
}