const express = require("express");
const router = express.Router();
const projectDb = require("../data/helpers/projectModel.js");

/* ======= GET  ALL PROJECTS ====== */
router.get("/", (req, res) => {
  projectDb
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "There was an error" });
    });
});

/* ======= GET PROJECT BY ID ====== */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  projectDb
    .get(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "There was an error" });
    });
});

/* ======= NEW PROJECT ====== */
router.post("/", (req, res) => {
  let newProject = req.body;
  console.log(newProject);

  if (!newProject.description && !newProject.name) {
    res
      .status(400)
      .json({ errorMessage: "Please add a description and notes" });
  } else {
    projectDb.insert(newProject).then(post => {
      res.status(201).json(post.id);
    });
  }
});

/* ======= EDIT PROJECT ====== */
router.put("/:id", (req, res) => {
  projectDb
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

/* ======= DELETE PROJECT ====== */
router.delete("/:id", (req, res) => {
  projectDb
    .remove(req.params.id)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "error deleting user" });
    });
});

module.exports = router;
