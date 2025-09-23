const express = require('express');
const mongoose = require('mongoose');

const router=express.Router();
const Book = require('../models/booksModels');




const getBooks=async (req,res)=>{
    try{
        const books=await Book.find().sort({createdAt:-1});
        res.status(200).json(books);
    }       
    catch(error){
        res.status(500).json({message:error.message});
    }   

};

const getBooksById=async (req,res)=>{
    const _id=req.params.id;
    try{
        const book=await Book.findById(_id);
        if(!book){
            return res.status(404).json({message:'Book not found'});
        }   
        res.status(200).json(book);
    }       
    catch(error){
        res.status(500).json({message:"No Book Found"});
    }
}

const createBook=async (req,res)=>{
    try{
        const book=new Book(req.body); 
        await book.save();
        res.status(201).json(book);
    }   
    catch(error){
        res.status(400).json({message:error.message});
    }
};

const updateBook=async (req,res)=>{
    const _id=req.params.id;
    try{
        const book=await Book.findByIdAndUpdate(_id,req.body);          
        if(!book){
            return res.status(404).json({message:'Book not found'});
        }   
        res.status(200).json(book);
    }   
    catch(error){
        res.status(400).json({message:error.message});
    }
        
};
const deleteBook=async (req,res)=>{
    const _id=req.params.id;            

    try{
        const book=await Book.findByIdAndDelete(_id);       

        if(!book){
            return res.status(404).json({message:'Book not found'});
        }       

        res.status(200).json({message:'Book deleted successfully'});
    }   
    catch(error){
        res.status(500).json({message:error.message});
    }   
};

module.exports={getBooks,getBooksById,createBook,updateBook,deleteBook};