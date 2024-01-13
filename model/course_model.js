import mongoose from'mongoose';

// Define course schema
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  instructor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Instructor'
  },
  lectures:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Lecture'
  }],
  students:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Student'
  }],
  image:{
    type:String,
    default:''
  },
  images :[{
  type: String
  }],
  rating:{
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

courseSchema.virtual('id').get(function(){
  return this._id .toHexString();
});

courseSchema.set(('toJSON'),{
   virtuals :true
});
// Create the Product model based on the product schema
export const Course = mongoose.model('Course', courseSchema);

