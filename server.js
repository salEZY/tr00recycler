const express = require('express')
const port = 8080

const connectDb = require('./helpers/db')

connectDb()

const app = express()

app.use(express.json({ extended: false }))

app.get('/', (req, res) => {
  res.send('Find what material goes to which recycling bin!')
})

app.use('/material', require('./routes/materials'))

app.listen(port, () => {
  console.log(`TrueRecycler server started at port ${port}`)
})
