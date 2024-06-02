import { FC, useEffect, useState } from "react"
import { Section, Select, Button, Placeholder, Textarea } from '@telegram-apps/telegram-ui';
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
    const [summary, setSummary] = useState<string>('');
    const [loading, setLoading] = useState(false);

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
        setLoading(true);
        try {
            console.log(projects);
            const response = await axios.post(
                `${BACKEND_ORIGIN}/start-work/`,
                { project: project },
                headers
            );
            console.log(response.data);
            setRecordId(response.data.record);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function stopWork(id: string) {
        setLoading(true);
        try {
            await axios.post(
                `${BACKEND_ORIGIN}/stop-work/${id}/`,
                { summary },
                headers);
            setRecordId(undefined);
            setSummary('');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Section header='You can pick a project and get to work'>
            {recordId
                ? <Textarea
                    placeholder="summary"
                    onChange={(e) => setSummary(e.target.value)}
                />
                : <Select
                    header="project"
                    onChange={(e) => setProject(+e.target.value)}
                >
                    <option value={undefined} key={'empty'}>---</option>
                    {projects?.map((project, id) => (
                        <option value={project.id} key={id}>{project.name}</option>
                    ))}
                </Select>
            }

            <Placeholder>
                {recordId
                    ? <Button
                        loading={loading}
                        onClick={() => stopWork(recordId)}
                        disabled={!summary}
                    >
                        Stop Work
                    </Button>
                    : <Button
                        loading={loading}
                        onClick={startWork}
                        disabled={!project}
                    >
                        Start Work
                    </Button>
                }
            </Placeholder>
        </Section>
    )
}