import axios from 'axios';
import React, {useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "../Styles/Books.css"
import BookItem from '../helpers/BookItem'
import { useNavigate } from "react-router-dom";
import {userContext} from "../Context/ContextProvider.jsx";
import SearchIcon from '@mui/icons-material/Search';

function Booklist() {

    const [books,SetBooks] = useState([]);
    const navigate = useNavigate();
    const {role,SetRole} = useContext(userContext);
    const [search,SetSearch] = useState([]);
    
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
            SetSearch(booksWithImages);
        } catch (error) {
            console.error("Error fetching Product:",error);
        }
    };


    FetchBooksWithImages();
    },[]);

    const Filter = (event) => { 
        SetSearch(books.filter(f => 
            f.name.toLowerCase().includes(event.target.value .toLowerCase()))); 
        }

    const handleClick = () => {
        navigate("/AddBookImage")
    }

    return(
        <div className="books">
            <h2 className="bookTitle">Books</h2>
            <div className='search'>
                <SearchIcon className='search-icon'></SearchIcon>
                <input type='text' className='search-input' onChange={Filter}/>
            </div>
            {role === 'Admin' ?
            <button type="button" 
            className="btn btn-warning btn-lg" 
            onClick={handleClick}>
                Add Book
                </button> 
                : null}
            <div className="booklist">
                {search.map((book,key) => {
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