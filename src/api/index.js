export async function fetchPosts() {
  try {
    const res = await fetch('http://jsonplaceholder.typicode.com/posts');
    if (res.ok) {
      return res.json();
    } else {
      throw Object.assign(
        new Error(res.statusText),
        { code: res.statusCode }
     );
    }
  } catch(error) {
    console.error(error);
  }
}
