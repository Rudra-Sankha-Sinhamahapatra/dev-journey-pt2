import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const init = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return response.data;
  } catch (error: any) {
    console.error("Something went wrong while fetching posts:", error);
    throw error;
  }
};

export const Posts = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<Posts[]>({
    queryKey: ["posts"],
    queryFn: init,
    refetchInterval:10*1000
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  const handlePrefetch = async () => {
    await queryClient.prefetchQuery({
      queryKey: ["posts"],
      queryFn: init,
    });
  };

  return (
    <>
      <button onClick={handlePrefetch}>Prefetch Posts</button>
      {data?.map((post: Posts) => (
        <div key={post.id}>
          <br />
          <div>userId: {post.userId}</div>
          <div>id: {post.id}</div>
          <div>title: {post.title}</div>
          <div>body: {post.body}</div>
          <hr />
        </div>
      ))}
    </>
  );
};
