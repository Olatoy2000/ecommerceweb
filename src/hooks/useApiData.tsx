import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";

type QueryResult<Data> = UseQueryResult<Data, Error>;

export function useApiData<Data>(
  endpointUrl: string,
  key: string
): QueryResult<Data> {
  return useQuery<Data, Error>(key, async () => {
    const response = await axios.get<Data>(endpointUrl);
    console.log(response.data);
    return response.data;
  });
}
// useage
// interface Post {
//   id: number;
//   title: string;
// }

// const { data, isLoading, error } = useApiData<Post[]>(
//   "https://api.example.com/posts",
//   "posts"
// );
