import { Routes, Route, Navigate } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Programs from './pages/Programs';
import ProgramDetail from './pages/ProgramDetail';
import LessonDetail from './pages/LessonDetail';
import Commands from './pages/Commands';
import CommandDetail from './pages/CommandDetail';
import Tools from './pages/Tools';
import Profile from './pages/Profile';
import Onboarding from './pages/Onboarding';
import Guide from './pages/Guide';
import ArticleDetail from './pages/ArticleDetail';
import Achievements from './pages/Achievements';
import Journal from './pages/Journal';
import { useStore } from './store/useStore';

export default function App() {
  const { state } = useStore();

  if (!state.onboarded) {
    return (
      <div className="app-shell">
        <Onboarding />
      </div>
    );
  }

  return (
    <div className="app-shell pb-24">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programas" element={<Programs />} />
        <Route path="/programas/:programId" element={<ProgramDetail />} />
        <Route
          path="/programas/:programId/:lessonId"
          element={<LessonDetail />}
        />
        <Route path="/comandos" element={<Commands />} />
        <Route path="/comandos/:commandId" element={<CommandDetail />} />
        <Route path="/guia" element={<Guide />} />
        <Route path="/guia/:articleId" element={<ArticleDetail />} />
        <Route path="/ferramentas" element={<Tools />} />
        <Route path="/conquistas" element={<Achievements />} />
        <Route path="/diario" element={<Journal />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <BottomNav />
    </div>
  );
}
