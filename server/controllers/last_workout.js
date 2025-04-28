const model = require("../models/last_workout");
const express = require("express");
const router = express.Router();

router
  .get("/:id", (req, res, next) => {
    const { id } = req.params;

    model
      .get(id)
      .then((data) => {
        res.send(data);
      })
      .catch(next);
  })
  .patch("/:id", (req, res, next) => {
    const { id } = req.params;
    const newValues = req.body;

    model
      .update(id, newValues)
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
