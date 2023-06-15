import { Chat } from '@/components/chats/components/chat/chat';
import { Sidebar } from '@/components/chats/components/sidebar/sidebar';
import { TeamInfo } from '@/components/chats/components/team-info/team-info';
import { getChats } from '@/services/chat';
import { GetChatResponseDto } from '@/types/chat';
import { styled } from '@mui/material';
import { useState } from 'react';
import { useQuery } from 'react-query';

export const Chats = () => {
  const [activeChat, setActiveChat] = useState<GetChatResponseDto>();

  const { data: chats } = useQuery(['chats'], async () => {
    try {
      const { data } = await getChats(100);
      data?.length && setActiveChat(data[0]);
      return data;
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <Root className="container">
      <Sidebar onSelectChat={setActiveChat} chats={chats} activeChat={activeChat} />
      <Chat id={activeChat?.id} team={activeChat?.team} />
      <TeamInfo team={activeChat?.team} />
    </Root>
  );
};

const Root = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: '25% 50% 25%',
  marginTop: '40px',
  height: '70vh',
  borderTop: '1px solid #E5E5EA',
  marginBottom: '36px',
}));
