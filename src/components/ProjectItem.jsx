import React, { useEffect, useState } from "react";
import { db } from "./firebase.jsx";
import Project from "./Project.jsx"; // Project コンポーネントをインポート

export const ProjectItem = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        db.collection("project")
        .orderBy("appointed_day_of_delivery","desc")
        .onSnapshot((snapShot) => {
            setProjects(snapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })));
        }, (error) => {
            console.error("Error fetching Project:", error);
        });
    },[]);

    return (
        <>
            {projects.map((project) => (
                <Project key={project.id} {...project} />
            ))}
        </>
    );
};