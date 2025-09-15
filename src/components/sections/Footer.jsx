import { COLORS } from '../../theme';

function Footer({darkMode}) {
    const bgColor = darkMode ? COLORS.darkGradientEnd : COLORS.background;
    const textColor = darkMode ? COLORS.background : COLORS.text;

    const currentYear = new Date().getFullYear();


    return (
        <footer className="text-center py-4 px-6 md:px-20 transition-colors duration-500"
            style={{ backgroundColor: bgColor, color: textColor }} data-aos="flip-up">
            <p className="text-sm">© {currentYear} Melissa Huerta</p>
            <p className="text-sm">Made with 💜 in Peru</p>
        </footer>
    )
}

export default Footer;