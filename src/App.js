
import './App.css';
import React from 'react';
import Navbar from "./components/navbar/navbar";
import Todos from "./components/todoList/todos";
import Footer from "./components/footer/footer";



function App() {


  return (
    <div className="App">
       <Navbar />
        <div className="todo-title">Todos</div>
        <div className="content">
            <Todos />
            <Footer />
        </div>

    </div>
  );
}

export default App;
