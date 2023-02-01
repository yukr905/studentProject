import { Schema, model, connect, Types } from 'mongoose'

interface IUser {
    _id:number,
    username: string;
    hp: number;
    statuses: Types.Array<number>;
  }
  
  const userSchema = new Schema<IUser>({
    _id: {type:Number,required:true},
    username: { type: String, required: true },
    hp: { type: Number, required: true },
    statuses: {type: [Number],required:true}
  })
  
  export const UserWs = model<IUser>('UserWs', userSchema);