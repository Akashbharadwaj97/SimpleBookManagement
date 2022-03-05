const express=require("express")
const bodyParser=require("body-parser")
const bookRoutes=require("./routes/BookRoutes")


//initializing express

const app=express();


//using the body Parser middleware

//using the parsing the request


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/',(req,res)=>{
  res.send("This api is working")
})

//book routes to handle all starting with books

app.use("/books",bookRoutes);

app.listen(8080,()=>{
  console.log("server started on port 8080")
})