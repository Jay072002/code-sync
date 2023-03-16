import './App.scss';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import EditorPage from "./pages/EditorPage"
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>

    {/* place toaster at the top of the app so that it can work */}
    <div>
      <Toaster position='top-right' />
    </div>

    {/* route links  */}
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/editor/:id' element={<EditorPage />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
