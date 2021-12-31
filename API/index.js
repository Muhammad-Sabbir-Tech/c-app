const express = require("express")
const Router = require("./Router/Router")
var cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json()) // for parsing application/json

app.use(Router)

app.listen(5000,err=>{
    err ? console.log("error heppen on port 5000") : console.log("server running on 5000 port")
})