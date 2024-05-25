import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    axios.get(`/blogs/${id}`)
      .then(response => setBlog(response.data))
      .catch(error => console.error('Error fetching blog:', error));
  }, [id]);

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <p><small>{new Date(blog.date).toLocaleDateString()}</small></p>
    </div>
  );
}

export default SingleBlog;

