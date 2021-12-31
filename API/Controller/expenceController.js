const {item_table, unit_table, all_project, expence, date_wise_expence, sequelize} = require("../models/index")
const {Op} = require("sequelize");

const getProjectsForExpense = async (req, res) => {
    try {
        const result = await all_project.findAll({
            order: [["id", "desc"]], where: {
                status: {
                    [Op.eq]: "1"
                }
            }
        })
        if (result) {
            res.status(200).send(result).end()
        } else {
            res.status(204).send(false).end()
        }
    } catch (e) {
        res.send(false).end()
    }
}


const itemAdd = async (req, res) => {
    try {
        const itemName = req.body.itemName
        const result = await item_table.create({
            item_name: itemName
        })
        if (itemName) {
            res.status(200).send(true).end()
        } else {
            res.status(303).send(false).end()
        }
    } catch (e) {
        res.status(404).send(e).end()
    }
}


const unitAdd = async (req, res) => {
    const unitName = req.body.unitName
    const unitLable = req.body.unitLable
    const unitPerLable = req.body.unitPerLable
    const itemId = req.body.itemId
    try {
        const result = await unit_table.create({
            unit_name: unitName,
            unit_lable: unitLable,
            unit_per_lable: unitPerLable,
            item_id: itemId
        })

        if (result) {
            res.status(200).send(true).end()
        } else {
            res.status(303).send(false).end()
        }

    } catch (e) {
        res.status(404).send(e).end()
    }
}


const getItemAndUnit = async (req, res) => {
    try {
        item_table.hasMany(unit_table, {foreignKey: "item_id"})
        unit_table.belongsTo(item_table, {foreignKey: "item_id"})

        const result = await item_table.findAll({
            include: [{
                model: unit_table,
                required: true
            }]
        })

        res.send(result)

    } catch (e) {
        res.status(404).send(e).end()
    }
}


// expence add
const addExpense = async (req, res) => {
    try {
        const rows = req.body.rows

        const date = req.body.date
        const bill_no = req.body.bill_no
        const total_expence_amount = req.body.total_expence_amount.toString()
        const project_id = req.body.project_id
        const user_id = req.body.user_id

        const existingDateCheck = await date_wise_expence.findAll({
            where: {
                date: {
                    [Op.eq]: date
                },
                project_id: {
                    [Op.eq]: project_id
                }
            }
        })
        const response = {}
        if (existingDateCheck != false) {
            response.status = "exist"
            res.status(200).send(response).end()
        } else {
            const result = await expence.bulkCreate(rows)
            const dateWiseExpense = await date_wise_expence.create({
                date: date,
                bill_no: bill_no,
                total_expence_amount: total_expence_amount,
                project_id: project_id,
                user_id: user_id
            })
            if (result != false && dateWiseExpense != false) {
                response.status = "success"
                res.status(200).send(response).end()
            } else {
                response.status = "failed"
                res.status(200).send(response).end()
            }

        }

    } catch (e) {
        res.status(404).send(JSON.stringify(e)).end()
    }
}


// this is now not using
const getTotalExpense = async (req, res) => {
    try {
        const projectId = req.body.projectId

        const result = await date_wise_expence.findAll({
            where: {
                project_id: {
                    [Op.eq]: projectId
                }
            },
        })

        let total = 0
        if (result != false) {
            result.map(data => {
                total = parseFloat(total) + parseFloat(data.total_expence_amount)
            })

            res.status(200).send(total.toString()).end()
        } else {
            res.status(200).send(total.toString()).end()
        }
    } catch (e) {
        res.status(404).send(false).end()
    }
}


// gettign daily expence
const getDailyExpense = async (req, res) => {
    try {
        date_wise_expence.hasMany(expence, {sourceKey: "bill_no", foreignKey: "bill_no"})
        expence.belongsTo(date_wise_expence, {foreignKey: "bill_no", targetKey: "bill_no"})


        const projectId = req.body.projectId
        const fromDate = req.body.fromDate
        const toDate = req.body.toDate

        const result = await date_wise_expence.findAll({
            order: [["date", "desc"]],
            include: [{
                model: expence,
                required: true
            }],
            where: {
                project_id: {
                    [Op.eq]: projectId
                },
                date: {
                    [Op.and]: {
                        [Op.gte]: fromDate,
                        [Op.lte]: toDate
                    }
                }
            }
        })

        res.status(200).send(result).end()
    } catch (e) {
        res.status(404).send(false).end()
    }
}


// getting a single expence data by bill no for editing
const getDailyExpenseForEdit = async (req, res) => {
    try {
        date_wise_expence.hasMany(expence, {sourceKey: "bill_no", foreignKey: "bill_no"})
        expence.belongsTo(date_wise_expence, {foreignKey: "bill_no", targetKey: "bill_no"})

        const dateWiseExpenseId = req.body.id
        const billNo = req.body.billNo
        const projectId = req.body.projectId

        const dateWiseExp = await date_wise_expence.findOne({
            include: [{
                model: expence,
                required: true
            }],
            where: {
                id: {
                    [Op.eq]: dateWiseExpenseId
                },
                bill_no: {
                    [Op.eq]: billNo
                },
                project_id: {
                    [Op.eq]: projectId
                }
            }
        })


        const response = {}
        if (dateWiseExp) {
            response.status = "success"
            response.billInfo = dateWiseExp
            res.status(200).json(response)
        } else {
            response.status = "failed"
            res.status(200).json(response)
        }

    } catch (e) {
        res.status(404).send(e).end()
    }
}


// expence updating here
const expenseUpdate = async (req, res) => {
    try {
        // for condition
        const projectId = req.body.projectId
        const expenseId = req.body.expenseId
        const billNo = req.body.billNo
        const billId = req.body.billId

        // for expense update
        const expence_tag = req.body.expence_tag
        const expence_detail = req.body.expence_detail
        const quantity = req.body.quantity
        const unit_name = req.body.unit_name
        const expence_ammount = req.body.expence_ammount
        const date = req.body.date
        const userId = req.headers.id

        // for date wise expense update
        const totalExpense = req.body.totalExpense


        const response = {}

        const [checkAvailablity, created] = await expence.findOrCreate({
            where: {
                project_id: {
                    [Op.eq]: projectId
                },
                bill_no: {
                    [Op.eq]: billNo
                },
                id: {
                    [Op.eq]: expenseId
                }
            },
            defaults: {
                bill_no: billNo,
                expence_tag: expence_tag,
                expence_detail: expence_detail,
                quantity: quantity,
                unit_type: unit_name,
                expence_ammount: expence_ammount,
                date: date,
                project_id: projectId,
                user_id: userId
            }
        })

        if (created == false) {
            const expDate = await expence.update({date: date}, {
                where: {
                    project_id: {
                        [Op.eq]: projectId
                    },
                    bill_no: {
                        [Op.eq]: billNo
                    }
                }
            })

            if (expDate) {
                const exp = await expence.update({
                    expence_tag: expence_tag,
                    expence_detail: expence_detail,
                    quantity: quantity,
                    unit_type: unit_name,
                    expence_ammount: expence_ammount
                }, {
                    where: {
                        project_id: {
                            [Op.eq]: projectId
                        },
                        bill_no: {
                            [Op.eq]: billNo
                        },
                        id: {
                            [Op.eq]: expenseId
                        }
                    }
                })

                if (exp) {
                    const dwe = await date_wise_expence.update({date: date, total_expence_amount: totalExpense}, {
                        where: {
                            project_id: {
                                [Op.eq]: projectId
                            },
                            bill_no: {
                                [Op.eq]: billNo
                            },
                            id: {
                                [Op.eq]: billId
                            }
                        }
                    })

                    if (dwe) {
                        response.status = "success"
                        res.status(200).json(response).end()
                    }//dwe update end conditon
                    else {
                        response.status = "failed ! please call developer"
                        res.status(200).json(response).end()
                    }

                }//exp update condition end
                else {
                    response.status = "failed ! please call developer"
                    res.status(200).json(response).end()
                }

            }//exp date condition end
            else {
                response.status = "failed"
                res.status(200).json(response).end()
            }

        }// created false
        else {

            const expDate = await expence.update({date: date}, {
                where: {
                    project_id: {
                        [Op.eq]: projectId
                    },
                    bill_no: {
                        [Op.eq]: billNo
                    }
                }
            })

            if (expDate) {
                const dwe = await date_wise_expence.update({date: date, total_expence_amount: totalExpense}, {
                    where: {
                        project_id: {
                            [Op.eq]: projectId
                        },
                        bill_no: {
                            [Op.eq]: billNo
                        },
                        id: {
                            [Op.eq]: billId
                        }
                    }
                })
                if (dwe) {
                    response.status = "success"
                    res.status(200).json(response).end()
                } else {
                    response.status = "failed ! please call developer"
                    res.status(200).json(response).end()
                }
            } else {
                response.status = "failed"
                res.status(200).send(response).end()
            }
        }// created true


    } catch (e) {
        res.status(404).send(false).end()
    }
}


const getLastExpenseForDailyReport = async (req, res) => {
    try {
        const projectId = req.body.projectId
        // const dateWiseExpenseId = req.body.id
        const date = req.body.date

        const lastExpenses = await date_wise_expence.findAll({
            where: {
                project_id: {
                    [Op.eq]: projectId
                },
                date: {
                    [Op.lt]: date
                }
            }
        })

        const response = {}

        if (lastExpenses != false) {
            let total = "0"

            lastExpenses.map(data => {
                let amount = data.total_expence_amount
                if (amount.length == 0) {
                    amount = 0
                }
                total = parseFloat(total) + parseFloat(amount)
            })

            response.status = "success"
            response.lastCostUpTo = lastExpenses[lastExpenses.length - 1].date
            response.lastExpense = total

            res.status(200).send(response).end()

        } else {
            response.status = "success"
            response.lastCostUpTo = ""
            response.lastExpense = ""

            res.status(200).send(response).end()
        }

    } catch (e) {
        res.status(404).send(false).end()
    }
}


// getting expenses for detail report

const getExpenseForDetailReport = async (req, res) => {
    try {
        date_wise_expence.hasMany(expence, {sourceKey: "bill_no", foreignKey: "bill_no"})
        expence.belongsTo(date_wise_expence, {foreignKey: "bill_no", targetKey: "bill_no"})

        const fromDate = req.body.fromDate
        const toDate = req.body.toDate
        const projectId = req.body.projectId

        // get last expense
        const lastExpense = await date_wise_expence.findAll({
            where: {
                date: {
                    [Op.lt]: fromDate
                },
                project_id: {
                    [Op.eq]: projectId
                }
            },
            order: [
                ['date', 'ASC']
            ]
        })


        // all expense
        const allExpense = await date_wise_expence.findAll({
            include: [{
                model: expence,
                required: true
            }],
            where: {
                date: {
                    [Op.and]: {
                        [Op.gte]: fromDate,
                        [Op.lte]: toDate
                    }
                },
                project_id: {
                    [Op.eq]: projectId
                }
            },
            order: [
                ['date', 'ASC']
            ]
        })

        const response = {}
        if (allExpense) {
            let lastExpDate = lastExpense.length != 0 ? lastExpense[lastExpense.length - 1].date : ""
            let total = 0
            lastExpense.length != 0 && lastExpense.map(data => {
                let num = data.total_expence_amount
                if (num.length == 0) {
                    num = 0
                }
                total = parseFloat(total) + parseFloat(num)
            })

            response.status = "success"
            response.expenses = allExpense
            response.lastExpense = total
            response.lastExpenseDate = lastExpDate
            res.status(200).send(response).end()
        } else {
            response.status = "failed"
            res.status(200).send(response).end()
        }


    } catch (e) {
        res.status(404).send(false).end()
    }
}


const getElementUses = async (req, res) => {
    try {
        item_table.hasMany(expence, {sourceKey: "item_name", foreignKey: "expence_tag"})
        expence.belongsTo(item_table, {foreignKey: "expence_tag", targetKey: "item_name"})

        const projectId = req.body.projectId
        const itemName = req.body.itemName

        const usesData = await item_table.findAll({
            include: [{
                model: expence,
                required: true,
                where: {
                    project_id: {
                        [Op.eq]: projectId
                    }
                }
            }]
        })

        const response = {}
        if (usesData.length != 0) {
            response.status = "success"
            response.usesData = usesData
            res.status(200).send(response).end()
        } else {
            response.status = "no data found"
            res.status(200).send(usesData)
        }

    } catch (e) {
        res.status(404).send(false).end()
    }
}


module.exports = {
    getProjectsForExpense,
    itemAdd,
    unitAdd,
    getItemAndUnit,
    addExpense,
    getTotalExpense,
    getDailyExpense,
    getDailyExpenseForEdit,
    expenseUpdate,
    getLastExpenseForDailyReport,
    getExpenseForDetailReport,
    getElementUses
}