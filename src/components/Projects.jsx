import React, { useEffect, useState } from "react";
import { COLORS } from '../theme';
import { useProjectsStore } from '../store/projectsStore';
import ProjectCard from './projects/ProjectCard';

const CATEGORIES = ['Web', 'Games', 'Showcase'];

function Projects({ darkMode }) {
    const { selectedTab, setSelectedTab } = useProjectsStore();
    const [projects, setProjects] = useState([]);

    const bgColor = darkMode ? COLORS.darkGradientEnd : COLORS.background;
    const textColor = darkMode ? COLORS.background : COLORS.text;

    useEffect(() => {
        fetch("/data/projects.json")
            .then((res) => res.json())
            .then((data) => setProjects(data))
            .catch((err) => console.error("Error loading projects:", err));
        }, []);


    const filteredProjects = projects.filter((project) => project.category === selectedTab);

    return (
        <section 
            id="projects"
            className="min-h-screen py-12 px-6 md:px-20 transition-colors duration-500"
            style={{ backgroundColor: bgColor, color: textColor }} 
        >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Featured Projects</h2>
            <div className="flex flex-col md:flex-row">
                {/* Tabs */}
                <div className="flex md:flex-col gap-4 mb-6 md:mb-0 md:mr-8">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedTab(category)}
                            style={{backgroundColor: selectedTab === category ? COLORS.primary : "transparent",
                                color: selectedTab === category ? "white" : darkMode
                                ? "#F8F8F8"
                                : "#616063",
                            }}
                            className="px-4 py-2 rounded-md font-semibold transition-colors duration-300"
                            >
                            {category}
                            </button>
                    ))}
                </div>
                {/* Projects Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} darkMode={darkMode} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Projects;
