import { Section, Input, Button, Placeholder } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useStore } from '@/store/store'
import { BACKEND_ORIGIN } from '@/config/const';
import { useNavigate } from 'react-router-dom';
import cls from './LoginPage.module.css';

interface LoginPageValues {
    username: string;
    password: string;
}

export const LoginPage: FC = () => {
    const { register, handleSubmit, setValue } = useForm<LoginPageValues>();
    const setToken = useStore(state => state.setToken);
    const setUsername = useStore(state => state.setUsername);
    const setEmail = useStore(state => state.setEmail);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        register("username", { required: true })
        register("password", { required: true })
    }, [])

    async function onAction(data: LoginPageValues) {
        setLoading(true)
        try {
            const response = await axios.post(`${BACKEND_ORIGIN}/token/`, data);
            setToken(response.data.token);
            setUsername(response.data.username);
            setEmail(data.username);
            navigate('/');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onAction)} className={cls.form}>
            <Section header='enter login and password for w3id.io'>
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
                    type='password'
                    onChange={(event) => {
                        setValue("password", event.target.value)
                    }}
                />
                <Placeholder>
                    <Button
                        type='submit'
                        size={'m'}
                        stretched
                        loading={loading}
                    >
                        login
                    </Button>
                </Placeholder>
            </Section>


        </form>
    )
}