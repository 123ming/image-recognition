const express = require('express')
const path = require('path')
const app = express()

require('./server.js')

app.use(express.static(path.join(__dirname, 'static')))

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/page/index.html')
})

app.listen(3000, () => console.log('listen 3000'))
