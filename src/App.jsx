import NeuralBackground from './components/NeuralBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Business from './components/Business'
import TechStack from './components/TechStack'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="relative min-h-screen bg-space-black">
      {/* Neural network animated background */}
      <NeuralBackground />

      {/* Content layer */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Business />
          <TechStack />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
