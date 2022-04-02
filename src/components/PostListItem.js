import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';
import { SERVER_URL } from '../constants';

const PostListItem = () => {
  const [isLoading, setIsLoading] = useState();
  const [posts, setPosts] = useState([]);
  const [errors, setErrors] = useState();
  const [scroll, setScroll] = useState();

  let navigate = useNavigate();

  const scrollHandler = () => {
    setScroll(window.scrollY);
  };

  const goBackUp = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(SERVER_URL);
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

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (errors) {
    content = <h3>{errors}</h3>;
  } else {
    content =
      posts && posts.length ? (
        posts.map(
          ({
            _id,
            title,
            content,
            author,
            createdAtFormatted,
            commentCount,
          }) => (
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
                <p>
                  {commentCount} {commentCount > 1 ? 'Comments' : 'Comment'}
                </p>
              </div>

              {scroll > 20 ? (
                <button className='button__scroll__top' onClick={goBackUp}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='28'
                    height='28'
                    fill='currentColor'
                    className='bi bi-arrow-up-circle'
                    viewBox='0 0 16 16'
                  >
                    <path
                      fillRule='evenodd'
                      d='M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z'
                    />
                  </svg>
                </button>
              ) : null}
            </div>
          )
        )
      ) : (
        <h3>No post yet.</h3>
      );
  }

  return <div>{content}</div>;
};

export default PostListItem;
