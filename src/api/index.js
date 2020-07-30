export function fetchPosts() {
  return fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return {
        error: Object.assign(new Error(res.statusText), { code: res.statusCode }),
      };
    })
    .then((posts) => ( { posts }))
    .catch((error) => {
      console.error(error);
    });
}
