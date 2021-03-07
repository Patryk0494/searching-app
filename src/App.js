import SearchResult from './components/SearchResult/SearchResult';
import LandingPage from './components/LandingPage/LandingPage';
import Search from './components/Search/Search';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path='/' component={LandingPage} />
        <Route path='/result' >
          <div className="result-content">
            <Search inputClass={'result-content__search-input'}/>
            <SearchResult/>
          </div>
        </Route>
      </div>
    </Router>
    
  );
}

export default App;
