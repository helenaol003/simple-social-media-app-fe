import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../utils/AuthProvider";
import axios from "../utils/AxiosInstance";

type PostType = {
  title: string;
  content: string;
  imageUrl: string;
};

const fetchPostList = async (token: string | null) => {
  return await axios.get<PostType[]>("/api/post", {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const PostCard = ({ title, content, imageUrl }: PostType) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 mb-6 max-w-xl mx-auto">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-64 object-cover rounded-xl mb-4"
        />
      )}
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-700">{content}</p>
    </div>
  );
};

const Post = () => {
  const { getToken } = useAuth();
  const { data } = useQuery({
    queryKey: ["postList"],
    queryFn: () => fetchPostList(getToken())
  });
  return (
    <div className="space-y-6 p-4">
      {data?.data.map((post, index) => (
        <PostCard
          key={index}
          title={post.title}
          content={post.content}
          imageUrl={post.imageUrl}
        />
      ))}
    </div>
  );
};

export default Post;
