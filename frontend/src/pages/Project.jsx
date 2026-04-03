import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { projectClient } from "../clients/api";

const Project = () => {
    const { id } = useParams();

    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data } = await projectClient.get(`/${id}`);
                setProject(data);
                setTasks(data.tasks || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [id]);

    if (loading) return <p>Loading project...</p>;

    if (!project) return <p>Project not found</p>;

    return (
        <div>
            <h1>{project.name}</h1>
            <p>{project.description}</p>

            <h2>Tasks</h2>

            {tasks.length === 0 ? (
                <p>No tasks yet</p>
            ) : (
                tasks.map((task) => (
                    <div key={task._id}>
                        <h4>{task.title}</h4>
                        <p>{task.status}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Project;