import { Chats } from '@/components/chats/chats';
import { MainLayout } from '@/layout/main-layout/main-layout';
import { NextPageWithLayout } from '@/pages/_app';
export const Messages: NextPageWithLayout = () => {
  return <Chats />;
};

Messages.getLayout = page => <MainLayout>{page}</MainLayout>;

export default Messages;
