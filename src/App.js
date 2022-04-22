import './App.css';
import './vendors/bootstrap/css/bootstrap.min.css';
// import './vendors/bootstrap/bootstrap.min.css';
import CharacterView from './components/characterView';
import HomeView from './components/homeView';
import { Routes, Route } from "react-router-dom"

function App() {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={ <HomeView/> } />
          <Route path="create" element={ <CharacterView/> } />
        </Routes>
      </div>
    )
  }
  
  export default App