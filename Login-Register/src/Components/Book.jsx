import React, {useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie'
import Stack from '@mui/material/Stack';
import {userContext} from "../Context/ContextProvider.jsx";

function Book() {

    const {id} = useParams();
    const [book,SetBook] = useState(null);
    const {role,SetRole} = useContext(userContext);
    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate();
    const cookies = new Cookies();

    useEffect(() => {

        const FetchBook = async () => { 
            try{
                const response = await axios.get(`http://localhost:8080/Books/${id}`);
                SetBook(response.data);

                const imageResponse = await axios.get(`http://localhost:8080/Books/${id}/image`,{
                    responseType: 'blob'
                });

                const imageURL = URL.createObjectURL(imageResponse.data);
                setImageUrl(imageURL);
            } catch (error) {
                console.error("Failed to fetch book details", error);
            }
           
        };
        
        FetchBook();
    },[id]);

    const DeleteBook = async () => {
      const token = cookies.get("token");
      try {
        await axios.delete(`http://localhost:8080/Books/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log("Product deleted successfully");
        alert("Product deleted successfully");
        navigate("/Books");
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    };

    const handleEditClick = () => {
      navigate(`/BookUpdate/${id}`);
    };

    if (!book) {
        return <div>Loading...</div>;
    }

    return(
        <>
      <div className="containers" style={{ display: "flex", gap: "2rem", padding: "2rem" }}>
        <img
          className="left-column-img"
          src={imageUrl}
          alt={book.name}
          style={{ width: "30%", height: "100%", objectFit: "cover" }}
        />

        <div className="right-column" style={{ width: "50%" }}>
          <div className="book-description">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: "1.2rem", fontWeight: 'lighter' }}>
                {book.category}
              </span>
              <p className="release-date" style={{ marginBottom: "2rem" }}>
                <h6>Listed: <span><i>{book.release_date}</i></span></h6>
              </p>
            </div>

            <h1 style={{
              fontSize: "2rem",
              marginBottom: "0.5rem",
              textTransform: 'capitalize',
              letterSpacing: '1px'
            }}>
              {book.name}
            </h1>

            <p style={{ fontWeight: 'bold', fontSize: '1rem', margin: '10px 0px 0px' }}>
              BOOK DESCRIPTION:
            </p>
            <p style={{ marginBottom: "1rem" }}>{book.description}</p>
          </div>

          <div className="book-price">
            <span style={{ fontSize: "2rem", fontWeight: "bold" }}>
              {book.price + "$" }
            </span>
          </div>
        </div>
        <Stack spacing={10}>
          {role ==='Admin' ? 
          <div style={{padding: '2rem',textAlign:'right'}}>
            <Button variant='outlined' startIcon={<DeleteIcon/>} onClick={DeleteBook} sx={
              { padding: "1rem 2rem",
                border: "none",
                borderRadius: "50px",
                cursor: "pointer",
                color: '#d32f2f',
                borderColor: "#d32f2f",
              }
            }>
            Delete
            </Button>
            <Button variant='contained' onClick={handleEditClick}>Update</Button>
          </div> 
          : null }
        </Stack>
      </div>
    </>
    )
}

export default Book
