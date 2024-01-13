import mongoose from'mongoose';

// Define lectureSchema schema
const lectureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  course:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Course'
  },
  videoUrl:{
    type:String,
    default:''
  },
  pdfUrl:{
    type:String,
    default:''
   },
  image:{
    type:String,
    default:''
  },
  rating:[{
    type: Number,
    default: 0
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

lectureSchema.virtual('id').get(function(){
  return this._id .toHexString();
});

lectureSchema.set(('toJSON'),{
   virtuals :true
});
// Create the Lecture model based on the Lecture schema
export const Lecture = mongoose.model('Lecture', lectureSchema);
