const express = require("express");
const multer = require("multer");
const fs = require("fs");
const router = express.Router();
const Post = require("../models/posts");
router.use(express.static(__dirname + "../uploads/"));

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

// get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.json({ message: error.message }).status(500);
  }
});

// create a new post
router.post("/", upload.single("image"), (req, res) => {
  try {
    const newPost = new Post();
    if (req.body.message) {
      newPost.message = req.body.message;
    }
    if (req.file) {
      let imgPath = "./uploads/" + req.file.filename;
      newPost.thoughtPic = {
        name: req.file.filename,
        data: fs.readFileSync(imgPath),
        contentType: req.file.mimetype,
      };
    }
    newPost.save().then(() => {
      res.status(201).json({
        message: "Thought created successfully!",
      });
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// update a post
router.patch("/:id", getPost, async (req, res) => {
  try {
    if (req.body.message != null) {
      res.post.message = req.body.message;
    }
    const updatedPost = await res.post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// delete a post
router.delete("/:id", getPost, async (req, res) => {
  try {
    await res.post.remove();
    res.status(200).json({ message: "Post Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getPost(req, res, next) {
  let post;
  try {
    post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: "Cannot find post" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.post = post;
  next();
}

module.exports = router;
