import React, { Fragment, useState, useEffect } from 'react';

import { debounce } from '../utils/debounce';
import { sortPostAscending } from '../utils/sort';

const Sidebar = ({
  users = [],
  currentUser,
  setCurrentUser,
  setPosts,
  setSort,
  usersSearch,
  setUsersSearch,
  setPostsSearch,
}) => {
  const [initUsers, setInitUsers] = useState([]);

  useEffect(() => {
    //set all users at the beginning
    setInitUsers(users);
  }, [users]);

  const handleClick = (user) => {
    //set the current user
    setCurrentUser(user);
    //reset sorting
    setSort('ascending');
    //reset user search input
    setUsersSearch('');
    //reset posts search input
    setPostsSearch('');
    //reset the total users to show all the users after one user gets clicked
    setInitUsers(users);
    //set the current user's posts with posts sorted ascending
    setPosts(sortPostAscending(user.posts));
  };

  const handleSearch = (e) => {
    console.log('trigger search user');
    //control user search input
    const keyword = e.target.value.toLowerCase();
    setUsersSearch(keyword);
    //reset total users
    setInitUsers(users);
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(keyword)
    );
    //set the filtered users
    setInitUsers(filteredUsers);
  };

  return (
    <Fragment>
      <div className='sidebar__search'>
        <input
          value={usersSearch}
          onChange={(e) => handleSearch(e)}
          type='text'
          placeholder='Search user...'
        />
      </div>
      <div className='sidebar__container'>
        {initUsers.map((user) => (
          <div
            key={user.id}
            className={`row sidebar__item ${
              currentUser && currentUser.id === user.id && 'active'
            }`}
            onClick={() => handleClick(user)}
          >
            <div className='col-8 sidebar__item--name'>{user.name}</div>
            <div className='col-4 sidebar__item--count'>{user.postsCount}</div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default Sidebar;
