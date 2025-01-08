import { useQuery } from "@tanstack/react-query";
import { GameListEntity } from "../types";
import { useApi } from "../api/useApi";

export const useGetGameListQuery = () => {
  const { apiGet } = useApi();

  const { data, isFetched } = useQuery<GameListEntity[]>({
    queryKey: ["games"],
    queryFn: async () => {
      return apiGet<GameListEntity[]>("games");
    },
  });

  return { data, isFetched };
};
