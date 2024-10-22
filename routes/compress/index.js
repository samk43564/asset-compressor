const { Router } = require("express");
const router = Router();
const multerTempUploads = require("../../middleware/multer");

const fs = require("fs");

router.post("/", multerTempUploads, async (req, res) => {
  if (!req?.file?.path) {
   return res.send("error")
  }
  const filepath = req.file.path
  const host = req.headers.host
 
  res.send("data");
});

module.exports = router;
