const model = require("../models/posts");
const express = require("express");
const router = express.Router();

router
  .get("/", (req, res, next) => {
    const { limit, offset, sort, order } = req.query;

    model
      .getAll(num(limit), num(offset), sort, order)
      .then((data) => {
        res.send(data);
      })
      .catch(next);
  })
  .get("/:id", (req, res, next) => {
    const { id } = req.params;

    model
      .get(id)
      .then((data) => {
        res.send(data);
      })
      .catch(next);
  })
  .post("/", (req, res, next) => {
    const newValues = req.body;

    model
      .create(newValues)
      .then((data) => {
        res.status(201).send(data);
      })
      .catch(next);
  })
  .delete("/:post_id", (req, res, next) => {
    const { post_id } = req.params;

    model
      .remove(post_id)
      .then((data) => {
        res.send(data);
      })
      .catch(next);
  })
  .post("/seed", (req, res, next) => {
    const { data } = req.body;

    model
      .seed(data)
      .then((data) => {
        res.status(201).send(data);
      })
      .catch(next);
  });

module.exports = router;

function num(value) {
  return value ? +value : undefined;
}
