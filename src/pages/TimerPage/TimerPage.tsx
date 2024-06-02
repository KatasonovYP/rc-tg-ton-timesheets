import { FC, useEffect, useState } from "react"
import {Section, Select, Button, Placeholder } from '@telegram-apps/telegram-ui';
import { useStore } from "@/store/store";
import { useGuard } from "@/utils/hooks/useGuard";
import axios from "axios";
import { BACKEND_ORIGIN } from "@/config/const";
import { useAuthHeader } from "@/utils/hooks/useAuthHeader";

interface Project {
    id: number;
    name: string;
    description: string;
}


export const TimerPage: FC = () => {
    const recordId = useStore(state => state.recordId);
    const setRecordId = useStore(state => state.setRecordId);
    const headers = useAuthHeader();
    const [projects, setProjects] = useState<Project[]>();
    const [project, setProject] = useState<number>();

    async function getProjects() {
        try {
            const response = await axios.get(
                `${BACKEND_ORIGIN}/projects/`,
                headers
            );
            setProjects(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getProjects();
    }, []);


    useGuard();
    async function startWork() {
        try {
            console.log(projects);
            const response = await axios.post(
                `${BACKEND_ORIGIN}/start-work/`,
                { project: project },
                headers
            );
            console.log(response.data);
            setRecordId(response.data.recordId);
        } catch (error) {
            console.error(error);
        }
    }

    async function endWork(id: string) {
        try {
            await axios.post(`${BACKEND_ORIGIN}/end-work/${id}/`, {}, headers);
            setRecordId(undefined);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Section header='You can pick a project and get to work'>
            <Select header="project" onChange={(e) => setProject(+e.target.value)}>
                <option value={undefined} key={0}>---</option>
                {projects?.map((project, id) => (<option value={project.id} key={id}>{project.name}</option>))}
            </Select>
        <Placeholder>
            {recordId
                ? <Button onClick={() => endWork(recordId)}>End Work</Button>
                : <Button onClick={startWork} disabled={!project}>Start Work</Button>
            }
        </Placeholder>
        </Section>
    )
}