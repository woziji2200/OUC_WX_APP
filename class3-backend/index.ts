import express from "express";
import * as user from "./views/user";


export const app = express()
app.use(express.json({limit: '50mb'}))
app.listen(3000, () => {
    console.log("Server is running on port 3000\n", '高性能ですから！エッヘン！')
})

for(let i of Array.from(Object.values(user))){
    i()
}
