const Comment = ({ comment: { content, username, createdAtFormatted } }) => {
  return (
    <div className='comment'>
      <div className='comment__body'>
        <p>{content}</p>
      </div>
      <div className='comment__footer'>
        <p>
          Posted by <strong>{username}</strong>
        </p>
        <p
          style={{
            fontSize: '14px',
            fontStyle: 'italic',
            fontWeight: 300,
          }}
        >
          {createdAtFormatted}
        </p>
      </div>
    </div>
  );
};

export default Comment;
