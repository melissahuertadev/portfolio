import { COLORS } from '../../theme';
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { SiUpwork } from "react-icons/si";
import SocialButton from '../buttons/SocialButton';

function Contact({darkMode}) {
        const textColor = darkMode ? COLORS.background : COLORS.text;
    return (
        <section id="contact"
            className="flex-1 flex flex-col min-h-0 px-6 md:px-20 transition-colors duration-500 justify-center"
            style={{ 
                background: darkMode? `linear-gradient(135deg,
                rgba(177,142,248,0.8),
                rgba(74,108,247,0.8))` : `linear-gradient(
                    135deg,
                    rgba(177,142,248,0.2),
                    rgba(74,108,247,0.2)
                ),
                linear-gradient(
                    180deg,
                    #F8F8F8 0%,
                    #F8F8F8 100%
                )`,
                color: textColor }} 
        >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 pt-6" data-aos="fade-right">Contact</h2>
            <p className="mb-6 text-lg md:text-xl" data-aos="fade-right">
                Let’s connect! Feel free to reach out for projects or collaborations.
            </p>
            {/* Redes */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" data-aos="fade-up" data-aos-delay="300">
                    <SocialButton
                        href="https://pe.linkedin.com/in/melissahuertadev"
                        icon={FaLinkedin}
                        label="LinkedIn"
                        bgLight="bg-blue-600"
                        bgDark="bg-blue-500">
                    </SocialButton>
                     <SocialButton
                        href="https://www.upwork.com/freelancers/~0110481d17c5064595"
                        icon={SiUpwork}
                        label="Upwork"
                        bgLight="bg-green-600"
                        bgDark="bg-green-500">
                    </SocialButton>
                    <SocialButton
                        href="https://github.com/melissahuertadev"
                        icon={FaGithub}
                        label="Github"
                        bgLight="bg-stone-700"
                        bgDark="bg-cyan-500"
                        hoverGlow="0 0 20px 8px rgba(240,200,250,0.4)"
                    />
                    <SocialButton
                        href="mailto:melissahuerta.dev@gmail.com"
                        icon={FaEnvelope}
                        label="Email"
                        bgLight="bg-indigo-500"
                        bgDark="bg-indigo-400"
                    />
            </div>
        </section>
    )
}

export default Contact;