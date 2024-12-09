import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  const currentPage = useLocation().pathname;
  return (
    <div>
    <ul className="nav ">
      
      <li className="nav-item">
        <Link
          to="/CandidateSearch"
    
          className={currentPage === '/CandidateSearch' ? 'nav-link active' : 'nav-link'} 
        >
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/SavedCandidates"
 
          className={currentPage === '/SavedCandidates' ? 'nav-link active' : 'nav-link'}
        >
          Saved Candidates
        </Link>
      </li>
      </ul>
      </div>
  )
};

export default Nav;
