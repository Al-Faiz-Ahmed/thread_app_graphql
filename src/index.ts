import express from "express";
import { iamMiddleware } from "./middleware";


const app = express();


app.get('/',iamMiddleware,(req,res)=>{res.send("Helllo")})

app.listen(4000,()=>{

    console.log(`Server started succesfully`)
})