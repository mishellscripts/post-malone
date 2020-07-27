export const fetchPosts = async () => {
  try {
    const res = await fetch('http://jsonplaceholder.typicode.com/posts');
    console.log(res);
    if (res.ok) {
      return res.json();
    } else {
      throw res.json();
    }
  } catch(error) {
    throw error;
  }
};
