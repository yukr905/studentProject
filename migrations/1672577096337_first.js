/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable("classes",{
        id:'id',
        name:{type:"varchar(30)",unique:true},
        health:{type:"integer",notNull: true,},
        damage:{type:"integer",notNull: true,},
        attack_type:{type:"varchar(50)",notNull: true,},
        ability:{type:"boolean",default:false},
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        updateAt:{
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        }
    })
    pgm.createTable("users", {
        id:'id',
        name:{type:"varchar(30)",unique:true,notNull: true,},
        email:{type:"varchar(60)",unique:true,notNull: true,},
        password:{type:"varchar(50)",notNull: true},
        class_Id: {
            type: 'integer',
            notNull: true,
            references: '"classes"',
            onDelete: 'cascade',
            },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    updateAt:{
        type: 'timestamp',
        notNull: true,
        default: pgm.func('current_timestamp'),
    }
    })
   
    pgm.createIndex('users', 'class_Id')
};

exports.down = pgm =>{
    pgm.dropTable("users")
    pgm.dropTable("classes")
}
