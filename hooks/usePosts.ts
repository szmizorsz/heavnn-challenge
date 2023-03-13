import { useState, useEffect } from "react";
import axios from "axios";
import { Post } from "@/types/customTypes";

export default function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get<Post[]>(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(res.data);
    };

    fetchPosts();
  }, []);

  return { posts };
}
