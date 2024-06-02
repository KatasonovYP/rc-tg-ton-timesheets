import { Section, Cell, Image, List } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

import { Link } from '@/components/Link/Link.tsx';

import tonSvg from './ton.svg';

import './IndexPage.css';
import { useStore } from '@/store/store';

interface Tab {
  to: string;
  title: string;
  subtitle: string;
  isAuth?: boolean;
  isStaff?: boolean;
}

const tabs: Tab[] = [
  {
    to: '/auth/login',
    title: 'Auth',
    subtitle: 'timesheets login',
    isAuth: false,
  },
  {
    to: '/timer',
    title: 'Timer',
    subtitle: "Let's get to work!",
    isAuth: true,
  },
  {
    to: '/owed',
    title: 'Owed',
    subtitle: 'list of owed',
    isAuth: true,
    isStaff: true,
  },
  {
    to: '/balance',
    title: 'Balance',
    subtitle: 'Check your balance',
    isAuth: true,
  },
  {
    to: '/profile',
    title: 'Profile',
    subtitle: 'Check your profile',
    isAuth: true,
  },
  // {
  //   to: '/init-data',
  //   title: 'User data, chat information, technical data',
  //   subtitle: 'Init Data',
  // },
]

export const IndexPage: FC = () => {
  const isAuth = useStore(state => state.isAuth);
  const isStaff = useStore(state => state.isStaff);
  return (
    <List>
      <Section
        header='Features'
        footer='app navigation'
      >
        <Link to='/ton-connect'>
          <Cell
            before={<Image src={tonSvg} style={{ backgroundColor: '#007AFF' }} />}
            subtitle='Connect your TON wallet'
          >
            TON Connect
          </Cell>
        </Link>
      </Section>
      <Section
        header='Application Launch Data'
        footer='vidicode (c) 2024'
      >
        {tabs.map((tab, id) => {
          if (tab.isAuth !== undefined && isAuth() !== tab.isAuth) {
            return null;
          }
          if (tab.isStaff !== undefined && isStaff() !== tab.isStaff) {
            return null;
          }

          return (
            <Link key={id} to={tab.to}>
              <Cell subtitle={tab.subtitle}>{tab.title}</Cell>
            </Link>
          )
        })
        }
        {/* <Link to='/launch-params'>
          <Cell subtitle='Platform identifier, Mini Apps version, etc.'>Launch Parameters</Cell>
        </Link>
        <Link to='/theme-params'>
          <Cell subtitle='Telegram application palette information'>Theme Parameters</Cell>
        </Link> */}
      </Section>
    </List>
  );
};
