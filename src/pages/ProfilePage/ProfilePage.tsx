import { FC } from "react"
import { Section, Cell, Button, Placeholder } from '@telegram-apps/telegram-ui';
import { useStore } from "@/store/store";
import { useGuard } from "@/utils/hooks/useGuard";


export const ProfilePage: FC = () => {
    const username = useStore(state => state.username);
    const email = useStore(state => state.email);
    const logout = useStore(state => state.logout);

    useGuard();

    return (
        <Section>
            <Cell
                className='display-data__line'
                subhead={'Email'}
                readOnly
                multiline={true}
            >
                <span className='display-data__line-value'>
                    {email ?? 'unknown email'}
                </span>
            </Cell>

            <Cell
                className='display-data__line'
                subhead={'Name'}
                readOnly
                multiline={true}
            >
                <span className='display-data__line-value'>
                    {username ?? 'unknown user'}
                </span>
            </Cell>

            <Placeholder>
                <Button
                    onClick={logout}
                    size={'m'}
                    mode='bezeled'
                    stretched
                >
                    Log Out
                </Button>
            </Placeholder>
        </Section>
    )
}