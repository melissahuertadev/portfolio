import { useThemeStore } from './store/themeStore';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import DarkModeToggle from './components/DarkModeToggle';

function App() {
  const { darkMode } = useThemeStore();

  return (
       <div className={darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}>

        <header className="flex justify-between items-center p-4">
          <h1 className="text-xl font-bold">Melissa Huerta</h1>
          <DarkModeToggle />
        </header>
      </div>
    )
}

export default App
