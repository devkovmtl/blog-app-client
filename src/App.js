import Header from './components/Header';
import PostListItem from './components/PostListItem';

const post = {
  _id: Math.floor(Math.random() * 99999),
  title: 'Post Title',
  content: 'Post Content...',
  createdAt: Date.now().toLocaleString(),
  author: {
    username: 'AuthorUsername',
  },
};

function App() {
  return (
    <div>
      <Header />
      {/* Exterior Card */}
      <main>
        {/* Column That hold list blog */}
        <div className='post__list'>
          {/* Post Blog Card */}
          <PostListItem post={post} />
        </div>
      </main>
    </div>
  );
}

export default App;
