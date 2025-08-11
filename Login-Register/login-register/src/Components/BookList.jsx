import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "../Styles/Books.css"
import BookItem from '../helpers/BookItem'
import { useNavigate } from "react-router-dom";

function Booklist() {

    const [books,SetBooks] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const FetchBooksWithImages = async () => {
        // const REST_API_URL = ;
        try{
            const response = await axios.get("http://localhost:8080/Books");
            const BooksData = response.data;
            
            const booksWithImages = await Promise.all(
                BooksData.map(async (book) => {
                    try{
                        const imageResponse = await axios.get(`http://localhost:8080/Books/${book.id}/image`,
                            { responseType : "blob"}
                        );
                        const ImageUrl = URL.createObjectURL(imageResponse.data);
                        return{...book,ImageUrl};
                    } catch (error){
                        console.error(`Image fetch failed for book ${book.id}:`, error);
                        return { ...book, ImageUrl: "placeholder.jpg" };
                    }
                })
            );

            SetBooks(booksWithImages);
        } catch (error) {
            console.error("Error fetching Product:",error);
        }
    };


    FetchBooksWithImages();
    },[]);

    const handleClick = () => {
        navigate("/AddBookImage")
    }

    return(
        <div className="books">
            <h2 className="bookTitle">Books</h2>
            <button type="button" className="btn btn-warning btn-lg" onClick={handleClick}>Add Book</button>
            <div className="booklist">
                {books.map((book,key) => {
                    return(
                    <BookItem 
                    key={key}
                    image={book.ImageUrl}
                    name={book.name}
                    price={book.price}
                    bookId={book.id}
                    />
                    );
                }
            )}
            </div>
        </div>
    );
}
export default Booklist