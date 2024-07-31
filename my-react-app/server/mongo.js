//mongo.js
db.students.insertOne({
    "username": "johndoe",
    "email": "johndoe@example.com",
    "firstname": "John",
    "lastname": "Doe",
    "telephone": "123-456-7890",
    "address": "123 Main St"
  });
  db.courses.insertOne({
    "course_name": "Math 101",
    "course_description": "Introduction to Mathematics"
  });
  db.registrations.insertOne({
    "student_id": ObjectId("..."), // Replace with the actual ObjectId of the student
    "course_id": ObjectId("...")   // Replace with the actual ObjectId of the course
  });
  db.students.deleteOne({ "_id": ObjectId("...") }); // Replace with the actual ObjectId of the student
  db.registrations.deleteOne({
    "student_id": ObjectId("..."), // Replace with the actual ObjectId of the student
    "course_id": ObjectId("...")   // Replace with the actual ObjectId of the course
  });
  db.students.find({
    $or: [
      { "username": { $regex: "john", $options: "i" } },
      { "email": { $regex: "example", $options: "i" } },
      { "firstname": { $regex: "John", $options: "i" } },
      { "lastname": { $regex: "Doe", $options: "i" } }
    ]
  });
  db.courses.find({ "course_name": { $regex: "Math", $options: "i" } });
          
  const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

  const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  username: String,
  email: String,
  firstname: String,
  lastname: String,
  telephone: String,
  address: String
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
