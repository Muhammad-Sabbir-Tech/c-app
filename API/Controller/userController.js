const { Op } = require("sequelize");
const jwt = require('jsonwebtoken')
require('dotenv').config()
const {user, user_permission} = require("../models/index")

const createUser = async (req, res) =>{
    try {
        await user.create({full_name:"Muhammad Sabbir", job_possition:"IT", sallery:30000, mobile_no:"01789096018", user_name:"sabbir", password:"123456"})
        res.send("user added").end()
    }catch (e) {
        res.send("user add failed").end()
    }
}


const onLogin = async (req, res) =>{
    const userName = req.body.userName
    const password = req.body.password

    try {
        //matching user
        const result = await user.findOne({
            where : {
                user_name : {
                    [Op.eq]: userName,
                },
                password : {
                    [Op.eq]: password,
                }
            }
        })

        if (result){
            user.hasMany(user_permission,{foreignKey:"user_id"})
            user_permission.belongsTo(user,{foreignKey:"user_id"})

            //get user permission
            const permission =await user_permission.findAll({
                where : {
                    user_id: {
                        [Op.eq]:result.id
                    }
                }
            })

            // generate jwt token
            const key = process.env.TOKEN
            const payload = {
                id:result.id.toString(),
                userName: result.user_name,
                fullName : result.full_name,
                designation: result.job_possition,
                permission:permission
            }
            const token = jwt.sign(payload, process.env.TOKEN, { expiresIn: "8h" });
            const decoded = jwt.verify(token, key);

            //send response
            const response = {
                token:token,
                decode:decoded,
                permission:permission
            }
            res.send(response).end()
        }else {
            res.status(404).send("user not found").end()
        }
    }catch (e) {
        res.send("something went wrong").end()
    }
}


module.exports = {
    createUser,
    onLogin
}