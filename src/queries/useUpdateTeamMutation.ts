import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TeamEntity, TeamEntityDto } from '../types';
import { useApi } from '../api/useApi';

export const useUpadteTeamMutation = (teamID: string) => {
    const { apiPut } = useApi();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ['teams', 'update', teamID],
        mutationFn: async (payload: TeamEntityDto) => {
            return apiPut<TeamEntity, TeamEntityDto>(
                `teams/${teamID}`,
                payload,
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['teams'],
            });
        },
    });

    return {
        mutate,
        isPending,
    };
};
