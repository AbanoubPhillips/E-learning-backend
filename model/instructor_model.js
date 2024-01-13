import mongoose from 'mongoose';

const instructorSchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now
  }
});


instructorSchema.virtual('id').get(function(){
    return this._id .toHexString();
  });
  
  instructorSchema.set(('toJSON'),{
     virtuals :true
  });

export const Instructor = mongoose.model('Instructor', instructorSchema);


