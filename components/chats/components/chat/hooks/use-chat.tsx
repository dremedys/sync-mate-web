import { useAuth } from '@/providers/auth.provider';
import { sendMessage } from '@/services/chat';
import { GetMessageResponseDto } from '@/types/chat';
import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

export const useChat = (chatId = '', scroll: () => void) => {
  const { profile } = useAuth();
  const currentUserId = profile?.id;

  const [messages, setMessages] = useState<GetMessageResponseDto[]>([]);
  const [inputText, setInputText] = useState<string>();
  const socketUrl = 'wss://ssyncmmate.com/ws/chat/eb1f3164-e597-4dbb-8cb5-6bfbf32dc755/';
  const {
    sendJsonMessage,
    lastJsonMessage,
    sendMessage: ss,
    readyState,
  } = useWebSocket(socketUrl, {
    onMessage: (a: WebSocketEventMap['message']) => {
      console.log(a);
      console.log('message');
    },
    onOpen: () => {
      console.log('open?');
    },
    eventSourceOptions: {},
    protocols: '',
  });

  const isMyMessage = (id: string) => currentUserId === id;

  useEffect(() => {
    scroll();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText || inputText?.trim() === '') {
      setInputText(undefined);
      return;
    }
    try {
      sendMessage(chatId, inputText);
      const ra = generateRandomMessage();
      if (!profile) return;
      setMessages(prev => [
        ...prev,
        {
          ...ra,
          sender: { avatar: profile?.avatar, id: profile.id, display_name: profile?.full_name },
          text: inputText,
        },
      ]);
      setInputText(undefined);
    } catch (e) {
      console.log(e);
    }
  };

  return {
    handleSendMessage,
    messages,
    isMyMessage,
    inputText,
    setInputText,
  };
};

function generateRandomMessage(): GetMessageResponseDto {
  const id = Math.random().toString(36).substring(7);
  const createdAt = Date.now();
  const numWords = Math.floor(Math.random() * (10 - 2 + 1)) + 2;
  const words = [];
  for (let i = 0; i < numWords; i++) {
    const wordLength = Math.floor(Math.random() * (20 - 5 + 1)) + 5;
    const word = Array(wordLength)
      .fill(null)
      .map(() => String.fromCharCode(Math.floor(Math.random() * 26) + 97))
      .join('');
    words.push(word);
  }
  const text = words.join(' ');
  const senderNameLength = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
  const senderName = Array(senderNameLength)
    .fill(null)
    .map(() => String.fromCharCode(Math.floor(Math.random() * 26) + 97))
    .join('');
  const sender = {
    display_name: senderName,
    avatar: 'https://example.com/avatar.jpg',
    id: Math.random().toString(36).substring(7),
  };
  return { id, created_at: createdAt, text, sender };
}
