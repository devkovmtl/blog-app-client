import { useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../constants';

const CommentForm = ({ postId, onCommentSubmit }) => {
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    content: '',
    submitError: '',
  });

  const onUsernameChange = (e) => {
    let newErrors = {
      username: '',
      submitError: '',
    };
    setErrors((prevState) => ({ ...prevState, ...newErrors }));
    setUsername(e.target.value);
  };

  const onContentChange = (e) => {
    let newErrors = {
      content: '',
      submitError: '',
    };
    setErrors((prevState) => ({ ...prevState, ...newErrors }));
    setContent(e.target.value);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    let updatedErrors = {};
    if (!username.trim() && !content.trim()) {
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
    if (!username.trim()) {
      updatedErrors = {
        username: 'Username is required with at least 1 character',
      };
      setErrors((prevState) => ({
        ...prevState,
        ...updatedErrors,
      }));
      return;
    }
    if (!content.trim()) {
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
    const newComment = { username: username.trim(), content: content.trim() };

    try {
      const { data } = await axios.post(
        SERVER_URL + `comments/${postId}`,
        newComment
      );
      if (data.success) {
        setUsername('');
        setContent('');
        onCommentSubmit({ username, content });
      }
    } catch (error) {
      updatedErrors = {
        submitError: 'Something went wrong. Try again.',
      };
      setErrors({ ...errors, ...updatedErrors });
    }
  };

  return (
    <>
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
      {errors.submitError ? (
        <p style={{ textAlign: 'center', fontSize: '14px' }}>
          {errors.submitError}
        </p>
      ) : null}
    </>
  );
};

export default CommentForm;
