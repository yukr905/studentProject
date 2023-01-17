import  {Sequelize} from'sequelize-typescript'
import {conf} from "../config"


export const db = new Sequelize(conf.database,conf.username,conf.password,{
    host:"localhost",
    dialect:"postgres",
    port:5432
})