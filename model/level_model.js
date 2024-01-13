import mongoose from "mongoose";

const levelSchema = mongoose.Schema({
   name:{
    type:String,
    required: true
   },
   courses:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course",
   }],
   students:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Student",
   }],
});

export const Level = mongoose.model("Level",levelSchema);