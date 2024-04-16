import axios, { type AxiosResponse } from "axios";

interface Post {
  id?: number;
  content: string;
  autor: string;
  status?: string;
  postTags: Tag[];
}

interface Tag {
  id: number;
  // Agrega aquí cualquier otra propiedad que necesites
}

export async function postPost(
  content: string,
  autor: string,
  tagIds: number[],
  status?: string
): Promise<void> {
  const url: string = "https://directus-10-10-4-p3ab.onrender.com/items/posts";
  const tags: Tag[] = tagIds.map((id) => ({ id }));
  const data: Post = {
    content,
    autor,
    postTags: tags,
    status,
  };

  try {
    const response: AxiosResponse<Post> = await axios.post(url, data);
    console.log("Data posted successfully:", response.data);
  } catch (error) {
    console.error("There was a problem with your Axios request:", error);
  }
}

export async function updatePost(
  postId: number,
  content: string,
  autor: string,
  tagIds: number[],
  status?: string
): Promise<void> {
  const url: string = `https://directus-10-10-4-p3ab.onrender.com/items/posts/${postId}`;
  const tags: Tag[] = tagIds.map((id) => ({ id }));
  const data: Post = {
    content,
    autor,
    postTags: tags,
    status,
  };

  try {
    const response: AxiosResponse<Post> = await axios.patch(url, data);
    console.log("Post updated successfully:", response.data);
  } catch (error) {
    console.error("There was a problem with your Axios request:", error);
  }
}

interface Filter {
  tagId: number;
  // Agrega aquí cualquier otra propiedad que necesites para los filtros
}

export async function getPosts(filters: Filter[]): Promise<Post[]> {
  let url: string =
    "https://directus-10-10-4-p3ab.onrender.com/items/posts?fields=*.*,postTags.tags_id.*&filter[status][_eq]=published";

  filters.forEach((filter, index) => {
    const deepFilter: string = `&filter[_or][${index}][postTags][tags_id][_in]=${filter.tagId}`;
    url += deepFilter;
  });

  try {
    const response: AxiosResponse<{ data: Post[] }> = await axios.get(url);
    response.data.data.forEach((post) => {
      console.log(post.postTags);
    });
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
    console.log("Post retrieved successfully:", response.data);
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
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("There was a problem with your Axios request:", error);
    throw error;
  }
}
