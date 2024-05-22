


const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');

router.post('/login', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    console.log(`Role: ${role}`);

    const data = await controller.authenticateUser(role, username, password);

    if (data) {
      const authority = data.role || 'unknown';
      console.log(authority);
      res.status(200).json({ message: 'Login successful', ...data, authority: [authority] });
    } else {
      res.status(401).json({ error: 'Login failed' });
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ error: 'Error authenticating user' });
  }
});

module.exports = router;
