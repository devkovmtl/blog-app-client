import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { DateTime } from 'luxon';
import ObjectID from 'bson-objectid';
import { SERVER_URL } from '../constants';
import Loader from './Loader';
import Comment from './Comment';
import CommentForm from './CommentForm';

const PostDetails = () => {
  const [isLoading, setIsLoading] = useState();
  const [post, setPost] = useState({
    _id: '',
    title: '',
    content: '',
    author: {
      _id: '',
      username: '',
    },
    createdAtFormatted: '',
    updatedAtFormatted: '',
  });
  const [comments, setComments] = useState([]);
  const [errors, setErrors] = useState();
  const [scroll, setScroll] = useState();

  let params = useParams();

  const scrollHandler = () => {
    setScroll(window.scrollY);
  };

  const goBackUp = () => {
    window.scrollTo(0, 0);
  };

  const submitComment = ({ username, content }) => {
    const newComment = {
      _id: ObjectID(),
      username,
      content,
      createdAtFormatted: DateTime.now().toLocaleString(
        DateTime.DATETIME_SHORT
      ),
    };
    setComments((prevState) => [...prevState, newComment]);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    const fetchPostDetails = async () => {
      try {
        const { data } = await axios.get(SERVER_URL + params.postId);
        setIsLoading(false);
        if (data.success) {
          setPost({
            ...data.post,
            author: {
              ...data.post.author,
            },
          });
          setComments([...data.post.comments]);
        } else {
          setErrors('Sorry, an error occurred. Try again.');
        }
      } catch (error) {
        setIsLoading(false);
        setErrors('Sorry, an error occurred. Try again.');
      }
    };
    fetchPostDetails();
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
    content = post ? (
      <div className='post__details'>
        <div className='post__details__header'>
          <h1 className='post__details__title'>{post.title}</h1>
          <p className='post__details__subtitle'>
            Posted by <strong>{post.author.username}</strong>, on{' '}
            {post.createdAtFormatted}
          </p>
        </div>
        <div className='post__details__body'>
          <p>{post.content}</p>
        </div>
        <div className='post__details__body'>
          <h3 style={{ padding: '12px 0 24px 0' }}>Comments:</h3>
          {/* Comment container */}
          <div className='comment__list'>
            {comments && comments.length ? (
              comments.map((comment) => (
                <Comment key={comment._id} comment={comment} />
              ))
            ) : (
              <p>No comments yet. Be the first to comment!</p>
            )}
          </div>
          <h3 style={{ padding: '12px 0 14px 0' }}>Enter your comment:</h3>
          <CommentForm postId={params.postId} onCommentSubmit={submitComment} />
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
    ) : (
      <div></div>
    );
  }

  return <>{content}</>;
};

export default PostDetails;
