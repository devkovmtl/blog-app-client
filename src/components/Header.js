import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <h1 className='title'>
      <Link to={'/'} style={{ color: '#fff', textDecoration: 'none' }}>
        Simple Blog
      </Link>
    </h1>
  </header>
);

export default Header;
