const PostModel = require("../models/postmodel");
const express = require("express");
const post_route = express.Router();

post_route.post("/gallery", async (req, res) => {
  try {
    const postdata = await PostModel.create({
      label: req.body.label,
      photo_url: req.body.photo_url,
    });
    res.status(201).json({
      status: "created successfully",
      postdata,
    });
  } catch (e) {
    res.json({
      message: e.message,
    });
  }
});

post_route.get("/gallery", async (req, res) => {
  try {
    const postdata = await PostModel.find();
    res.status(200).json({
      status: "ok",
      postdata,
    });
  } catch (e) {
    res.json({
      message: e.message,
    });
  }
});

post_route.delete("/gallery/:id", async (req, res) => {
  try {
    await PostModel.deleteOne({ _id: req.params.id });
    res.status(204).json({
      status: "deleted successfully",
    });
  } catch (e) {
    res.json({
      message: e.message,
    });
  }
});

module.exports = post_route;
