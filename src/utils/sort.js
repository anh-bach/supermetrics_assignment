export const sortPostAscending = (posts) =>
  posts.sort(
    (postOne, postTwo) =>
      new Date(postOne.created_time) - new Date(postTwo.created_time)
  );

export const sortPostDescending = (posts) =>
  posts.sort(
    (postOne, postTwo) =>
      new Date(postTwo.created_time) - new Date(postOne.created_time)
  );
