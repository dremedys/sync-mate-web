import { GetChatResponseDto } from '@/types/chat';
import { Typography, styled } from '@mui/material';
import { FC } from 'react';

type Props = {
  onSelectChat: (chat: GetChatResponseDto) => void;
  activeChat?: GetChatResponseDto;
  chats?: GetChatResponseDto[];
};
export const Sidebar: FC<Props> = ({ onSelectChat, activeChat, chats }) => {
  const sx = {
    background: '#D4E4FA',
  };

  return (
    <Root>
      <Header>
        <Title>Chat</Title>
      </Header>
      <Main>
        {chats?.map(chat => {
          const isActive = chat.id === activeChat?.id;
          console.log(chat.id);
          console.log(activeChat?.id);
          return (
            <PreviewItem onClick={() => onSelectChat(chat)} key={chat.id} style={isActive ? sx : {}}>
              <PreviewTitle>{chat.team.name}</PreviewTitle>
              <PreviewText>
                {chat.last_message ? (
                  <>
                    {chat.last_message?.sender.display_name} : {chat?.last_message?.text}
                  </>
                ) : (
                  <span>Team created!</span>
                )}
              </PreviewText>
            </PreviewItem>
          );
        })}
      </Main>
    </Root>
  );
};

const Root = styled('div')(() => ({
  borderRight: '1px solid #E5E5EA',
  color: '#212121',
}));

const Header = styled('div')(() => ({
  height: '70px',
  padding: '15px 0',
  borderBottom: '1px solid #E5E5EA',
}));

const Title = styled(Typography)(({ theme }) => ({
  ...theme.typography.headlineLarge,
}));

const Main = styled('main')(() => ({
  padding: '10px 0px',
  paddingRight: '10px',
}));

const PreviewItem = styled('div')(() => ({
  padding: '10px',
  borderRadius: '12px',
}));

const PreviewTitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.titleSmall,
  marginBottom: '12px',
}));

const PreviewText = styled(Typography)(({ theme }) => ({
  ...theme.typography.bodySmall,
  color: '#6B6B6B',
}));
