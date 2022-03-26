const Comment = ({ comment: { content, author, createdAt } }) => {
  console.log(content, author, createdAt);
  return (
    <div className='comment'>
      <div className='comment__body'>
        <p>{content}</p>
      </div>
      <div className='comment__footer'>
        <p>
          Posted by <strong>{author}</strong>
        </p>
        <p
          style={{
            fontSize: '14px',
            fontStyle: 'italic',
            fontWeight: 300,
          }}
        >
          {createdAt}
        </p>
      </div>
    </div>
  );
};

export default Comment;
