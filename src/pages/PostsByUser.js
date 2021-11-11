import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import PostList from '../components/PostList';
import { getPosts } from '../actions/post';
import { Link } from 'react-router-dom';
import { sortPostAscending } from '../utils/sort';
import { LOGGED_IN_USER } from '../actions/types';

const PostsByUser = () => {
  const { userId } = useParams();
  const postCreators = useSelector((state) => state.postCreators);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState('ascending');
  const [usersSearch, setUsersSearch] = useState('');
  const [postsSearch, setPostsSearch] = useState('');

  //get post creators list for sidebar
  useEffect(() => {
    setUsers(postCreators);
  }, []);

  //get the current creators posts
  useEffect(() => {
    const currentCreator = postCreators.find(
      (creator) => creator.id === userId
    );
    if (currentCreator) {
      setPosts(currentCreator.posts);
    }
  }, [userId]);

  return (
    <div className='container__box--post'>
      <div className='posts__cta__container'>
        <Link className='btn' to='/login'>
          Back
        </Link>
        <Link className='btn' to='/'>
          Home
        </Link>
      </div>
      <h1>This is the posts page</h1>
      <div className='row'>
        <Fragment>
          <div className='col-4'>
            <Sidebar
              users={users}
              usersSearch={usersSearch}
              setSort={setSort}
              setUsersSearch={setUsersSearch}
              setPostsSearch={setPostsSearch}
            />
          </div>

          <div className='col-8'>
            <PostList
              posts={posts}
              sort={sort}
              setSort={setSort}
              postsSearch={postsSearch}
              setPostsSearch={setPostsSearch}
            />
          </div>
        </Fragment>
      </div>
    </div>
  );
};

export default PostsByUser;
