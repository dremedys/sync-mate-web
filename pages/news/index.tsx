import { FeedItem } from '@/components/feed-item/feed-item';
import { MainLayout } from '@/layout/main-layout/main-layout';
import { NextPageWithLayout } from '@/pages/_app';
import { Typography, styled } from '@mui/material';

export const NewsPage: NextPageWithLayout = () => {
  return (
    <Root className="container">
      <Typography variant="h3" mb="36px">
        News
      </Typography>
      <div>
        {items.map((item, idx) => (
          <FeedItem key={idx} {...item} />
        ))}
      </div>
    </Root>
  );
};

const Root = styled('div')(() => ({
  margin: '40px auto',
}));

const items = [
  {
    description: `We are glad to inform you that now on our website you can apply for teams on the subject of the project you are interested in. You may also notice that teams are searched even more easily now! How? By key terms!
    <br /><br /> You can also remove this team if you haven't found common interests, which will help you choose people for your project more specifically.<br />  <br />Come up with the name of your project, choose a suitable logo for your project and add a description of the people to add to your team.`,
    date: 'May 6, 2023',
    imgSrc: '/images/new1.png',
    width: 1192,
    height: 621,
  },
  {
    description: `Hello everyone! 
<br /><br />
We are here with the news about the added function of our website! 🔥
<br /><br />
Now you can log in to our website, specify the registration details and find people by spirit. Thanks to your interests indicated during registration, you can find the best match among teams and people. 
<br /><br />
Register, unite and embody!👥`,
    date: 'April 1, 2023',
    imgSrc: '/images/new2.png',
    width: 1913,
    height: 922,
  },
  {
    description: `We are happy to share exciting news about our new startup! Having come together with the goal of turning our dreams into reality, we have carefully developed an idea that we are sure will be an important breakthrough in the industry.
  <br /><br />
In the dynamic and rapidly changing world of entrepreneurship and innovation, we realized that there are a huge number of untapped opportunities and unresolved problems that need innovative solutions. This has become a source of inspiration for our team to create a startup that will transform these challenges into opportunities.
  <br /><br />
We have held many meetings and discussions to pinpoint our mission and goals. We strive to create an innovative solution that will solve current problems in the field of [specify area]. Our goal is to improve people's lives, increase business efficiency and make our world a better place.
  <br /><br />
Our team members are inspired by a passion for innovation, technology and creative thinking. We have combined our skills and experience in various fields to create a strong and cohesive team ready to overcome any challenges. We believe in the power of collaboration and collective intelligence, and strive to create a startup that will reflect these values.`,
    date: 'Feb 19, 2023',
    imgSrc: '/images/new3.png',
    width: 960,
    height: 1280,
  },
];

NewsPage.getLayout = page => <MainLayout>{page}</MainLayout>;
export default NewsPage;
