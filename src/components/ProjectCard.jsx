import { COLORS } from '../theme';

function ProjectCard({ project, darkMode }) {
    return (
        <div
            key={project.id}
            className="bg-white dark:bg-[#2A2A3A] rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300"
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
                <p className="text-sm mb-2">{project.description}</p>
                <button
                    className={`text-sm font-semibold ${
                        darkMode    ? "text-white" : "text-[#3B5BDB]"
                    } hover:underline`}
                >
                    View More
                </button>
            </div>
        </div>
    );
}

export default ProjectCard;