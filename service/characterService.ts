import {Classes} from "../models/models"

export class characterService{
    static  async  allClass(): Promise<any> {
        const characters = await Classes.findAll()
        return characters
    }
}