// routes/enrollmentRoutes.js
router.post('/enroll', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        console.error('User not found');
        return res.status(404).json({ msg: 'User not found' });
      }
  
      const { courseId } = req.body;
      if (!courseId) {
        console.error('No course ID provided');
        return res.status(400).json({ msg: 'Course ID is required' });
      }
  
      if (user.courses.includes(courseId)) {
        console.error('User already enrolled in course');
        return res.status(400).json({ msg: 'User already enrolled in this course' });
      }
  
      user.courses.push(courseId);
      await user.save();
  
      res.status(200).json({ msg: 'Enrollment successful', courses: user.courses });
    } catch (err) {
      console.error('Server error during enrollment', err);
      res.status(500).json({ msg: 'Server error' });
    }
  });
  