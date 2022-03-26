const PostListItem = ({ post: { title, content, author, createdAt } }) => {
  return (
    <div className='post__list__item'>
      <div className='post__item__header'>
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
  );
};

export default PostListItem;
