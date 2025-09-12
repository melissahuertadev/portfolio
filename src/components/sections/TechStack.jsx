import { COLORS } from "../../theme.js"
import { FaVuejs, FaReact, FaNodeJs, FaGitAlt } from "react-icons/fa";
import { SiGodotengine } from "react-icons/si";

function TechStack({darkMode}) {
    const bgColor = darkMode ? COLORS.darkGradientStart : COLORS.secondary

    const iconClass =
    "text-6xl md:text-7xl transition-transform duration-300 hover:scale-110";

    const icons = [
        { Icon: FaVuejs, name: "Vue" },
        { Icon: FaReact, name: "React" },
        { Icon: FaNodeJs, name: "Node.js" },
        { Icon: SiGodotengine, name: "Godot" },
        { Icon: FaGitAlt, name: "Git" },
    ];

    return (
        <section id="stack"
            className="min-h-screen flex flex-col px-6 md:px-20 transition-colors duration-500"
            style={{backgroundColor: bgColor}}
        >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 pt-6 text-white" data-aos="fade-right">Tech Stack</h2>
            {/* bloque de íconos */}
             <div className="flex-1 flex items-center justify-center">
                <div className="flex flex-wrap justify-center gap-10 max-w-5xl mx-auto">
                    {icons.map((item, i) => {
                        const Icon = item.Icon;
                        const name = item.name;

                        return (<div
                            key={name}
                            className="flex flex-col items-center"
                            data-aos="zoom-in"
                            data-aos-delay={i * 150}
                        >
                            <Icon className={`${iconClass} text-white`} />
                            <span className="mt-2 text-white text-lg">{name}</span>

                        </div>)
                    })}
                </div>
            </div>


        </section>
    )
}

export default TechStack;