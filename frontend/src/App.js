
import './App.css';
import {
  BrowserRouter as Router,
  Route,Routes

} from "react-router-dom";
import HomePage from './Pages/HomePage';
import Chats from './Pages/Chats';
import ChatsPage from './Pages/ChatsPage'


function App() {
  return (
    <div className="App">
    <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/chats" element={<Chats/>}/>
    <Route path="/chatspage" element={<ChatsPage/>}/>
    
  

    
    
    </Routes>
    </div>
  );
}

export default App;
