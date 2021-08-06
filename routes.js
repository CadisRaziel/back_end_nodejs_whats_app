//aqui vamos trabalhar o envio e recebimentos de imagens
//instalamos o npm install multer -> para com imagens, transferencia de imagens


const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (res, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '.jpg') //timestap.jpg
    }
})


const upload = multer({
    storage: storage
});

router.route("/addimage").post(upload.single('img'), (req, res) => {
    try {
        res.json({ path: req.file.filename })
    }
    catch (e) {
        return res.json({ error: e })
    }
})

//como estamos utilizando essa routes no index.js precisamos exportala para que o index consiga usa-la
module.exports = router;