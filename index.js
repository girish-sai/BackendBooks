const express=require("express");
const cors = require("cors");


const app=express();

app.use(cors());
const PORT=process.env.PORT || 5000;

app.use(express.json());

require('./db/connection.js');

const booksRoutes=require('./routes/booksRoutes.js');
const userRoutes=require('./routes/userRoutes.js');

app.use('/api/books',booksRoutes);
app.use('/api/users',userRoutes);

app.get('/',(req,res)=>{
    res.send("Write http://localhost:5000/api/books  to get alll the books")
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});