const employee = require("../model/employee.model")
const { switchDB, getDBModel } = require("../config/switchDb");
const DbSchemas = new Map([['employee', employee]])

exports.addEmployee = async (req, res) =>{
    try {
        const employeeDB = await switchDB(req.tenantId, DbSchemas);
        const employeeModel = await getDBModel(employeeDB, "employee");
        const employee = await employeeModel.create({...req.body})

        return res.status(200).json({
            message: "Employee save",
            employee
        })

    } catch (error) {
        return res.status(500).send("internal server error")
    }
}

exports.getEmployee = async (req, res) =>{
    try {
        const employeeDB = await switchDB(req.tenantId, DbSchemas);
        const employeeModel = await getDBModel(employeeDB, "employee");
        
        const employee = await employeeModel.find()

        return res.status(200).json({
            message: "Employee List",
            employee
        })

    } catch (error) {
        return res.status(500).send("internal server error")
    }
}