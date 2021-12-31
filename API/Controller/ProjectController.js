const {all_project} = require("../models/index")
const { Op } = require("sequelize");


const getAllProject = async (req, res) => {
    try {
        const result = await all_project.findAll({order: [["status", "desc"]]})
        if (result) {
            res.status(200).send(result).end()
        } else {
            res.status(204).send(false).end()
        }
    } catch (e) {
        res.send(false).end()
    }
}


const addProject = async (req, res) => {
    try {
        const projectName = req.body.projectName
        const ownerName = req.body.ownerName
        const ownerPhn = req.body.ownerPhn
        const projectLocation = req.body.projectLocation
        const projectAmmount = req.body.projectAmmount
        const startDate = req.body.startDate
        const deadline = req.body.endDate
        const creatorId = req.headers.id

        const result = await all_project.create({
            project_name: projectName,
            owner_name: ownerName,
            owner_phn: ownerPhn,
            project_location: projectLocation,
            project_ammount: projectAmmount,
            start_date: startDate,
            deadline: deadline,
            creator_id: creatorId
        })
        if (result) {
            res.status(200).send("1").end()
        } else {
            res.status(303).send("insert failde").end()
        }

    } catch (e) {
        res.status(404).send(e).end()
    }
}


const getSingleProjectForUpdate = async (req, res) => {
    const id = req.body.id

    try {
        const result = await all_project.findOne({
            where:{
                id:{
                    [Op.eq]:id
                }
            }
        })
        if (result) {
            res.status(200).send(result).end()
        } else {
            res.status(303).send(false).end()
        }
    } catch (e) {
        res.status(404).send(false).end()
    }
}


const updateProject = async (req, res) =>{
    try {
        const projectName = req.body.projectName
        const ownerName = req.body.ownerName
        const ownerPhn = req.body.ownerPhn
        const projectLocation = req.body.projectLocation
        const projectAmmount = req.body.projectAmmount
        const status = req.body.status
        const startDate = req.body.startDate
        const deadline = req.body.endDate
        const id = req.body.id

        const result = await all_project.update({
            project_name: projectName,
            owner_name: ownerName,
            owner_phn: ownerPhn,
            project_location: projectLocation,
            project_ammount: projectAmmount,
            status:status,
            start_date: startDate,
            deadline: deadline,
        },{
            where:{
                id:{
                    [Op.eq]:id
                }
            }
        })

        if (result == 1){
            res.status(200).send(result).end()
        } else {
            res.status(303).send("failed").end()
        }
    }catch (e) {
        res.status(404).send("failed").end()
    }
}


module.exports = {
    addProject,
    getAllProject,
    getSingleProjectForUpdate,
    updateProject
}