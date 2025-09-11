import { COLORS } from "../../theme.js"
import profilePic from "../../assets/profile.png";

function About({darkMode}) {
    const bgColor = darkMode ? COLORS.darkGradientEnd : COLORS.background;
    const textColor = darkMode ? COLORS.background : COLORS.text;

  return (
    <section
        id="about"
        className="h-screen snap-start flex items-center justify-center flex-col md:flex-row py-20 px-6 md:px-20 transition-colors duration-500"
        style={{ backgroundColor: bgColor, color: textColor }}
        data-aos="fade-in"
        >
            {/* Foto */}
            <div
                className="mb-6 md:mb-0 md:mr-10 flex-shrink-0"
                data-aos="fade-in" data-aos-delay="100">
                <img
                src={profilePic}
                alt="Melissa Huerta"
                className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover shadow-lg transition-transform duration-300 hover:scale-105"
                />
            </div>

            {/* Texto */}
            <div className="max-w-xl" data-aos="fade-in" data-aos-delay="200">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">About me</h2>
                <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                    Hi! I'm Melissa, a Software Developer and Game Creator passionate about
                building applications and games that connect people and spark creativity.
                I enjoy exploring new technologies, learning continuously, and turning
                ideas into fun and useful projects.
                </p>
            </div>
    </section>
  );
}

export default About;