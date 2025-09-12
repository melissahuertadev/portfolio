import { useThemeStore } from './store/themeStore';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import TechStack from './components/sections/TechStack';
import Contact from './components/sections/Contact';
import Footer from './components/sections/Footer';
import DarkModeToggle from './components/buttons/DarkModeToggle';

function App() {
  const { darkMode } = useThemeStore();

  return (
       <div className={darkMode ? "dark" : "" }>
        {/* Contenedor disponible en toda la app con scroll-snap */}
        <div className="scroll-smooth
                      font-sans transition-colors duration-500
                      bg-white dark:bg-gray-900
                      text-gray-900 dark:text-white">
          <Hero darkMode={darkMode} />
          <About darkMode={darkMode} />
          <Projects darkMode={darkMode} />
          <TechStack darkMode={darkMode} />      
          <section className="min-h-screen flex flex-col scroll-snap-align-start" id="contact-me">
            <div className="flex-1">
              <Contact darkMode={darkMode} />
            </div>
            <Footer darkMode={darkMode} />
          </section>
          <div className="fixed bottom-4 right-4 z-50">
            <DarkModeToggle />
          </div>
        </div>
      </div>
    )
}

export default App