import { useThemeStore } from './store/themeStore';
import Hero from './components/Hero';
import About from './components/About';
//import Projects from './components/Projects';
//import Contact from './components/Contact';
import DarkModeToggle from './components/DarkModeToggle';

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
         {/*  <Projects darkMode={darkMode} />        
          <Contact darkMode={darkMode} />  */}
          
          <div className="fixed bottom-4 right-4 z-50">
            <DarkModeToggle />
          </div>
        </div>
      </div>
    )
}

export default App
