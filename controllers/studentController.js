const { Student, Course } = require('../models');

exports.registerStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.unregisterStudent = async (req, res) => {
  try {
    const student = await Student.destroy({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.filterStudents = async (req, res) => {
  try {
    const keyword = req.query.keyword || '';
    const students = await Student.findAll({
      where: {
        [Op.or]: [
          { username: { [Op.like]: `%${keyword}%` } },
          { email: { [Op.like]: `%${keyword}%` } },
          { firstname: { [Op.like]: `%${keyword}%` } },
          { lastname: { [Op.like]: `%${keyword}%` } },
        ],
      },
    });
    res.json(students);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.registerForCourse = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.studentId);
    const course = await Course.findByPk(req.params.courseId);
    await student.addCourse(course);
    res.status(201).json({ message: 'Registered for course' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.unregisterFromCourse = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.studentId);
    const course = await Course.findByPk(req.params.courseId);
    await student.removeCourse(course);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
