import { useQuery } from '@tanstack/react-query';
import { PlayerEntity } from '../types';
import { useApi } from '../api/useApi';

export const useGetPlayersQuery = () => {
    const { apiGet } = useApi();

    const { data, isFetched } = useQuery<PlayerEntity[]>({
        queryKey: ['players'],
        queryFn: async () => {
            return apiGet<PlayerEntity[]>('players');
        },
    });

    return { data, isFetched };
};
