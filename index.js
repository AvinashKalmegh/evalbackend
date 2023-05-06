const express = require("express");
const main = require("./configs/db");
const cors = require("cors");
const userRouter = require("./Routes/user");
const postRouter = require("./Routes/post");
const authentication = require("./middleware/authentication");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Post App");
})

app.use("/users",userRouter);
// app.use(authentication);
app.use("/posts",postRouter);


app.listen(3002,()=>{
    main();
    console.log("Server is running on port 3002");
})