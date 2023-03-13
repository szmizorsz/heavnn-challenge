import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "@/types/customTypes";

export default function useUsers() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get<User[]>(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(res.data);
    };

    fetchPosts();
  }, []);

  return { users };
}
