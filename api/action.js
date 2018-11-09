const express = require("express");
const router = express.Router();
const actionDb = require("../data/helpers/actionModel.js");

/* ======= GET  ALL ACTIONS ====== */
router.get("/", (req, res) => {
  actionDb
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "There was an error" });
    });
});

/* ======= GET ACTION BY ID ====== */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  actionDb
    .get(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "There was an error" });
    });
});

/* ======= NEW ACTION ====== */
router.post("/", (req, res) => {
  let newAction = req.body;
  console.log(newAction);

  if (!newAction.description && !newAction.notes) {
    res
      .status(400)
      .json({ errorMessage: "Please add a description and notes" });
  } else {
    actionDb.insert(newAction).then(post => {
      res.status(201).json(post.id);
    });
  }
});

/* ======= EDIT ACTION ====== */
router.put("/:id", (req, res) => {
  actionDb
    .update(req.params.id, req.body)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ errorMessage: "user not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "err" });
    });
});

/* ======= DELETE ACTION ====== */
router.delete("/:id", (req, res) => {
  actionDb
    .remove(req.params.id)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "error deleting user" });
    });
});

module.exports = router;
