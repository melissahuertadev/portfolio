import { COLORS } from "../theme";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import SocialButton from "./botones/SocialButton";

function Hero({ darkMode }) {
  return (
    <section
        className="flex flex-col items-center justify-center text-center min-h-screen px-4"
        style={{
            background: darkMode
            ? `linear-gradient(135deg, ${COLORS.darkGradientStart}, ${COLORS.darkGradientEnd})`
            : `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.gradientEnd}`,
        }}
        id="hero"
    >
     <h1
        data-aos="fade-up"
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
        style={{ color: COLORS.background }}>
            Melissa Huerta
    </h1>

     <h2 
        data-aos="fade-up"
        data-aos-delay="100"
        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-4"
        style={{ color: COLORS.background }}>
            Software Developer & Game Creator
    </h2>
     <p 
        data-aos="fade-up"
        data-aos-delay="200"
        className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl"
        style={{ color: COLORS.background }}>
            Creating apps and games while exploring new ideas and pushing limits.
    </p>
      <div className="flex flex-col sm:flex-row gap-4" data-aos="fade-up" data-aos-delay="300">
        <SocialButton
            href="https://pe.linkedin.com/in/melissahuertadev"
            icon={FaLinkedin}
            label="LinkedIn"
            bgLight="bg-blue-600"
            bgDark="bg-blue-500"
            />

        <SocialButton
            href="https://github.com/melissahuertadev"
            icon={FaGithub}
            label="Github"
            bgLight="bg-stone-700"
            bgDark="bg-cyan-500"
            hoverGlow="0 0 20px 8px rgba(240,200,250,0.4)"
        />
      </div>
    </section>
  );
}

export default Hero;