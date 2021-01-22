const express = require('express');
const router = express.Router();

const { Video } = require("../models/Video");

const multer = require('multer');
let ffmpeg = require('fluent-ffmpeg');

//=================================
//             Video
//=================================


let storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, 'server/uploads/');
    },
    filename: (req,file,cb)=>{
        cb(null,`${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req,file,cb)=> {
        const ext = path.extname(file.originalname)
        if(ext!=='.mp4'){
            return cb(res.status(400).end('only mp4 is allowed'),false);
        }
        cb(null,true);
    }
});

const upload = multer({storage:storage}).single('file');


router.post('/uploadfiles',(req,res)=>{
    //비디오를 서버에 저장한다.
    upload(req,res,err=>{
        if(err){
            return res.json({success: false,err})
        }
        return res.json({success:true, url:res.req.file.path, fileName : res.req.file.filename})
    })
});



router.post('/uploadVideo',(req,res)=>{
    //비디오 정보를 서버에 저장한다.
    const video = new Video(req.body);

    video.save((err,doc)=> {
        if(err){
            return res.json({
                success:false,err
            })
        }
        res.status(200).json({
            success:true
        })
    })
});


router.get('/getVideos',(req,res)=>{
    
    //비디오를 DB에서 가져온다.
    Video.find()
    .populate('writer')
    .exec((err,videos)=>{
        if(err){
            return res.status(400).send(err);
        }
        return res.status(200).json({
            success:true,
            videos
        })
    })
});


router.post('/getVideoDetail',(req,res)=>{
    
    //비디오를 DB에서 가져와 VideoDetailpage에 로드 한다.
    Video.findOne({'_id': req.body.videoId})
    .populate('writer')
    .exec((err,videoDetail)=> { 
        if(err){
            return res.status(400).send(err);
        }else{
            return res.status(200).json({success: true,videoDetail})
        }
    })
    
});


router.post('/getSideVideo',(req,res)=>{
    
    //비디오를 DB에서 가져와 SideVideo로 보낸다
    Video.find()
    .populate('writer')
    .exec((err,sideVideos)=>{
        if(err){
            return res.status(400).send(err);
        }else{
            return res.status(200).json({
                success:true,
                sideVideos
            })
        }
    })
    
});

router.post('/thumbnail',(req,res)=>{
    // 썸네일 생성하고 비디오 러닝타임 가져오기 


    let filePath = '';
    let fileDuration= '';

    // 비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.url, function(err,metadata){
        console.log(metadata);
        console.log(metadata.format.duration);
        fileDuration = metadata.format.duration;
    })

    // 썸네일 생성
    ffmpeg(req.body.url)
    .on('filenames',function(filenames){
        console.log('Will Generate '+ filenames.join(', '))
        console.log(filenames)
        filePath = 'thumbnails/'+ filenames[0]
    })
    .on('end',function() {
        console.log('Screenshots taken');
        return res.json({success:true, url:filePath, fileDuration: fileDuration})
    })
    .on('error',function (err) {
        console.log(err);
        return res.json({success:false, err});
    })
    .screenshots({
        count:1,
        folder:'server/uploads/thumbnails/',
        size:'320x240',
        filename:'thumbnail-%b.png'
    })
});


module.exports = router;