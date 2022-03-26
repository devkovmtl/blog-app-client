import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';

const PostListItem = () => {
  const [isLoading, setIsLoading] = useState();
  const [posts, setPosts] = useState([]);
  const [errors, setErrors] = useState();

  let navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8080`);
        setIsLoading(false);
        if (data.success) {
          setPosts([...data.posts]);
        } else {
          setErrors('Sorry, an error occurred. Try again.');
        }
      } catch (error) {
        setIsLoading(false);
        setErrors('Sorry, an error occurred. Try again.');
      }
    };
    fetchPost();
  }, []);

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (errors) {
    content = <h3>{errors}</h3>;
  } else {
    content =
      posts && posts.length ? (
        posts.map(({ _id, title, content, author, createdAtFormatted }) => (
          <div className='post__list__item' key={_id}>
            <div
              className='post__item__header'
              onClick={() => navigate(`${_id}`)}
            >
              <h1 className='post__item__title'>{title}</h1>
              <p className='post__item__subtitle'>
                Posted by <strong>{author.username}</strong>, on{' '}
                {createdAtFormatted}
              </p>
            </div>
            <div className='post__item__body'>
              <p>{content}</p>
            </div>
            <div className='post__item__footer'>
              <p>21 Comments</p>
            </div>
          </div>
        ))
      ) : (
        <h3>No post yet.</h3>
      );
  }

  return <div>{content}</div>;
};

export default PostListItem;
