import { styled } from '@mui/material';

type IFeat = {
  title: string;
  description: string;
};
const feats: IFeat[] = [
  {
    title: 'Удобство заказа ',
    description:
      'С помощью DariCare вы можете заказывать лекарства и витамины в любое время, не выходя из дома. Мы доставим заказ прямо к вашей двери в удобное для вас время.',
  },
  {
    title: 'Персонализированный подбор',
    description:
      'DariCare использует технологию искусственного интеллекта и анализа данных, чтобы создать профиль вашего здоровья и рекомендовать наиболее подходящие витамины и лекарства, учитывая ваши потребности и особенности организма.',
  },
  {
    title: 'Безопасность и надежность ',
    description:
      'Мы работаем только с лучшими производителями и поставщиками, чтобы гарантировать качество и подлинность нашей продукции. Мы также обеспечиваем строгий контроль качества, чтобы убедиться, что каждый продукт соответствует высоким стандартам.',
  },
];

export const Feats = () => {
  return (
    <Section className="container">
      <List>
        {feats.map(({ title, description }, idx) => (
          <Item key={title}>
            <Left>
              <img width={500} src={`/images/feat-${idx + 1}.png`} />
            </Left>
            <Right>
              <Title>{title}</Title>
              <Description>{description}</Description>
            </Right>
          </Item>
        ))}
      </List>
    </Section>
  );
};

const Section = styled('section')`
  margin-bottom: 135px;
  ${props => props.theme.breakpoints.down('md')} {
    margin-bottom: 80px;
  }
`;

const List = styled('ul')``;

const Item = styled('li')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 70px;

  &:nth-last-of-type(1) {
    margin-bottom: 0;
  }

  &:nth-of-type(even) {
    flex-direction: row-reverse;
  }
  ${props => props.theme.breakpoints.down('md')} {
    margin-bottom: 40px;
    flex-direction: column;
    justify-content: center;
    &:nth-of-type(even) {
      flex-direction: column;
    }
  }
`;

const IconWrap = styled('div')`
  transform: translateX(-30px);
  ${props => props.theme.breakpoints.down('md')} {
    margin: 0 auto;
    transform: translateX(0);
    display: none;
  }
`;

const Left = styled('div')`
  width: 37%;
  img {
    width: 100%;
    display: inline-block;
    max-width: 570px;
    transform: translateX(-60px);
  }
  ${props => props.theme.breakpoints.down('md')} {
    width: 100%;
    margin-bottom: 40px;
    img {
      transform: none;
      display: block;
      margin: 0 auto;
    }
  }
`;

const Right = styled('div')`
  width: 45%;
  color: #383942;
  ${props => props.theme.breakpoints.down('md')} {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Title = styled('h4')`
  max-width: 90%;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 600;
  line-height: 36px;
  ${props => props.theme.breakpoints.down('md')} {
    margin-bottom: 16px;
    max-width: unset;
    font-size: 24px;
    font-weight: 600;
    line-height: 26px;
    text-align: center;
  }
`;

const Description = styled('p')`
  max-width: 80%;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  color: #6d6e85;

  ${props => props.theme.breakpoints.down('md')} {
    max-width: unset;
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    text-align: center;
  }
`;
