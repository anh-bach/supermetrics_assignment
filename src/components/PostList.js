import React, { Fragment, useEffect, useState } from 'react';

import Post from './Post';
import { debounce } from '../utils/debounce';
import { sortPostAscending, sortPostDescending } from '../utils/sort';

const PostList = ({
  posts = [],
  setPosts,
  sort,
  setSort,
  postsSearch,
  setPostsSearch,
}) => {
  const [initPosts, setInitPosts] = useState([]);

  useEffect(() => {
    if (sort === 'ascending') {
      const sortedPosts = sortPostAscending(initPosts);
      //set the posts as the new ascending sorted array so the posts list will be re-rendered
      setInitPosts([...sortedPosts]);
    } else if (sort === 'descending') {
      const sortedPosts = sortPostDescending(initPosts);
      //set the posts as the new desscending sorted array so the posts list will be re-rendered
      setInitPosts([...sortedPosts]);
    }
  }, [sort]);

  useEffect(() => {
    setInitPosts(posts);
  }, [posts]);

  const handleSearch = (e) => {
    //control posts search input
    const keyword = e.target.value.toLowerCase();
    setPostsSearch(keyword);

    console.log('trigger search posts');
    //reset all the posts
    setInitPosts(posts);
    const filteredPosts = posts.filter((post) =>
      post.message.toLowerCase().includes(keyword)
    );
    //set the filtered posts to render after search
    setInitPosts(filteredPosts);
  };

  return (
    <Fragment>
      <div className='posts__cta__container'>
        <div className='posts__sort'>
          <button
            type='button'
            disabled={sort === 'ascending' && true}
            onClick={() => setSort('ascending')}
          >
            ASC
          </button>
          <button
            type='button'
            disabled={sort === 'descending' && true}
            onClick={() => setSort('descending')}
          >
            DESC
          </button>
        </div>
        <div className='posts__search'>
          <input
            type='text'
            value={postsSearch}
            placeholder='Search posts...'
            onChange={(e) => handleSearch(e)}
          />
        </div>
      </div>
      {initPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </Fragment>
  );
};

export default PostList;
