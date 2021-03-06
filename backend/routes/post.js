const express = require("express");
const Post = require("../models/post");

const router = express.Router();


router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    comment: req.body.comment,
    date: req.body.date,
    returned: req.body.returned
  });
  post.save().then(result => {
    res.status(201).json({
      message: 'Post added sucessfully!',
      postId: result._id
    });
  });
});

router.get("", (req, res, next) => {
  Post.find().sort({date:1}).then(documents => {
    res.status(200).json({
      message: 'Posts fetched successfully!',
      posts: documents
    });
  });
});

router.get('/:id',(req,res,next) => {
  Post.findById(req.params.id).then(post => {
    if (post){
      res.status(200).json(post);
    }else {
      res.status(404).json({message: 'Post not found!'});
    }
  });
});

router.put('/:id',(req,res,next)=> {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    comment: req.body.comment,
    returned: req.body.returned,
    date: req.body.date
  });
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log(result);
    res.status(200).json({message: "Update Successful!"});
  })
});

router.delete('/:id', (req, res, next)=> {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Post deleted!"});
  })
});

module.exports = router;
