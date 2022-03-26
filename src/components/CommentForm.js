const CommentForm = () => {
  return (
    <form className='form'>
      <div className='form__group'>
        <label htmlFor='username' className='input-group__label'>
          Username
        </label>
        <input
          type='text'
          id='username'
          name='username'
          className='input-group__input'
          required
        />
        <div class='input-group--invalid-feedback'>
          <p>Username is required</p>
        </div>
      </div>
      <div className='form__group'>
        <label htmlFor='content' className='input-group__label'>
          Comment
        </label>
        <textarea
          name='content'
          id='content'
          cols='30'
          rows='10'
          className='input-group__textarea'
          placeholder='Enter your comment'
          required
        ></textarea>
        <div class='input-group--invalid-feedback'>
          <p>Comment is required</p>
        </div>
      </div>
      <input type='submit' value='Submit' className='input__submit' />
    </form>
  );
};

export default CommentForm;
