export const apiEndpoints = {
  getUsers: `https://jsonplaceholder.typicode.com/users`,
  getPostsByUserId: (userId) =>
    `https://jsonplaceholder.typicode.com/users/${userId}/posts`,
  addPosts: `https://jsonplaceholder.typicode.com/posts`,
};
