import { Section, Cell, Image, List } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

import { Link } from '@/components/Link/Link.tsx';

import tonSvg from './ton.svg';

import './IndexPage.css';
import { useStore } from '@/store/store';

interface Tab {
  to: string;
  title: string;
  subtle: string;
}

const protectedTabs: Tab[] = [
  {
    to: '/profile',
    title: 'Profile',
    subtle: 'Check your profile',
  },
  {
    to: '/owed',
    title: 'Owed',
    subtle: 'list of owed',
  },
  {
    to: '/timer',
    title: 'Timer',
    subtle: "Let's get to work!",
  },
]

const publicTabs: Tab[] = [
  {
    to: '/auth/login',
    title: 'Auth',
    subtle: 'timesheets login',
  },
  {
    to: '/init-data',
    title: 'User data, chat information, technical data',
    subtle: 'Init Data',
  },
]

export const IndexPage: FC = () => {
  const isAuth = useStore(state => state.isAuth);
  const tabs = isAuth() ? protectedTabs : publicTabs;
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
        {tabs.map(({ to, title, subtle }, id) => (
          <Link key={id} to={to}>
            <Cell subtitle={subtle}>{title}</Cell>
          </Link>))
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
