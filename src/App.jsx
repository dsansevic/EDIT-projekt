import './App.css';
import page from './pages';
import Navbar from './components/NavBar';
import ErrorPage from "./error-page";
import {Routes, Route} from 'react-router-dom';

function App() {
  const { Home, Activities, Volunteers, Associations } = page;

  return (
    <>
      <Navbar />
      <Routes errorElement={<ErrorPage />}>
        <Route path="/" element={<Home />} />
        <Route path="/Activities" element={<Activities />} />
        <Route path="/Volunteers" element={<Volunteers />} />
        <Route path="/Associations" element={<Associations />} />
      </Routes>
    </>
  );
}

export default App
