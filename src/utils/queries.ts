import groq from "groq";

// getPosts query
export const getPosts = groq`
*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`;

// getPost query
export const getPost = groq`
*[_type == "post" && slug.current == $slug][0]`;
