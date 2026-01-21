const mongoose = require('mongoose');
const { Schema } = mongoose;
const courseModel=require('../Models/Course')
const reviewSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Course is required'],
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },

    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating must be at most 5'],
    },

    comment: {
      type: String,
      trim: true,
      minlength: [4, 'Comment must be at least 4 characters'],
      maxlength: [500, 'Comment must be at most 500 characters'],
    },
  },
  {
    timestamps: true,
  }
);
reviewSchema.statics.updateCourseRating=async function(courseId)
{
  const stats=await this.aggregate([
    {$match:{course:courseId}},
    {
      $group:{
        _id:null,
        count:{$sum:1},
        avg:{$avg:'$rating'}
      }
    }
  ])
  const {count,avg}=stats[0]||{count:0,avg:0};
    await courseModel.findByIdAndUpdate(courseId,{
      averageRating:avg,
      ratingsCount:count,
    },{runValidators:true});
}
reviewSchema.post('save',async function(doc)
{
await doc.constructor.updateCourseRating(doc.course);
});
reviewSchema.post( /^(findOneAndUpdate|findOneAndDelete|findByIdAndUpdate|findByIdAndDelete)$/,async function(doc)
{
await doc.constructor.updateCourseRating(doc.course);
});
reviewSchema.index({ course: 1, user: 1 }, { unique: true });

const review = mongoose.model('Review', reviewSchema);
module.exports = review;
