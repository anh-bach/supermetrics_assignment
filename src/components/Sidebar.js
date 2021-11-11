import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { debounce } from '../utils/debounce';
import { sortPostAscending } from '../utils/sort';

const Sidebar = ({
  users = [],
  usersSearch,
  setSort,
  setUsersSearch,
  setPostsSearch,
}) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [initUsers, setInitUsers] = useState([]);

  useEffect(() => {
    //init users at the beginning
    setInitUsers(users);
  }, [users]);

  const handleClick = (user) => {
    //navigate to personal user posts page
    navigate(`/posts/${user.id}`);
    //reset the sort
    setSort('ascending');
    //reset the sidebar
    setInitUsers(users);
    //reset the users search input
    setUsersSearch('');
    //reset the posts search input
    setPostsSearch('');
  };

  const handleSearch = (e) => {
    //control user search input
    const keyword = e.target.value.toLowerCase();
    setUsersSearch(keyword);
    //reset all the users
    setInitUsers(users);
    //filter users and render the result
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(keyword)
    );
    setInitUsers(filteredUsers);
  };

  return (
    <Fragment>
      <div className='sidebar__search'>
        <input
          value={usersSearch}
          onChange={handleSearch}
          type='text'
          placeholder='Search user...'
        />
      </div>
      <div className='sidebar__container'>
        {initUsers.map((user) => (
          <div
            key={user.id}
            className={`row sidebar__item ${userId === user.id && 'active'}`}
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
