import React from 'react';

const Post = ({ post = {} }) => {
  const getTime = (date) => {
    const options = { month: 'long' };
    let time = `${new Intl.DateTimeFormat('en-US', options).format(
      date
    )} ${date.getDate()}, ${date.getUTCFullYear()} ${date.toLocaleTimeString()}`;

    return time;
  };

  return (
    <div className='post__container'>
      <div className='post__header'>
        <div className='post__time'>{getTime(new Date(post.created_time))}</div>
        <div className='post__author'>Author: {post.from_name}</div>
      </div>
      <div className='post__message'>{post.message}</div>
    </div>
  );
};

export default Post;
