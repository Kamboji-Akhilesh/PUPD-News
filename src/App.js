import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Auth/Signup/Signup'
import Login from './Auth/Login/Login'
import News from './News/News'
import Profile from './Profile/Profile'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/general' element={<News category='general' />} />
          <Route path='/business' element={<News category='business' />} />
          <Route path='/entertainment' element={<News category='entertainment' />} />
          <Route path='/health' element={<News category='health' />} />
          <Route path='/science' element={<News category='science' />} />
          <Route path='/sports' element={<News category='sports' />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
