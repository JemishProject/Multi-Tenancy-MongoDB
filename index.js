const express = require("express")
const dotEnv = require("dotenv")
const cors = require('cors')
const app = express();
const authRoutes = require("./route/auth.route")
const User = require("./model/user.model")
const Tenant = require("./model/tenant.model")
const customerRoutes = require("./route/customer.route");
const employeeRouter = require("./route/employee")
const { isAuthenticated } = require("./middleware/checkTenant");
const RootSchemas = new Map([['user', User], ['tenant', Tenant]])
const customer = require("./model/customer.model")
const DbSchemas = new Map([['customer', customer]])
const { switchDB, getDBModel } = require("./config/switchDb");


dotEnv.config()
app.use(express.json())
const port = process.env.PORT
app.use(cors())

app.use("/auth", authRoutes)

app.use("/customer", isAuthenticated, customerRoutes)

app.use("/employee", isAuthenticated, employeeRouter)


app.get("/allcompany", async (req, res, next) => {
    try {
        console.log(req.headers.origin);
        const rootDB = await switchDB('root', RootSchemas);
        const userModel = await getDBModel(rootDB, "user");
        const user = await userModel.findOne({ domainName: req.headers.origin })
        console.log(user);
        const customerDB = await switchDB(user.tenant_id, DbSchemas);
        const customerModel = await getDBModel(customerDB, "customer");
        const userModels = await customerModel.find();
        res.status(200).json({ message: 'User message find successfull',user:userModels })
    } catch (error) {
        console.log(error, 'error');
    }
})

app.get("/all", async (req, res, next) => {
    try {
        const rootDB = await switchDB('root', RootSchemas);
        const userModel = await getDBModel(rootDB, "user");
        console.log(userModel,'userModel');
        const userModels = await userModel.find();
        res.status(200).json({ message: 'User message find successfull',user:userModels })
    } catch (error) {
        console.log(error, 'error');
    }
})


app.listen(port, () => {
    console.log("API Port:", port)
})