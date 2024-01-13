import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true
  },
  courses:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Course'
  }],
  level: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Level',
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
 
  createdAt: {
    type: Date,
    default: Date.now
  }
});


studentSchema.virtual('id').get(function(){
    return this._id .toHexString();
  });
  
  studentSchema.set(('toJSON'),{
     virtuals :true
  });

export const Student = mongoose.model('Student', studentSchema);


