import Comment from './Comment';

const comment = {
  content:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, debitis.',
  author: 'Username',
  createdAt: Date.now().toLocaleString(),
};

const PostDetails = () => {
  return (
    <div className='post__details'>
      <div className='post__details__header'>
        <h1 className='post__details__title'>title</h1>
        <p className='post__details__subtitle'>
          Posted by <strong>author username</strong>, on createdAt
        </p>
      </div>
      <div className='post__details__body'>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
          cum nemo consequatur quidem quasi.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem,
          dolores?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi,
          dolores iusto totam ab soluta eligendi, id a optio debitis
          necessitatibus molestias reprehenderit ducimus eveniet saepe!
        </p>
      </div>
      <div className='post__details__body'>
        <h3 style={{ padding: '12px 0 24px 0' }}>Comments:</h3>
        {/* Comment container */}
        <div className='comment__list'>
          <Comment comment={comment} />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
