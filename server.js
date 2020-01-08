const express = require('express')
const port = 8080

const connectDb = require('./helpers/db')
const Material = require('./models/Material')

connectDb()

const app = express()

app.use(express.json({ extended: false }))

app.get('/', (req, res) => {
  res.send('Find what material goes to which recycling bin!')
})

app.post('/add-material', async (req, res) => {
  const { materialName, typeOfMaterial } = req.body
  if (!materialName || !typeOfMaterial) {
    return res.status(404).json({ msg: 'Name, Type or both are missing!'})
  }

  const newMaterial = {
    materialName,
    typeOfMaterial
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

app.get('/material', async (req, res) => {
  const { materialName } = req.body 
  if (!materialName) {
    return res.status(404).json({ msg: 'No material provided!'})
  }

  try {
    let material = await Material.findOne({ materialName })
    if (!material) {
      return res.status(404).json({ msg: 'No material found'})
    }
    res.send(`Type of ${materialName} is ${material.typeOfMaterial}!`)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error!')
  }

})

app.listen(port, () => {
  console.log(`TrueRecycler server started at port ${port}`)
})
