import { PaginatedResponseDto } from '@/types/tag';
import { GetChatTeamResponseDto } from '@/types/team';

export type GetMessageResponseDto = {
  id: string;
  created_at: number;
  // updated_at: string;
  text: string;
  sender: {
    display_name: string;
    avatar: string;
    id: string;
  };
};

export type GetChatResponseDto = {
  id: string;
  last_message?: GetMessageResponseDto;
  team: GetChatTeamResponseDto;
};

export type GetChatsResponseDto = PaginatedResponseDto<GetChatResponseDto>;
