const { useState } = require('react');

const CommentForm = ({ postId }) => {
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    content: '',
  });

  const onUsernameChange = (e) => {
    let newErrors = {
      username: '',
    };
    setErrors((prevState) => ({ ...prevState, ...newErrors }));
    setUsername(e.target.value.trim());
  };

  const onContentChange = (e) => {
    let newErrors = {
      content: '',
    };
    setErrors((prevState) => ({ ...prevState, ...newErrors }));
    setContent(e.target.value.trim());
  };

  const submitForm = (e) => {
    e.preventDefault();
    let updatedErrors = {};
    if (!username && !content) {
      updatedErrors = {
        username: 'Username is required with at least 1 character',
        content: 'Comment is required with at least 1 character',
      };
      setErrors((prevState) => ({
        ...prevState,
        ...updatedErrors,
      }));
      return;
    }
    if (!username) {
      updatedErrors = {
        username: 'Username is required with at least 1 character',
      };
      setErrors((prevState) => ({
        ...prevState,
        ...updatedErrors,
      }));
      return;
    }
    if (!content) {
      updatedErrors = {
        content: 'Comment is required with at least 1 character',
      };
      setErrors((prevState) => ({
        ...prevState,
        ...updatedErrors,
      }));
      return;
    }

    // TODO send data to backend
    const newComment = { username, content };
  };

  return (
    <form className='form' onSubmit={submitForm} noValidate>
      <div className='form__group'>
        <label
          htmlFor='username'
          className={`input-group__label ${
            errors.username ? 'input-group__label--invalid' : ''
          }`}
        >
          <span style={{ color: '#ff0000' }}>*</span> Username
        </label>
        <input
          type='text'
          id='username'
          name='username'
          className={`input-group__input ${
            errors.username ? 'input-group__input--invalid' : ''
          }`}
          required
          value={username}
          onChange={onUsernameChange}
        />
        {errors.username && (
          <div className='input-group--invalid-feedback'>
            <p>{errors.username}</p>
          </div>
        )}
      </div>
      <div className='form__group'>
        <label
          htmlFor='content'
          className={`input-group__label ${
            errors.content ? 'input-group__label--invalid' : ''
          }`}
        >
          <span style={{ color: '#ff0000' }}>*</span> Comment
        </label>
        <textarea
          name='content'
          id='content'
          cols='30'
          rows='10'
          className={`input-group__textarea ${
            errors.content ? 'input-group__textarea--invalid' : ''
          }`}
          placeholder='Enter your comment'
          required
          value={content}
          onChange={onContentChange}
        ></textarea>
        {errors.content && (
          <div className='input-group--invalid-feedback'>
            <p>{errors.content}</p>
          </div>
        )}
      </div>
      <input type='submit' value='Submit' className='input__submit' />
    </form>
  );
};

export default CommentForm;
