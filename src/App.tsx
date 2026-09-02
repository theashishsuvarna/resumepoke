import PokeBallLoader from './components/PokeBallLoader';
import PokeCursor from './components/PokeCursor';
import ScrollProgress from './components/ScrollProgress';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import TrainerProfile from './components/TrainerProfile';
import Projects from './components/Projects';
import ChooseStarter from './components/ChooseStarter';
import Skills from './components/Skills';
import GymBadges from './components/GymBadges';
import Certifications from './components/Certifications';
import WildArea from './components/WildArea';
import FinalBattle from './components/FinalBattle';

function App() {
  return (
    <>
      <PokeBallLoader />
      <PokeCursor />
      <ScrollProgress />
      <Navigation />
      <main className="relative overflow-x-hidden">
        <Hero />
        <TrainerProfile />
        <Projects />
        <ChooseStarter />
        <Skills />
        <GymBadges />
        <Certifications />
        <WildArea />
        <FinalBattle />
      </main>
    </>
  );
}

export default App;
