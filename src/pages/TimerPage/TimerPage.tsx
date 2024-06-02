import { FC, useEffect, useState } from "react"
import { Section, Select, Button, Placeholder, Textarea, LargeTitle } from '@telegram-apps/telegram-ui';
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

function convertNumber(num: number) {
    return num.toString().padStart(2, '0');
}

const EMPTY_TIMER = '--:--:--';


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

    const startWorkTime = useStore(state => state.startWorkTime);
    const setStartWorkTime = useStore(state => state.setStartWorkTime);
    const [timer, setTimer] = useState<string>(EMPTY_TIMER);

    useEffect(() => {
        if (!recordId) {
            return;
        }
        const interval = setInterval(() => {
            const time = startWorkTime ? Date.now() - startWorkTime : 0;
            // console.log(time);
            const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((time / 1000 / 60) % 60);
            const seconds = Math.floor((time / 1000) % 60);
            setTimer(`${convertNumber(hours)}:${convertNumber(minutes)}:${convertNumber(seconds)}`)
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [recordId])


    useGuard();
    async function startWork() {
        setLoading(true);
        try {
            console.log(projects);
            const response = await axios.post(
                `${BACKEND_ORIGIN}/start-work/`,
                { project },
                headers
            );
            setRecordId(response.data.record);
            setStartWorkTime(Date.now())
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
            setStartWorkTime(undefined)
            setTimer(EMPTY_TIMER);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Section header='You can pick a project and get to work'>
            {recordId && (<Placeholder>
                <LargeTitle
                    weight="1"
                >
                    {timer}
                </LargeTitle>
            </Placeholder>)}
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