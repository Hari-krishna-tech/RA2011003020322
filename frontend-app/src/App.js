
import './App.css';
import {Route, Routes} from 'react-router-dom';
import ShowTrains from './components/ShowTrains.jsx';
import ShowTrain from './components/ShowTrain';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ShowTrains/>} />
         
        <Route path="/:id" element={<ShowTrain/>} />

      </Routes>
      
    </div>
  );
}

export default App;
