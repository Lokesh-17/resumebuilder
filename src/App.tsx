import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useResumeStore } from '@/store/resumeStore';
import HomePage from '@/pages/HomePage';
import EditPage from '@/pages/EditPage';
import PreviewPage from '@/pages/PreviewPage';

function App() {
  const { isDarkMode } = useResumeStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/edit" element={<EditPage />} />
          <Route path="/preview" element={<PreviewPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
