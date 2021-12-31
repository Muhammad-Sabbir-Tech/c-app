const dasboard = (req, res)=>{
    res.send("this is dashboard").end()
}

const blankRequest = (req, res)=>{
    res.send("blank request").end()
}

module.exports = {
    dasboard,
    blankRequest
}