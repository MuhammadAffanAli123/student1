const express = require('express');
const router = express.Router();

const DownloadsController = require('../controllers/downloads');

/**
 * ROUTERS DEFINITIONS
 */

router.get('/:fileName',
    DownloadsController.download);

module.exports = router;
