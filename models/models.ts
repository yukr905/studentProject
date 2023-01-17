import { Model, Optional, DataTypes } from 'sequelize';
import {db} from './db'

interface classesAttributes {
  id: number
  name: string
  health: number
  damage: number
  ability: boolean
  attack_type: string
}

interface classesCreationAttributes
  extends Optional<classesAttributes, 'id'> {}

interface classesInstance
  extends Model<classesAttributes, classesCreationAttributes>,
    classesAttributes {
      createdAt?: Date;
      updateAt?: Date;
    }

const Classes = db.define<classesInstance>(
  'classes',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    name:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    health:{
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    damage:{
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    attack_type:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    ability:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }
);
interface usersAttributes {
  id: number
  username: string
  email: string
  password: string
  class_id:number
}

interface usersCreationAttributes
  extends Optional<usersAttributes, 'id'> {}

interface usersInstance
  extends Model<usersAttributes, usersCreationAttributes>,
    usersAttributes {
      createdAt?: Date;
      updateAt?: Date;
    }

const Users = db.define<usersInstance>(
  'users',
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement:true
    },
    username:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    class_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }
);

Users.belongsTo(Classes,{
  foreignKey:"class_id",
  as:"classes"
})
export {Classes,Users}
  
