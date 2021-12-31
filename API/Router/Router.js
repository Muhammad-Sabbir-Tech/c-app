const Router = require("express").Router()
const {dasboard, blankRequest} = require("../Controller/DashboardController")
const {createUser, onLogin} = require("../Controller/userController")
const {addProject, getAllProject, getSingleProjectForUpdate, updateProject} = require("../Controller/ProjectController")
const {authCheckMiddleware} = require("../Middleware/AuthCheckMiddleware")
const {
    unitAdd,
    itemAdd,
    getItemAndUnit,
    getProjectsForExpense,
    addExpense, getTotalExpense,
    getDailyExpense,
    getDailyExpenseForEdit,
    expenseUpdate,
    getLastExpenseForDailyReport,
    getExpenseForDetailReport,
    getElementUses
} = require("../Controller/expenceController")


Router.get("/", dasboard)
Router.post("/login", onLogin)

Router.get("/blank", authCheckMiddleware, blankRequest)
Router.post("/addProject", authCheckMiddleware, addProject)
Router.get("/getAllProject", authCheckMiddleware, getAllProject)
Router.post("/getSingleProjectForUpdate", authCheckMiddleware, getSingleProjectForUpdate)
Router.post("/updateProject", authCheckMiddleware, updateProject)

Router.get("/getProjectsForExpense", authCheckMiddleware, getProjectsForExpense)
Router.post("/itemAdd", itemAdd)
Router.post("/unitAdd", unitAdd)
Router.get("/getItemAndUnit", authCheckMiddleware, getItemAndUnit)
Router.post("/addExpense", authCheckMiddleware, addExpense)
Router.post("/getTotalExpense", authCheckMiddleware, getTotalExpense)
Router.post("/getDailyExpense", authCheckMiddleware, getDailyExpense)
Router.post("/getDailyExpenseForEdit", authCheckMiddleware, getDailyExpenseForEdit)
Router.post("/expenseUpdate", authCheckMiddleware, expenseUpdate)
Router.post("/getLastExpenseForDailyReport", authCheckMiddleware, getLastExpenseForDailyReport)
Router.post("/getExpenseForDetailReport",authCheckMiddleware, getExpenseForDetailReport)
Router.post("/getExpenseForDetailReport",authCheckMiddleware, getExpenseForDetailReport)
Router.post("/getElementUses",authCheckMiddleware, getElementUses)

module.exports = Router