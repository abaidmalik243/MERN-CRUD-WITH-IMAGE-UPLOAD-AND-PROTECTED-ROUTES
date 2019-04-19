const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const checkAuth = require('../middleware/check-auth');
const multer=require('multer');
const path=require('path');
const fs = require('fs');
var storage = multer.diskStorage({
    destination : './public/uploads',
    filename : function(req , file,cb){//replace function 
        cb(null, new Date().toISOString().replace(/:/g,'-')+file.originalname);
    }
});
  
 
const upload = multer({
    storage : storage,
    limits : {fileSize :1345330},
    fileFilter : function(req,file,cb){
        checkfile(file,cb);
        
    }
});

function checkfile(file,cb){

    const fileTypes = /jpg|png|jpeg|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    
    const mimetype = fileTypes.test(file.mimetype);
    if(mimetype && extname){
    return cb(null , true)
    }
    else {
    cb('Error, Images only');
    }
    }

    router.post('/add', upload.single('imageUpload'), (req, res) => {
        if (req.file) {
            console.log('Uploading file...');
        const book = new Book({
                name: req.body.name,
                desc: req.body.desc,
                imageUpload :req.file.filename,
            });
            book.save().then(result=>{
                console.log('data save');
                res.status(200).json({result});
            }).catch(err=>{console.log(err)});
        } else {
            console.log('No File Uploaded');
           
        }
        
        
        });
        


router.get('/getAllBooks', (req, res) => {
    Book.find().then(resp => res.json(resp));
})

router.delete('/deleteBook', (req, res) => {
    Book.findById({_id:req.body.id},(err,result)=>{
        if(result){
               fs.unlink('./public/uploads/'+result.imageUpload, function (err) {
        if (err) throw err;
           Book.findByIdAndRemove({ _id: req.body.id }, (err, result) => {
        if (err) {
            return res.status(400).json(err);
        }
        res.send(result);

    })
        console.log('File deleted!');
    });
        }else{
            console.log('There is Some Problem in Deleting');
        }
});
 
});
router.put('/updateBook', upload.single('imageUpload'), (req, res) => {
    if (req.file) {
        console.log('Uploading file...');
        Book.findByIdAndUpdate({ _id: req.body.id }, { name: req.body.name, desc: req.body.desc,imageUpload:req.file.filename }, (err, result) => {
            if (err) {
                return res.status(400).json(err);
            }
            res.send(result);
        });
    } else {
        console.log('No File Uploaded');
       
    }
    
    
    });


router.get('/:id', (req, res) => {
    Book.findById( req.params.id,(err , result) => {

        if(err){
            return res.status(400).json(err);
        }
        res.json(result);
    })
        
})
module.exports = router;