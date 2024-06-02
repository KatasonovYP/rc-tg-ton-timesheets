import { FC, useEffect, useState } from "react"
import { Section, Placeholder, Spinner, LargeTitle } from '@telegram-apps/telegram-ui';
import { useGuard } from "@/utils/hooks/useGuard";
import axios from "axios";
import { BACKEND_ORIGIN } from "@/config/const";
import { useAuthHeader } from "@/utils/hooks/useAuthHeader";


export const BalancePage: FC = () => {
    const headers = useAuthHeader();
    useGuard();

    const [balance, setBalance] = useState<number>();

    async function getOwedEmployee() {
        try {
            const response = await axios.get(`${BACKEND_ORIGIN}/balance/`, headers)
            console.log(response.data);
            setBalance(response.data.owed);
            // setOwed(mockOwed);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getOwedEmployee()
    }, [])

    return (
        <Section header='Your Balance'>
            <Placeholder>
                {balance !== undefined && (
                    <LargeTitle weight="1">
                        ${balance}
                    </LargeTitle>
                )}
                {balance === undefined && <Spinner size={"l"} />}
            </Placeholder>
        </Section>
    )
}