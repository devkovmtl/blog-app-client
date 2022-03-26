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
        <h3 style={{ padding: '24px 0' }}>Comments:</h3>
        {/* Comment container */}
        <div className='comment'>
          <div className='comment__body'>
            <p>
              Comment Content Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Vitae, doloribus?
            </p>
          </div>
          <div className='comment__footer'>
            <p>
              Posted by <strong>Author</strong>
            </p>
            <p
              style={{
                fontSize: '14px',
                fontStyle: 'italic',
                fontWeight: 300,
              }}
            >
              createdAt
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
