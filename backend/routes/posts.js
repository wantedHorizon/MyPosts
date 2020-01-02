const express = require("express");
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const Post = require('../models/post');

const router = express.Router();
const MINE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg':'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MINE_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if(isValid){
      error = null;
    
    }
    cb(null, "backend/images");
    
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
    const ext = MINE_TYPE_MAP[file.mimetype];
    cb(null, name +'-' +Date.now() + '.'+ ext);
  }
});

//xh9z89KGfRWI5SfY
router.post("",
checkAuth,
 multer({storage: storage}).single('image'),
 (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
    const post = new Post({
     
      title: req.body.title,
      content: req.body.content,
      imagePath: url+"/images/" + req.file.filename,
      creator: req.userData.userId
      
    });
    post.save().then(createdPost => {
      res.status(201).json({
        message: 'Post added successfully',
        post: {
          ...createdPost,
          id: createdPost._id,
          // title: createdPost.title,
          // content: createdPost.content,
          // imagePath: createdPost.imagePath
        }
      });
  
    })
    .catch( error => {
      res.status(500).json({
        message: 'Creating a post failed!'
      });
    });
  
  });
  
  router.get("", (req, res, next) => {
    const pageSize = + req.query.pagesize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    let fetchedPost;

    if(pageSize && currentPage){
      postQuery.skip(pageSize * (currentPage - 1))
      .limit(pageSize);
    }
    postQuery
    .then(documents => {
      fetchedPost = documents;
      return Post.count();
    })
    .then(count => {
       
       res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchedPost,
        maxPosts: count
      });
      
    }).catch( error => {
      res.status(500).json({message: "Fetching post failed!"});

    });
  
  
  });
  //replace with patch if wanted only update 
  router.put("/:id",
  checkAuth,
  multer({storage: storage}).single('image') ,(req, res, next) => {
    let imagePath= req.body.imagePath;
    if(req.file){

      const url = req.protocol + '://' + req.get("host");
      imagePath=  url+"/images/" + req.file.filename;
    }
      const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath,
        creator: req.userData.userId
      });
      Post.updateOne({_id: req.params.id, ceator: req.userData.userId } ,post).then( result => {
       // console.log(result);
        if(result.nModified > 0) {
          res.status(200).json({message: "successfuly updated!"});

        } else {
          res.status(401).json({message: "not autorised"});
        }
      })
      .catch(error => {
        res.status(500).json({message: "post updating failed!"});

      });
  });
  
  router.get("/:id", (req,res,next) => {
  Post.findById(req.params.id).then(post => {
    if(post){
      res.status(200).json(post);
  
    }
    else {
      res.status(404).json({message: 'Post not found'});
    }
  })
  .catch( error => {
    res.status(500).json({message: "Fetching post failed!"});

  })
  });
  
  router.delete("/:id",
  checkAuth,
   (req, res, next) => {
    Post.deleteOne({_id: req.params.id, creator: req.userData.userId})
    .then (result => {
      
      if(result.n > 0) {
        res.status(200).json({message: "Post deleted!"});

      } else {
        res.status(401).json({message: "not autorised"});
      }
    })
    .catch( error => {
      res.status(500).json({message: "Deleting post failed!"});

    });
    //console.log(req.params.id);
  
  });

  module.exports = router;