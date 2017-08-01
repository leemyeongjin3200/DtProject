/**
 * Created by LEE on 2017-07-30.
 */

module.exports = function(app){
    var express = require('express');
    var router = express.Router();
    var path = require('path');
    var multer = require('multer');
    var fs = require('fs');

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, path.basename(file.originalname, '.jpg') + path.extname(file.originalname)) //Appending extension
        }
    })

    var upload = multer({storage : storage});

    router.post('/identify_person', upload.single('person'), function(req, res){
        res.send("yes");
    });

    var cpUpload = upload.fields([{ name: 'person', maxCount: 10 }])
    router.post('/add_person', cpUpload, function(req, res){
        res.send("yes1");
    });

    return router;
}