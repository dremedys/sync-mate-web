import { useChat } from '@/components/chats/components/chat/hooks/use-chat';
import { GetChatTeamResponseDto } from '@/types/team';
import { AlternateEmail, MoreVert, Send, SentimentSatisfiedAlt } from '@mui/icons-material';
import { Avatar, Box, IconButton, Typography, styled } from '@mui/material';
import { format } from 'date-fns';
import { FC, useRef } from 'react';

type Props = {
  id?: string;
  team?: GetChatTeamResponseDto;
};
const VISIBLE_AVATAR_COUNT = 4;

export const Chat: FC<Props> = ({ id, team }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
  };

  const { handleSendMessage, messages, isMyMessage, setInputText, inputText } = useChat(id, scrollToBottom);

  return (
    <Root>
      <Header>
        {team && (
          <People>
            {team.members?.slice(0, VISIBLE_AVATAR_COUNT).map((url, index) => (
              <MemberAvatar
                key={url.id}
                $order={index + 1}
                $n={Math.min(VISIBLE_AVATAR_COUNT, team.members.length)}
                src={url.avatar}
              />
            ))}
            {team?.members.length > VISIBLE_AVATAR_COUNT && (
              <MemberPlus>+{team.members.length - VISIBLE_AVATAR_COUNT}</MemberPlus>
            )}
          </People>
        )}
        <Box>
          <Title>{team?.name}</Title>
        </Box>
        <IconButton>
          <MoreVert />
        </IconButton>
      </Header>
      <Main>
        {messages.map(message => {
          const isMine = isMyMessage(message.id);
          const formattedTime = format(new Date(message.created_at), 'HH:MM');
          return (
            <Box key={message.id} display="flex">
              {!isMine && <SenderAvatar src={message.sender.avatar} />}
              <ChatItem isMine={isMine}>
                {!isMine && <Sender>{message.sender.display_name}</Sender>}
                <Text>{message.text}</Text>
                <Time isMine={isMine}>{formattedTime}</Time>
              </ChatItem>
            </Box>
          );
        })}
        <div ref={messagesEndRef} />
      </Main>
      <Bottom>
        <SentimentSatisfiedAlt />
        <Input
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') handleSendMessage();
          }}
          placeholder="Start typing..."
        />
        <Box display="flex" alignItems="center" columnGap="16px">
          <AlternateEmail />
          <IconButton onClick={handleSendMessage}>
            <Send />
          </IconButton>
        </Box>
      </Bottom>
    </Root>
  );
};

const Root = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  borderRight: '1px solid #E5E5EA',
  borderBottom: '1px solid #E5E5EA',
  height: '100%',
}));

const Header = styled('div')(() => ({
  height: '70px',
  padding: '15px 24px',
  borderBottom: '1px solid #E5E5EA',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Title = styled(Typography)(({ theme }) => ({
  ...theme.typography.titleSmall,
  marginBottom: '4px',
}));

const People = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const Main = styled('div')(() => ({
  // flex: '1 auto',
  flex: '1 1 0px',
  borderBottom: '1px solid #E5E5EA',
  padding: '14px 16px',
  overflow: 'auto',
  // height: '100%',
  height: '100%',
  position: 'relative',
}));

const Bottom = styled('div')(() => ({
  height: '48px',
  padding: '0 24px',
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'space-between',
  '& svg, & div': {
    alignSelf: 'center',
  },
}));

const Input = styled('input')(() => ({
  flex: 1,
  padding: '-16px 0',
  alignSelf: 'stretch',
  border: 'none',
}));

type ChatItemProps = {
  isMine: boolean;
};

const ChatItem = styled('div')<ChatItemProps>(({ isMine }) => ({
  padding: '4px 8px',
  color: isMine ? 'white' : 'black',
  background: isMine ? 'blue' : '#F2F2F7',
  marginLeft: isMine ? 'auto' : 0,
  marginRight: isMine ? '0' : 'auto',
  maxWidth: '50%',
  display: 'inline-block',
  borderRadius: '6px',
  marginBottom: '6px',
}));

const Sender = styled(Typography)(({ theme }) => ({
  ...theme.typography.bodySmall,
  marginBottom: '4px',
}));

const Text = styled('span')(({ theme }) => ({
  ...theme.typography.bodySmall,
  wordBreak: 'break-word',
}));

const Time = styled(Typography)<ChatItemProps>(({ isMine, theme }) => ({
  ...theme.typography.bodySmall,
  color: isMine ? 'white' : '#666668',
  marginLeft: 'auto',
}));

type AvatarProps = {
  $order: number;
  $n: number;
};

const MemberAvatar = styled(Avatar)<AvatarProps>(({ $n, $order }) => ({
  width: '24px',
  height: '24px',
  display: 'inline',
  transform: `translateX(${($n - $order) * 10}px)`,
}));

const MemberPlus = styled('div')(() => ({
  width: '24px',
  height: '24px',
  transform: 'translateX(-10px)',
  background: '#F2F2F7',
  color: 'black',
  textAlign: 'center',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
}));

const SenderAvatar = styled(Avatar)(({ theme }) => ({
  width: '32px',
  height: '32px',
  marginRight: '12px',
  display: 'inline-flex',
}));
