const { Router } = require("express");
const router = Router();
const multerTempUploads = require("../../middleware/multer");

const fs = require("fs");

router.post("/", multerTempUploads, async (req, res) => {

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

module.exports = router;