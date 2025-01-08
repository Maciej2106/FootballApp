import { useQuery } from "@tanstack/react-query";
import { TeamEntity } from "../types";
import { useApi } from "../api/useApi";

export const useGetTeamQuery = () => {
  const { apiGet } = useApi();

  const { data, isFetched } = useQuery<TeamEntity[]>({
    queryKey: ["teams"],
    queryFn: async () => {
      return apiGet<TeamEntity[]>("teams");
    },
  });

  return { data, isFetched };
};
