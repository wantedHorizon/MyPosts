const express = require("express");
const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const PostControllers = require("../controllers/posts");
const router = express.Router();


  //xh9z89KGfRWI5SfY create new  Post
  router.post("",checkAuth, extractFile, PostControllers.createPost );
  

  //get all posts
  router.get("", PostControllers.getPosts);

  //replace with patch if wanted only update 
  router.put("/:id", checkAuth,  extractFile, PostControllers.updatePost);
  

  //get single postBy post id
  router.get("/:id", PostControllers.getPost );
  

  //delete post by postID
  router.delete("/:id", checkAuth, PostControllers.deletePost );

  module.exports = router;