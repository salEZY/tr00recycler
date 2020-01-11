const express = require('express')

const Material = require('../models/Material')
const router = express.Router()

router.post('/add', async (req, res) => {
  const { materialName, materialType } = req.body
  if (!materialName || !materialType) {
    return res.status(404).json({ msg: 'Name, Type or both are missing!'})
  }

  const newMaterial = {
    materialName,
    materialType
  }

  try {
    let material = await Material.findOne({ materialName })

    if (material) {
      return res.status(400).json({ msg: 'Material already exists'})
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
    return res.status(404).json({ msg: 'No material provided!'})
  }

  try {
    let material = await Material.findById({ _id: id })
    if (!material) {
      return res.status(404).json({ msg: 'No material found'})
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
    return res.status(404).json({ msg: 'No type provided!'})
  }
  try {
    let type = await Material.find({ materialType: matType })
    if (!type) {  
      return res.status(404).json({ msg: 'Type does NOT exist!'})
    }
    res.json(type)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error!')
  }
})

module.exports = router