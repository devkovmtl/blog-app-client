import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const posts = [
  {
    _id: Math.floor(Math.random() * 99999),
    title: 'Post Title 1',
    content: 'Post Content 1 ...',
    createdAt: Date.now().toLocaleString(),
    author: {
      username: 'AuthorUsername',
    },
  },
  {
    _id: Math.floor(Math.random() * 99999),
    title: 'Post Title 2',
    content: 'Post Content 2 ...',
    createdAt: Date.now().toLocaleString(),
    author: {
      username: 'AuthorUsername',
    },
  },
  {
    _id: Math.floor(Math.random() * 99999),
    title: 'Post Title 3 ',
    content: 'Post Content 3 ...',
    createdAt: Date.now().toLocaleString(),
    author: {
      username: 'AuthorUsername',
    },
  },
];

const PostListItem = () => {
  let navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {posts.map(({ _id, title, content, author, createdAt }) => (
        <div className='post__list__item' key={_id}>
          <div
            className='post__item__header'
            onClick={() => navigate(`${_id}`)}
          >
            <h1 className='post__item__title'>{title}</h1>
            <p className='post__item__subtitle'>
              Posted by <strong>{author.username}</strong>, on {createdAt}
            </p>
          </div>
          <div className='post__item__body'>
            <p>{content}</p>
          </div>
          <div className='post__item__footer'>
            <p>21 Comments</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostListItem;
