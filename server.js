const express=require("express");

const app=express();

const PORT=5000;

app.use(express.json());

require('./db/connection.js');

const booksRoutes=require('./routes/booksRoutes');
const userRoutes=require('./routes/userRoutes');

app.use('/api/books',booksRoutes);
app.use('/api/users',userRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
}); 