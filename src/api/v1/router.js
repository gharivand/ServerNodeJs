const express = require('express');
// const fileRoutes = require('./files/routes');
// const userRoutes = require('./user/routes');

const router = express.Router();

router.get('/status', (req, res) => res.send('OK'));

router.use('/images', express.static('public'));
// router.use('/files', fileRoutes);
// router.use('/user', userRoutes);

module.exports = router;
