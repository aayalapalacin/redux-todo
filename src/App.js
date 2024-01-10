
import './App.css';
import React from 'react';
import Navbar from "./components/navbar/navbar";
import Todos from "./components/todoList/todos";
import Footer from "./components/footer/footer";



function App() {


  return (
    <div className="App">
       <Navbar />
        <Todos />
        <Footer />
    </div>
  );
}

export default App;
