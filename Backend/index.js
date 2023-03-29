const sequelize = require("./config/db")
const express = require("express");
const app = express();
app.use(express.json());

const { userRouter } = require("./routers/user.router");
app.use('/user',userRouter)

app.listen(8080,async()=>{
     try {
        await sequelize;
        console.log('listening on 8080 ')
     } catch (error) {
        
     }
})

console.log(sequelize);