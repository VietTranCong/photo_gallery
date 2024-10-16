import { Routes, Route } from 'react-router-dom';
import { PhotoList, PhotoDetail } from './components';

const App = () => {
  return (
    <Routes>
      <Route path="/photos/:id" element={<PhotoDetail />} />
      <Route exact path="/photos" element={<PhotoList />} />
    </Routes>
  );
};

export default App;