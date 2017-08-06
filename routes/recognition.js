/**
 * Created by LEE on 2017-07-30.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');
var fs = require('fs');
var connect_multiparty = require('connect-multiparty');
var multiparty = connect_multiparty();
var rp = require('request-promise');

var uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0'
var apiKey = '400a09a00ad54a24ab4cb4549b751782';
var groupId = "friends";

module.exports = function(app){
    router.post('/identify_person', multiparty, function(req, res){
        //createGroup();
        //getPersonGroup();
        //getPersonGroupTrainingStatus();
        //trainingPersonGroup();

        face_detect('http://cfile3.uf.tistory.com/image/217D4D4657CD41452E4A4B', function(data){
            var faceId = data[0].faceId;
            var faceSmile = data[0].faceAttributes.smile
            var faceEmotion = data[0].faceAttributes.emotion;

            console.log(faceId);
            console.log(faceSmile);
            console.log(JSON.stringify(faceEmotion));
        });



/*        fs.rename(req.files.person.path, './uploads/' + req.files.person.originalFilename, function(){
            console.log("Save Image");

            fs.unlink(req.files.person.path, function(){
                console.log("Delete Temp Image");
            })
        });*/



        res.send("yes");
     });

    router.post('/add_person', multiparty, function(req, res){
        console.log(req.files);
        console.log(req.files.person.path);

        console.log(req.files.person.length);

        for(var i=0; i<req.files.person.length; i++){
            var temp = req.files.person[i].path;

            fs.rename(temp, './uploads/' + req.files.person[i].originalFilename, function(){
                console.log("Save Image");

                fs.unlink(temp, function(){
                    console.log("Delete Temp Image");
                })
            });
        }
        res.send("YESS");
    });

    /*    var storage = multer.diskStorage({
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
     });*/


    return router;
}

function createGroup(){
    var params = {
        personGroupId : groupId
    }

    var options = {
        method: "PUT",
        headers: {
            'Ocp-Apim-Subscription-Key': apiKey
        },
        uri: uriBase + '/persongroups/{personGroupId}?personGroupId=' + params.personGroupId,
        body: {
            name:"friends"
        },
        json: true
    };

    rp(options)
        .then(function (data){
            console.log(data)
        }).catch(function(err){
        console.log(err);
    })
}

function getPersonGroup(){
    var params = {
        personGroupId : groupId
    }

    var options = {
        method: "GET",
        headers: {
            'Ocp-Apim-Subscription-Key': apiKey
        },
        uri: uriBase + '/persongroups/{personGroupId}?personGroupId=' + params.personGroupId,
        json: true
    };

    rp(options)
        .then(function (data){
            console.log(data)
        }).catch(function(err){
        console.log(err);
    })
}

function getPersonGroupTrainingStatus(){
    var params = {
        personGroupId : groupId
    }

    var options = {
        method: "GET",
        headers: {
            'Ocp-Apim-Subscription-Key': apiKey
        },
        uri: uriBase + '/persongroups/{personGroupId}/training?personGroupId=' + params.personGroupId,
        json: true
    };

    rp(options)
        .then(function (data){
            console.log(data)
        }).catch(function(err){
        console.log(err);
    })
}

function trainingPersonGroup(){
    var params = {
        personGroupId : groupId
    }

    var options = {
        method: "POST",
        headers: {
            'Ocp-Apim-Subscription-Key': apiKey
        },
        uri: uriBase + '/persongroups/{personGroupId}/train?personGroupId=' + params.personGroupId,
        json: true
    };

    rp(options)
        .then(function (data){
            console.log(data)
        }).catch(function(err){
        console.log(err);
    })
}

function face_detect(face_url, callback){
    var params = {
        returnFaceId: "true",
        returnFaceLandmarks: "false",
        returnFaceAttributes: "age,gender,smile,emotion",
    }

    var options = {
        method: "POST",
        headers: {
            'Ocp-Apim-Subscription-Key': apiKey
        },
        uri: uriBase + '/detect?returnFaceId=' + params.returnFaceId + '&returnFaceLandmarks=' +
        params.returnFaceLandmarks + '&returnFaceAttributes=' + params.returnFaceAttributes,
        qs: {
            maxCandidates: 1
        },
        body: {
            url: face_url
        },
        json: true
    };

    rp(options)
        .then(function (data){
            callback(data);
        }).catch(function(err){
        console.log(err);
    })
}