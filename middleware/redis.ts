import { client } from "../index"


export async function redis_list(action:string):Promise<any> {
    await client.RPUSH("mylist",action)
    const result = await client.LLEN("mylist")
    if(result >10){
        await client.lPop("mylist")
    }    
    const result1 = await client.lRange("mylist",0,9)
    return result1
}