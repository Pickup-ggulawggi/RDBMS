import { Routes, Route } from 'react-router-dom';
import TopHeaderBar from './components/TopHeaderBar';
import CreatePage from './pages/CreatePage/CreatePage'
import RetrievePage from './pages/RetrievePage/RetrievePage'
import TeamInfo from './pages/TeamInfoPage/TeamInfo';

import './App.css';

function App() {
  return (
    <div className="App">
      <TopHeaderBar />
      <Routes>
        <Route path="/" element={<RetrievePage/>} />
        <Route path="/create" element={<CreatePage/>} />
        <Route path="/team" element={<TeamInfo/>} />
      </Routes>
    </div>
  );
}

export default App;
