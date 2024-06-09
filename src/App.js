import './App.css';
import { HashRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Edit from './pages/edit'
import Display from './pages/display';

function App() {
  return (
    <Router>
      <h1 style={{textAlign: 'center'}}>To Do List</h1>
      <div className='nav'>
        <Link to='/'>Add</Link>
        <Link to='/edit'>Edit</Link>
      </div>
      <div className='main'>
        <div className='main1'>
            <Routes>
              <Route path='/'>
                <Route index element={<Home />} />
                <Route path='/edit' element={<Edit />} />
              </Route>
            </Routes>
        </div>
        <div className='task-list'>
          <h1 style={{margin: '25px auto'}}>Tasks</h1>
          <Display/>
        </div>
      </div>
    </Router>
  );
}

export default App;
