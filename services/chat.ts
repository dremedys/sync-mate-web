import { client } from '@/services/client';
import { GetChatResponseDto } from '@/types/chat';

export const sendMessage = (chat: string, text: string) => {
  return client.post('/chats/send-message/', { chat, text });
};

export const getChats = (page: number) => {
  return client.get<GetChatResponseDto[]>(`/chats/`, { params: { page } });
};
