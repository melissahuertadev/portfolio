import { useState } from "react";
import { COLORS } from "../theme";
import { FaGlobe, FaGithub, FaYoutube, FaBook } from "react-icons/fa";
import GenericButton from "./botones/GenericButton";

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
                            ? "border-stone-500"
                            : project.category === "Games"
                            ? "border-purple-500"
                            : "border-sky-500"
                    }`}
                >
                    <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
                    <p className="text-sm mb-2" dangerouslySetInnerHTML={{ __html: project.description }}></p>
                    <GenericButton
                        onClick={() => setOpen(true)}
                        className="text-sm font-semibold bg-[#3B5BDB] hover:underline"
                    >
                        View More
                    </GenericButton>
                </div>
            </div>

            {/* Modal */}
            {open && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                   <div className="bg-white dark:bg-[#2A2A3A] rounded-lg max-w-2xl w-full p-6 relative">
                    {/* Close Button */}
                    <button
                        onClick={() => setOpen(false)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    >
                        x
                    </button>
                    {/* Title */}
                    <h2 className="text-xl font-bold mb-3">{project.title}</h2>

                    {/* Content */}
                    <div className="mb-4">
                        {/* For Showcase, embed YouTube */}
                        {project.category === "Showcase" ? (
                            <iframe
                            className="w-full h-64 rounded"
                            src={project.link}
                            title={project.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            />
                        ) : (
                            <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-64 object-cover rounded"
                            />
                        )}
                    </div>
                    {/* Long description */}
                    <div
                        className="text-sm mb-4"
                        dangerouslySetInnerHTML={{ __html: project.long_description }}
                    />
                    {/* Buttons */}
                    <div className="flex gap-3">
                        {project.category === "Showcase" ? (
                            <>
                            <p>
                                </p>
                                <GenericButton
                                    onClick={() => window.open(project.link, "_blank")}
                                    className="bg-[#3B5BDB] text-white flex items-center gap-2"
                                >
                                    <FaYoutube /> View Playlist
                                </GenericButton>
                                {project.articleLink && (
                                    <GenericButton
                                    onClick={() => window.open(project.articleLink, "_blank")}
                                    className="bg-gray-500 text-white flex items-center gap-2"
                                    >
                                        <FaBook /> Read Article
                                    </GenericButton>
                                )}
                            </>
                        ) : (
                            <>
                                <GenericButton
                                    onClick={() => window.open(project.link, "_blank")}
                                    className="bg-[#3B5BDB] text-white flex items-center gap-2"
                                >
                                    <FaGlobe /> Visit Site
                                </GenericButton>
                                {project.codeLink && (
                                    <GenericButton
                                    onClick={() => window.open(project.codeLink, "_blank")}
                                    className="bg-gray-500 text-white flex items-center gap-2"
                                    >
                                        <FaGithub /> See Code
                                    </GenericButton>
                                )}
                            </>
                        )}
                    </div>
                   </div>
                </div>
            )}
        </>
    );
}

export default ProjectCard;