import { useState } from "react";
import { COLORS } from "../../theme";
import GenericButton from "../buttons/GenericButton";
import ProjectModal from "./ProjectModal";

function ProjectCard({ project, darkMode }) {
    const [open, setOpen] = useState(false);
     const bgColor = darkMode ? COLORS.darkCardBackground : COLORS.background;

    return (
        <>
            {/* Card */}
            <div
                key={project.id}
                className="rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300"
                style={{ backgroundColor: bgColor }} 
            >
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                />
                <div
                    className={`px-4 py-3 border-t-2 ${
                        project.category === "Web"
                            ? "border-stone-400"
                            : project.category === "Games"
                            ? "border-purple-500"
                            : "border-sky-500"
                    }`}
                >
                    <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
                    <p className="text-sm mb-2" dangerouslySetInnerHTML={{ __html: project.description }}></p>
                    <GenericButton
                        onClick={() => setOpen(true)}
                        className="text-white flex items-center gap-2"
                        style={{ backgroundColor: COLORS.secondary }}
                    >
                        View More
                    </GenericButton>
                </div>
            </div>

            {/* Modal */}
            {open && (
                <ProjectModal 
                    project={project}
                    darkMode={darkMode}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    );
}

export default ProjectCard;