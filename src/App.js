import SearchResult from './components/SearchResult/SearchResult';
import LandingPage from './components/LandingPage/LandingPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Route exact path='/' component={LandingPage} /> */}
        <LandingPage />
        <SearchResult />
        <Route path='/result' component={SearchResult} />
      </div>
    </Router>
    
  );
}

export default App;
