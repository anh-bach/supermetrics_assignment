import { sortPostAscending } from './sort';

export const getUniqueUsers = (posts) => {
  //process the results to get unique users
  const uniqueUsersObj = {};

  for (let i = 0; i < posts.length; i++) {
    if (!uniqueUsersObj[posts[i].from_id]) {
      uniqueUsersObj[posts[i].from_id] = {
        id: posts[i].from_id,
        name: posts[i].from_name,
        postsCount: 1,
        posts: [posts[i]],
      };
    } else {
      uniqueUsersObj[posts[i].from_id] = {
        ...uniqueUsersObj[posts[i].from_id],
        postsCount: uniqueUsersObj[posts[i].from_id].postsCount + 1,
        posts: [...uniqueUsersObj[posts[i].from_id].posts, posts[i]],
      };
    }
  }
  const uniqueUsers = Object.values(uniqueUsersObj);
  //sort users according to name alphabetically
  const sortedUniqueUsers = uniqueUsers.sort((userOne, userTwo) =>
    userOne.name.localeCompare(userTwo.name)
  );
  //sort user's posts according to date ascendingly
  sortedUniqueUsers.forEach(
    (user) => (user.posts = sortPostAscending(user.posts))
  );

  return sortedUniqueUsers;
};
