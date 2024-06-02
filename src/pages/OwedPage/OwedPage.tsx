import { useEffect, useState, type FC } from 'react';
import { List, Section, Cell, Spinner, Placeholder } from '@telegram-apps/telegram-ui';

import axios from 'axios';
import { BACKEND_ORIGIN } from '@/config/const';
import { useGuard } from '@/utils/hooks/useGuard';
import { useAuthHeader } from '@/utils/hooks/useAuthHeader';

interface Employee {
    worker: string;
    address: string;
    owed: number;
}

export const OwedPage: FC = () => {
    const [owed, setOwed] = useState<Employee[]>();
    useGuard();
    const headers = useAuthHeader();

    async function getOwed() {
        try {
            const response = await axios.get(`${BACKEND_ORIGIN}/owed/`, headers)
            console.log(response.data);
            setOwed(response.data);
            // setOwed(mockOwed);
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        getOwed()
    }, [])

    if (owed === undefined) {
        return (
            <Placeholder>
                <Spinner size={'l'} />
            </Placeholder>
        )
    }

    if (owed.length === 0) {
        return (
            <div>
                <Placeholder
                    header="All the bills are paid!"
                    description="New ones will arrive at the end of the sprint"
                >
                    <img
                        alt="Telegram sticker"
                        width={'128'}
                        src="https://xelene.me/telegram.gif"
                    />
                </Placeholder>
            </div>
        )
    }

    return (
        <List>
            {owed.map((employee, id) => (
                <Section key={id} header={employee.worker}>
                    <Cell
                        className='display-data__line'
                        subhead={'address'}
                        readOnly
                        multiline={true}
                    >
                        <span className='display-data__line-value'>
                            {employee.address}
                        </span>
                    </Cell>
                    <Cell
                        className='display-data__line'
                        subhead={'owed'}
                        readOnly
                        multiline={true}
                        key={id}
                    >
                        <span className='display-data__line-value'>
                            ${employee.owed}
                        </span>
                    </Cell>
                </Section>
            ))}
        </List>
    )
};
