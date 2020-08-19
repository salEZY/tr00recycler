const express = require("express");

const Material = require("../models/Material");
const router = express.Router();

// Add material POST route
router.post("/add", async (req, res) => {
  const { materialName, materialType } = req.body;
  if (!materialName || !materialType) {
    return res.status(404).json({ message: "Name, Type or both are missing!" });
  }

  const newMaterial = {
    materialName,
    materialType,
  };

  try {
    let material = await Material.findOne({ materialName });

    if (material) {
      return res.status(400).json({ message: "Material already exists" });
    }

    material = new Material(newMaterial);

    await material.save();
    res.json({
      message: `${material.materialName} is added!`,
      id: material._id,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error!");
  }
});

// Show single material GET route
router.get("/:name", async (req, res) => {
  let name = req.params.name;
  if (!name) {
    return res.status(404).json({ message: "No material provided!" });
  }

  //let upperCased = name.charAt(0).toUpperCase();
  try {
    let material = await Material.findOne({ materialName: name });
    if (!material) {
      return res.status(404).json({ message: "No material found" });
    }
    res.json(material);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error!");
  }
});

// Show materials by their type GET route
router.get("/type/:type", async (req, res) => {
  const matType = req.params.type;
  if (!matType) {
    return res.status(404).json({ message: "No type provided!" });
  }
  try {
    let type = await Material.find({ materialType: matType });
    if (!type.length) {
      return res.status(404).json({ message: "Type does NOT exist!" });
    }
    let material = [];
    type.forEach((t) => material.push(t));
    res.json({
      material,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error!");
  }
});

// Show ALL materials GET route
router.get("/", async (req, res) => {
  try {
    let materials = await Material.find();
    if (!materials.length) {
      return res.status(404).json({ message: "There is no data!" });
    }
    let material = [];
    materials.forEach((mat) => material.push(mat));
    res.json(material);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error!");
  }
});

// Delete material DELETE route
router.delete("/:matId", async (req, res) => {
  const matId = req.params.matId;

  let materialToDelete;
  try {
    materialToDelete = await Material.findById(matId);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error!");
  }

  if (!materialToDelete) {
    return res.status(404).json({ message: "Could not find the material!" });
  }
  let type = materialToDelete.materialType;
  try {
    await materialToDelete.remove();
  } catch (error) {
    return res.status(404).json({ message: "Could not delete the material!" });
  }
  let materials = await Material.find({ materialType: type });
  res.status(200).json(materials);
});

module.exports = router;
