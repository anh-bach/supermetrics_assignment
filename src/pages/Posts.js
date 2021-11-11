import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Sidebar from '../components/Sidebar';
import PostList from '../components/PostList';
import { getPosts } from '../actions/post';
import { Link } from 'react-router-dom';
import { sortPostAscending } from '../utils/sort';
import { LOGGED_IN_USER } from '../actions/types';

const Posts = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [sort, setSort] = useState('ascending');
  const [usersSearch, setUsersSearch] = useState('');
  const [postsSearch, setPostsSearch] = useState('');

  useEffect(() => {
    //check if there is user token already in localStorage
    if (localStorage.getItem('supermetrics_user')) {
      const userObj = JSON.parse(localStorage.getItem('supermetrics_user'));
      //if yes, save it in redux store -> this will keep user logged in if page reloads
      dispatch({
        type: LOGGED_IN_USER,
        payload: userObj,
      });
    }
  }, []);

  useEffect(() => {
    if (user && user.sl_token) {
      //load user's post according to the token
      loadPosts(user.sl_token);
    }
  }, [user]);

  //load user posts func
  const loadPosts = async (token) => {
    try {
      const res = await getPosts(token);
      const rawPosts = res.data.data.posts;

      //process the results to get unique users
      const uniqueUsersObj = {};

      for (let i = 0; i < rawPosts.length; i++) {
        if (!uniqueUsersObj[rawPosts[i].from_id]) {
          uniqueUsersObj[rawPosts[i].from_id] = {
            id: rawPosts[i].from_id,
            name: rawPosts[i].from_name,
            postsCount: 1,
            posts: [rawPosts[i]],
          };
        } else {
          uniqueUsersObj[rawPosts[i].from_id] = {
            ...uniqueUsersObj[rawPosts[i].from_id],
            postsCount: uniqueUsersObj[rawPosts[i].from_id].postsCount + 1,
            posts: [...uniqueUsersObj[rawPosts[i].from_id].posts, rawPosts[i]],
          };
        }
      }
      const uniqueUsers = Object.values(uniqueUsersObj);

      //set the total users with the users sorted alphabetically
      setUsers(
        uniqueUsers.sort((userOne, userTwo) =>
          userOne.name.localeCompare(userTwo.name)
        )
      );
      //set the current user as the first user
      setCurrentUser(uniqueUsers[0]);
      //set the current user's posts which are sorted ascending
      setPosts(sortPostAscending(uniqueUsers[0].posts));
    } catch (error) {
      console.log('From load posts', error);
    }
  };

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
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                setPosts={setPosts}
                setSort={setSort}
                usersSearch={usersSearch}
                setUsersSearch={setUsersSearch}
                setPostsSearch={setPostsSearch}
              />
            </div>

            <div className='col-8'>
              <PostList
                posts={posts}
                setPosts={setPosts}
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

export default Posts;
