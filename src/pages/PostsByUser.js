import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import PostList from '../components/PostList';
import { Link } from 'react-router-dom';
import { sortPostAscending } from '../utils/sort';

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
      //set the posts of the current creators - ascendingly created_time sorted
      setPosts(sortPostAscending(currentCreator.posts));
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
        {posts.length > 0 ? (
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
        ) : (
          <div>
            <p>
              There is no post to show yet or your token is expired. Please
              Login again to continue to use the App.
            </p>
            <Link className='btn' to='/login'>
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsByUser;
