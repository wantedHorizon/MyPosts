const express = require("express");
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const PostControllers = require("../controllers/posts");
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

//xh9z89KGfRWI5SfY create new  Post
router.post("",checkAuth, multer({storage: storage}).single('image'), PostControllers.createPost );
  

  //get all posts
  router.get("", PostControllers.getAllPosts);




  //replace with patch if wanted only update 
  router.put("/:id", checkAuth, multer({storage: storage}).single('image') , PostControllers.updatePost);
  

  //get single postBy post id
  router.get("/:id", PostControllers.getSinglePost );
  

  //delete post by postID
  router.delete("/:id", checkAuth, PostControllers.deletePost );

  module.exports = router;