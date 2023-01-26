const express = require('express')
const app = express()

app.use('/src', express.static('src'))


app.get('/*', (req,res) => {
  res.sendFile(__dirname + "/" + "index.html")
})

app.listen(process.env.PORT || 3000);
console.log(app);

