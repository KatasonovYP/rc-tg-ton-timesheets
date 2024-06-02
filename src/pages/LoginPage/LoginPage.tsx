import { Section, Input, Button } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {useStore} from '@/store/store'

interface LoginPageValues {
    username: string;
    password: string;
}

export const LoginPage: FC = () => {
    const { register, handleSubmit, setValue } = useForm<LoginPageValues>();
    const setToken = useStore(state => state.setToken);

    useEffect(() => {
        register("username", { required: true })
        register("password", { required: true })
    }, [])

    async function onAction(data: LoginPageValues) {
        console.log(data);
        try {
            const response = axios.post('http://w3id.io:33333/api/token/', data);
            console.log(response);
            setToken('23');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Section>
            <form onSubmit={handleSubmit(onAction)}>
                <Input
                    placeholder='username'
                    name="username"
                    onChange={(event) => {
                        setValue("username", event.target.value)
                    }}
                />
                <Input
                    placeholder='password'
                    name="password"
                    onChange={(event) => {
                        setValue("password", event.target.value)
                    }}
                />
                <Button type='submit'>login</Button>
            </form>
        </Section>
    )
}