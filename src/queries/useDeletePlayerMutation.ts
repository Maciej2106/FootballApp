import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PlayerEntity } from '../types';
import { useApi } from '../api/useApi';

export const useDeletePlayerMutation = (playerId: string) => {
    const { apiDelete } = useApi();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ['players', 'delete', playerId],
        mutationFn: async () => {
            return apiDelete<PlayerEntity>(`players/${playerId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['players'],
            });
        },
    });

    return {
        mutate,
        isPending,
    };
};
