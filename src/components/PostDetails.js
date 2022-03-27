import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
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
    comments: [],
  });
  const [errors, setErrors] = useState();
  let params = useParams();

  const submitComment = () => {
    console.log('New comment submitted');
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
            comments: [...data.post.comments],
          });
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
            {post.comments && post.comments.length ? (
              post.comments.map((comment) => (
                <Comment key={comment._id} comment={comment} />
              ))
            ) : (
              <p>No comments yet. Be the first to comment!</p>
            )}
          </div>
          <h3 style={{ padding: '12px 0 14px 0' }}>Enter your comment:</h3>
          <CommentForm postId={params.postId} onCommentSubmit={submitComment} />
        </div>
      </div>
    ) : (
      <div></div>
    );
  }

  return <>{content}</>;
};

export default PostDetails;
