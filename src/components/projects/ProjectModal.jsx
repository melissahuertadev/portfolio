import { FaGlobe, FaGithub, FaYoutube, FaBook } from "react-icons/fa";
import GenericButton from "../buttons/GenericButton";
import { COLORS } from "../../theme";

function ProjectModal({ project, darkMode, onClose }) {
    const bgColor = darkMode ? COLORS.darkCardBackground : COLORS.background;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-[#2A2A3A] rounded-lg w-11/12 sm:w-3/4 lg:w-1/2 p-6 relative"
                style={{ backgroundColor: bgColor }}>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
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
                            <GenericButton
                                onClick={() => window.open(project.link, "_blank")}
                                className="text-white"
                                style={{ backgroundColor: COLORS.secondary }}
                            >
                                <FaYoutube /> View Playlist
                            </GenericButton>
                            {project.articleLink && (
                                    <GenericButton
                                    onClick={() => window.open(project.articleLink, "_blank")}
                                    className="text-white"
                                    style={{ backgroundColor: COLORS.secondary }}
                                    >
                                        <FaBook /> Read Article
                                    </GenericButton>
                                )}
                            </>
                        ) : (
                            <>
                                <GenericButton
                                    onClick={() => window.open(project.link, "_blank")}
                                    className="text-white"
                                    style={{ backgroundColor: COLORS.secondary }}
                                >
                                    <FaGlobe /> Visit Site
                                </GenericButton>
                                {project.codeLink && (
                                    <GenericButton
                                    onClick={() => window.open(project.codeLink, "_blank")}
                                    className="bg-stone-100 text-gray-900 dark:text-gray-900"
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

export default ProjectModal;