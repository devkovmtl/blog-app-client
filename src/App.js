import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import PostListItem from './components/PostListItem';
import PostDetails from './components/PostDetails';

function App() {
  return (
    <div>
      <Header />
      {/* Exterior Card */}
      <main>
        <Routes>
          <Route path=':postId' element={<PostDetails />} />
          <Route path='/' element={<PostListItem />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
