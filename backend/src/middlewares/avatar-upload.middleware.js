const multer = require("multer");
const path = require("path");
const ApiError = require("../api-error");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../../public/uploads/"));
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + path.extname(file.originalname));
  },
});

// Allow all file types (only for testing!)
const fileFilter = (req, file, cb) => {
  cb(null, true); // accept all files
};

function avatarUpload(req, res, next) {
  const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
    "File"
  );

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return next(
        new ApiError(400, "An error occurred while uploading the file")
      );
    } else if (err) {
      return next(
        new ApiError(
          500,
          "An unknown error occurred while uploading the file"
        )
      );
    }
    next();
  });
}

module.exports = {
  avatarUpload,
};
