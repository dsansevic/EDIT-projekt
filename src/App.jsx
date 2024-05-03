import './App.css';
import page from './pages';
import Navbar from './components/NavBar'; // kasnije iz indexa dohvatit
import {Routes, Route} from 'react-router-dom';
import { AdminContext } from './contexts/AdminContext';
import { useMemo, useState } from 'react';
import ErrorPage from './ErrorPage';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

function App() {
  const { Home, Activities, Volunteers, Associations } = page;
  const [admin, setAdmin] = useState(false);
  const adminValue = useMemo(() => ({admin, setAdmin}), [admin, setAdmin]);

  return (
    <>
    <AdminContext.Provider value={adminValue}>
      <Navbar />
      <Routes errorElement={<ErrorPage />}>
        <Route path="/" element={<Home />} />
        <Route path="/Activities" element={<Activities />} />
        <Route path="/Volunteers" element={<Volunteers />} />
        <Route path="/Associations" element={<Associations />} />
      </Routes>
      </AdminContext.Provider>
    </>
  );
}

export default App
