const express = require("express");
const app = express();
app.use(express.json());

const { userRouter } = require("./routers/user.router");
const { departmentRouter } = require("./routers/department.router");
const { connection } = require("./config/db");
app.use('/user',userRouter)





// WORKSPACE FOR THE DEPARTMENT

app.use('/',departmentRouter)

app.listen(8080,async()=>{
     try {
      await connection
        console.log('listening on 8080 ')
     } catch (error) {
        console.log('error in connecting to DB: ' + error)
     }
})

// console.log(sequelize);