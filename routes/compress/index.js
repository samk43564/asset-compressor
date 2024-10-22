const { Router } = require("express");
const router = Router();
const multerUploads = require("../../middleware/multer");

const fs = require("fs");

router.post("/image", multerUploads, async (req, res) => {

  const filepath = req.file.path
  const host = req.headers.host
 
    const id = shortid.generate();
    await new Promise(function (resolve, reject) {
      return fs.readFile(filepath, (err, data) => {
        sharp(data)
          .rotate()
          .toBuffer()
          .then((mindata) => {
            (async () => {
              try {
                const files = await imagemin.buffer(mindata, {
                  destination: "public",
                  plugins: [
                    imageminMozjpeg({ quality: 80 }),
                    imageminPngquant({
                      quality: [0.7, 0.8],
                    }),
                  ],
                });
                fs.writeFile(`public/${id}.jpeg`, files, function (err) {
                  if (err) {
                    throw err;
                  }
                  setTimeout(() => {
                    fs.unlink(`public/${id}.jpeg`, function (err) {
                      if (err) throw err;
                    });
                  }, 100000);
                  resolve(`http://${host}/${id}.jpeg`);
                });
              } catch (error) {
                return error;
              }
            })();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
  fs.unlink(req.file.path, function (err) {
    if (err) throw err;
  });
  res.send(data);
});

router.post("/video", multerUploads, (req, res) => {
  let inputFileName = req.file.originalname
  const inputFilePath = path.join(req.file.path);
  const outputFileName = inputFileName.replace('.mkv', '.mp4');
  const outputFilePath = path.join('public', outputFileName);

  // Command to convert MKV to MP4 using FFmpeg
  const ffmpegCommand = `ffmpeg -i "${inputFilePath}" -c:v libx264 -crf 23 -preset medium -c:a copy "${outputFilePath}"`;

  // Execute FFmpeg command
  exec(ffmpegCommand, (error, stdout, stderr) => {
    if (error) {
      console.error('Conversion failed:', error);
      return res.status(500).json({ error: 'Conversion failed' });
    }
    const downloadLink = `/download/${outputFileName}`;
    res.json({ downloadLink });
  });
});

module.exports = router;