import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListEmployees from './Components/ListEmployees'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Login_Signup from './Components/Login_Signup'
import HomePage from './Components/HomePage'
import BookList from './Components/BookList'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Register from './Components/Register'
import  Book from './Components/Book'
import AddBook from './Components/AddBook'
import UpdateBook from './Components/UpdateBook'


function App() {
 
  return (
    <Router>
      <Header/>
        <Routes>
          <Route path="/Home" element= {<HomePage/>}/>
          <Route path ="/Users" element ={<ListEmployees/>}/>
          <Route path="/Login" element={<Login_Signup/>}/>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/Books" element={<BookList/>}/>
          <Route path="/Books/:id" element={<Book/>}></Route>
          <Route path="/AddBookImage" element={<AddBook/>}></Route>
          <Route path="/BookUpdate/:id" element={<UpdateBook/>}></Route>
        </Routes>
      <Footer/>
    </Router>
  );
}

export default App
