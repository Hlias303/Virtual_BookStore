import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import "../Styles/AddBook.css"
import axios from 'axios';

export default function AddBook() {

    const cookies = new Cookies();

    const [book,SetBook] = useState({
        name: "",
        brand: "",
        description: "",
        price: "",
        release_date: "",
    })

    const [image,setImage] = useState(null) 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        SetBook({ ...book, [name]: value });
  };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
  };

  const SubmitHandler = (event) => {
    event.preventDefault();
    const token = cookies.get("token");
    const formData = new FormData();
    formData.append("image", image);
    formData.append("book", new Blob([JSON.stringify(book)], { type: "application/json" }));

    axios
      .post("http://localhost:8080/AddBookImage", formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Product added successfully:", response.data);
        alert("Product added successfully");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        alert("Error adding product");
      });
  };


  return (
    <div className='container-add-book'>
      <h1>Add Book</h1>
      <form onSubmit={SubmitHandler}>
        <label htmlFor='name'>Name</label>
        <input type='text' placeholder='Enter First Name' value={book.name} onChange={handleInputChange} name='name'></input>

        <label htmlFor="release_date">Release Date</label>
        <input type='text' placeholder='Enter Release Date' value={book.release_date} onChange={handleInputChange} name='release_date'></input>

        <label htmlFor="price">Price</label>
        <input type='text' placeholder='Enter Price' onChange={handleInputChange} name='price'></input>

        <label htmlFor="description">Description</label>
        <textarea type='text' placeholder='Enter The Description' cols={20} rows={10} onChange={handleInputChange} value={book.description} name='description'></textarea>

        <label htmlFor='image'>Image</label>
        <input type='file' onChange={handleImageChange} name='image'></input>

        <button type="submit" className="btn btn-primary btn-lg">Submit</button>
      </form>
    </div>
  )
}
