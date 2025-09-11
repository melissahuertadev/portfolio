import { useThemeStore } from './store/themeStore';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
//import Contact from './components/Contact';
import DarkModeToggle from './components/buttons/DarkModeToggle';

function App() {
  const { darkMode } = useThemeStore();

  return (
       <div className={darkMode ? "dark" : "" }>
        {/* Contenedor disponible en toda la app */}
        <div className="min-h-screen font-sans transition-colors duration-500
                      bg-white dark:bg-gray-900
                      text-gray-900 dark:text-white">
          <Hero darkMode={darkMode} />
          <About darkMode={darkMode} />
          <Projects darkMode={darkMode} />        
         {/*  <Contact darkMode={darkMode} /> */}
          <div className="fixed bottom-4 right-4 z-50">
            <DarkModeToggle />
          </div>
        </div>
      </div>
    )
}

export default App
