const { Course } = require('../models');

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.destroy({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.filterCourses = async (req, res) => {
  try {
    const keyword = req.query.keyword || '';
    const courses = await Course.findAll({
      where: {
        course_name: { [Op.like]: `%${keyword}%` },
      },
    });
    res.json(courses);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
