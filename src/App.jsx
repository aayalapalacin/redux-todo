
import './App.css';
import React from 'react';
import Navbar from "./components/navbar/navbar.tsx";
import Todos from "./components/todoList/todos.tsx";
import Footer from "./components/footer/footer.tsx";



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
