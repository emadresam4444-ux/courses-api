const mongoose = require("mongoose");
const { Schema } = mongoose;
const enrollmentSchema = new Schema(
{
user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
},
course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
},
status: {
    type: String,
    enum: ["pending", "active", "in-progress", "complete", "rejected"],
    default: "in-progress",
},
},
{ timestamps: true },
);
const EnrollmentModel = mongoose.model("Enrollment", enrollmentSchema);
module.exports = EnrollmentModel;
