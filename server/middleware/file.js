const multer = require('multer')

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const isValid = MIME_TYPE_MAP[file.mimetype]
    let error = isValid ? null : new Error('Invalid MIME type')
    callback(error, 'images')
  },
  filename: (req, file, callback) => {
    const name = file.originalname
      .toLowerCase()
      .split(' ')
      .join('-')
    const ext = MIME_TYPE_MAP[file.mimetype]
    callback(null, name + '-' + Date.now() + '.' + ext)
  }
})

module.exports = multer({ storage }).single('image')
