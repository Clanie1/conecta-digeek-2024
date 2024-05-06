import axios, { type AxiosResponse } from "axios";
import readTimeFunction from "./readTimeFunction";

interface Post {
  id?: number;
  content: string;
  postTags: Tag[];
  summary: string;
  read_time: string;
  titulo: string;
  image: string;
  author: Author;
  status?: string;
}

interface Tag {
  id: number;
  tag?: string;
}
interface Author {
  id: number;
  name?: string;
  image?: string;
}

export async function postPost(
  content: string,
  postTags: number[],
  summary: string,
  titulo: string,
  image: string,
  author: number,
  status?: string
): Promise<void> {
  const time = readTimeFunction(content);
  const url: string = "https://directus-10-10-4-p3ab.onrender.com/items/posts";
  const tags: Tag[] = postTags.map((id) => ({ id }));
  const authorFormatted = { id: author };
  const data: Post = {
    content,
    postTags: tags,
    summary,
    read_time: time.toString(),
    titulo,
    image,
    author: authorFormatted,
    status,
  };

  try {
    const response: AxiosResponse<Post> = await axios.post(url, data);
  } catch (error) {
    console.error("There was a problem with your Axios request:", error);
  }
}

export async function updatePost(
  postId: number,
  content: string,
  postTags: number[],
  summary: string,
  titulo: string,
  image: string,
  author: number,
  status?: string
): Promise<void> {
  const time = readTimeFunction(content);
  const url: string = `https://directus-10-10-4-p3ab.onrender.com/items/posts/${postId}`;
  const tags: Tag[] = postTags.map((id) => ({ id }));
  const authorFormatted = { id: author };
  const data: Post = {
    content,
    postTags: tags,
    summary,
    read_time: time.toString(),
    titulo,
    image,
    author: authorFormatted,
    status,
  };

  try {
    const response: AxiosResponse<Post> = await axios.patch(url, data);
  } catch (error) {
    console.error("There was a problem with your Axios request:", error);
  }
}

export async function getPosts(filterIds: number[]): Promise<Post[]> {
  let url: string =
    "https://directus-10-10-4-p3ab.onrender.com/items/posts?fields=*.*,postTags.tags_id.*&filter[status][_eq]=published";

  filterIds.forEach((filterId, index) => {
    const deepFilter: string = `&filter[_or][${index}][postTags][tags_id][_in]=${filterId}`;
    url += deepFilter;
  });
  console.log(filterIds);

  try {
    const response: AxiosResponse<{ data: Post[] }> = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error("There was a problem with your Axios request:", error);
    throw error;
  }
}

export async function getSinglePost(postId: number): Promise<Post> {
  try {
    const url: string = `https://directus-10-10-4-p3ab.onrender.com/items/posts/${postId}`;
    const response: AxiosResponse<Post> = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("There was a problem with your Axios request:", error);
    throw error;
  }
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const url: string =
    "https://directus-10-10-4-p3ab.onrender.com/items/posts?fields=*.*&filter[featured][_eq]=true";
  try {
    const response: AxiosResponse<Post[]> = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("There was a problem with your Axios request:", error);
    throw error;
  }
}

export async function getTags(): Promise<Tag[]> {
  const url: string = "https://directus-10-10-4-p3ab.onrender.com/items/tags";
  try {
    const response: AxiosResponse<{ data: Tag[] }> = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error("There was a problem with your Axios request:", error);
    throw error;
  }
}
