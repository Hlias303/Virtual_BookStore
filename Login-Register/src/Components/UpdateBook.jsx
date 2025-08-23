import React, { useState , useEffect } from 'react'
import Cookies from 'universal-cookie';
import "../Styles/AddBook.css"
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function UpdateBook() {

    const {id} = useParams();
    const cookies = new Cookies();
    const [book,SetBook] = useState({});
    const [image,SetImage] = useState();
    const [Updatebook,SetUpdateBook] = useState({
        name: "",
        brand: "",
        description: "",
        price: "",
        release_date: "",
    })

    useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/Books/${id}`
        );

        SetBook(response.data);
      
        const responseImage = await axios.get(
          `http://localhost:8080/Books/${id}/image`,
          { responseType: "blob" }
        );
       const imageFile = await converUrlToFile(responseImage.data,
        response.data.imageName)

        SetImage(imageFile);     
        SetUpdateBook(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchBook();
  }, [id]);

    // useEffect(() => {
    //     console.log("image Updated", image);
    // }, [image]);

    const converUrlToFile = async(blobData, fileName) => {
        const file = new File([blobData], fileName, { type: blobData.type });
        return file;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        SetUpdateBook({ ...Updatebook, [name]: value });
  };

    const handleImageChange = (e) => {
        SetImage(e.target.files[0]);
  };

  const SubmitHandler = (event) => {
    event.preventDefault();
    const token = cookies.get("token");
    const formData = new FormData();
    formData.append("image", image);
    formData.append("book", new Blob([JSON.stringify(Updatebook)], { type: "application/json" }));
    console.log("UpdateData");
    axios
      .put(`http://localhost:8080/Books/${id}`, formData, {
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
        console.error("Error updating product:", error);
        alert("Failed to update Product");
      });
  };


  return (
    <div className='container-add-book'>
      <h1>Update Book</h1>
      <form onSubmit={SubmitHandler}>
        <label htmlFor='name'>Name</label>
        <input type='text' placeholder={book.name} value={Updatebook.name}
         onChange={handleInputChange} name='name'></input>

        <label htmlFor="release_date">Release Date</label>
        <input type='text' placeholder={book.release_date} value={Updatebook.release_date}
         onChange={handleInputChange} name='release_date'></input>

        <label htmlFor="price">Price</label>
        <input type='text' placeholder={book.price} value={Updatebook.price}
         onChange={handleInputChange} name='price'></input>

        <label htmlFor="Description">Description</label>
        <textarea type='text' placeholder={book.description} value={Updatebook.description}
         cols={20} rows={10} onChange={handleInputChange} name='Description'></textarea>

        <label htmlFor='image'>Image</label>
        <input type='file' onChange={handleImageChange} name='image'></input>

        <button type="submit" className="btn btn-primary btn-lg">Submit</button>
      </form>
    </div>
  )
}
