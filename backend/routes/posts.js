const express = require('express');
const router = express.Router();

const extractFile = require("../midleware/file-management");

const PostController = require('../controllers/posts');

/**
 * ROUTERS DEFINITIONS
 */

router.post('',
  extractFile,
  PostController.convert);

module.exports = router;
