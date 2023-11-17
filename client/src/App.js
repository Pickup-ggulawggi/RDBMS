import { Routes, Route } from 'react-router-dom';
import TopHeaderBar from './components/TopHeaderBar';
import CreatePage from './pages/CreatePage'
import RetrievePage from './pages/RetrievePage'

import './App.css';

function App() {
  return (
    <div className="App">
      <TopHeaderBar />
      <Routes>
        <Route path="/" element={<RetrievePage/>} />
        <Route path="/create" element={<CreatePage/>} />
      </Routes>
    </div>
  );
}

export default App;
