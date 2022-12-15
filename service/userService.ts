
export async function registerUser(user:any){
    if(user.password1 !== user.password2){
        return "Passwords do not match, please check again "
    }
    if(user.class !== "Warrior" &&  user.class !=="Mage" && user.class !=="Thief"){
        return "Mage or Warrior or Thief"
    }
    // запрос к БД
    return true 
}
export async function loginUser(user:any){
    //тут должен быть запрос к БД
    return true //потом будем возвращать JWT токен
}
export async function getMeInfo(user:any){
    //тут должен быть запрос к БД
    return true
}
export async function updateUser(user:any){
    if(user.password1 !== user.password2){
        return "Passwords do not match, please check again "
    }
    if(user.class !== "Warrior" &&  user.class !=="Mage" && user.class !=="Thief"){
        return "Mage or Warrior or Thief"
    }
    //тут должен быть запрос к БД
    return true // новый JWT 
}