const express = require('express')

const Material = require('../models/Material')
const router = express.Router()

router.post('/add', async (req, res) => {
  const { materialName, materialType } = req.body
  if (!materialName || !materialType) {
    return res.status(404).json({ message: 'Name, Type or both are missing!'})
  }

  const newMaterial = {
    materialName,
    materialType
  }

  try {
    let material = await Material.findOne({ materialName })

    if (material) {
      return res.status(400).json({ message: 'Material already exists'})
    }

    material = new Material(newMaterial)

    await material.save()
    res.send(`${material.materialName} is added!`)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error!')
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  if (!id) {
    return res.status(404).json({ message: 'No material provided!'})
  }

  try {
    let material = await Material.findById({ _id: id })
    if (!material) {
      return res.status(404).json({ message: 'No material found'})
    }
    res.send(`${material.materialName} goes to ${material.materialType} bin!`)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error!')
  }

})

router.get('/type/:type', async(req, res) => {
  const matType = req.params.type
  if (!matType) {
    return res.status(404).json({ message: 'No type provided!'})
  }
  try {
    let type = await Material.find({ materialType: matType })
    if (!type.length) {  
      return res.status(404).json({ message: 'Type does NOT exist!'})
    }
    let mat = {}
    for (let i = 0; i < type.length; i++) {
      mat[i+1] = {
        name: type[i].materialName
      }
    }
    res.json({
      type: matType,
      mat
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error!')
  }
})

router.get('/', async (req, res) => {
  try {
    let materials = await Material.find()
    if (!materials.length) {  
      return res.status(404).json({ message: 'There is no data!'})
    }
    let mat = {}
    for (let i = 0; i < materials.length; i++) {
      mat[i+1] = {
        name: materials[i].materialName,
        type: materials[i].materialType
      }
    }
    res.json(mat)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error!')
  } 
})

module.exports = router