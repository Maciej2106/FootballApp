import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TeamEntity, TeamEntityDto } from '../types';
import { useApi } from '../api/useApi';

export const useCreateTeamMutation = () => {
    const { apiPost } = useApi();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ['teams', 'create'],
        mutationFn: async (payload: TeamEntityDto) => {
            return apiPost<TeamEntity, TeamEntityDto>('teams', payload);
        },
        onSuccess: () => [
            queryClient.invalidateQueries({
                queryKey: ['teams'],
            }),
        ],
    });

    return {
        mutate,
        isPending,
    };
};
