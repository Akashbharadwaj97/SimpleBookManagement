const res = require("express/lib/response");
const uuid=require("uuid")
var books=require("../models/BookModel");   

//Create

const addBook= (req,res) => {
  const book=req.body;

  if(!book.title)
  {
    res.status(400).send({
      message:"Title cant be empty"
    })
    return;
  }
try{
  const newBook={
    id:uuid.v4(),
    title:book.title,
    author:book.author||"",
    published:book.published||new Date().toLocaleDateString(),
    published:book.published||""
  }
  books.push(newBook);
  res.status(201).json(newBook);
}catch(error){
  console.error(error.message)
  res.status(500).json({message:error.message})
}


}

//get a list of books

const findAllBooks =(req,res)=>{
  try{
    res.status(200).json(books);
  }catch(error){
    console.error(error.message)
    res.status(500).json({message:error.message})
  }
}

const findBookById = (req,res)=>{
  const bookId=req.params.id;
  try{
    const book=books.find((book)=>book.id===bookId)
    if(book){
      res.json(book);
    }
    else{
      res.status(404).json({message:"book not found"})
    }
  }
  catch(error){
    console.error(error.message)
    res.status(500).json({message:error.message})
  }
}

//update an excisting book on its id



const updateBookById=(req,res)=>{
  const upbook=req.body;
  const bookId=req.params.id

if(!upbook.title){
  res.status(400).send({
    message:"Title of the book cant be empty"
  })
  return;
}
try{
  const book=books.find((book)=>book.id===bookId)
  if(book){
    books=books.map((book)=>{
      if(book.id===bookId){
        return{
          ...book,
          title:upbook.title,
    author:upbook.author||book.author,
    published:upbook.published||book.published,
    published:upbook.published||book.publisher
        }
      }
      else{
        return book;
      }
    })
    res.status(200).json({message:"Book Id $(bookId) details Updated"})

  }
  else{
    res.status(404).json({message:"book details not found"})
  }
}
catch(error){
  console.error(error.message);
  res.status(500).json({message:error.message})
}

}


//deleting an existing book on its id
const deleteBookById =(req,res)=>{
  const bookId=req.params.id;

  try{
    const book=books.find((book)=>book.id===bookId)
    if(book){
      books=books.filter((book)=>book.id!==bookId)
      res.status(200).json({message:"Book Id ${bookId} details Deleted"})

    }
    else{
      res.status(404).json({message:error.message})
    }
  }
  catch(error){
    console.error(error.message)
    res.status(500).json({message:error.message})
  }
}
module.exports = {findBookById,addBook,deleteBookById,updateBookById,findAllBooks}
