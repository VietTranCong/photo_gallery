import { Routes, Route, Navigate } from 'react-router-dom';
import { PhotoList, PhotoDetail, notFound } from './components';

const App = () => {
  return (
    <Routes>
      <Route path="/photos/:id" element={<PhotoDetail />} />
      <Route path="/photos" element={<PhotoList />} />
      <Route path="/" element={<Navigate to="/photos" />} />
      <Route path="*" element={<notFound />} />
    </Routes>
  );
};

export default App;