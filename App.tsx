import React from 'react';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import '@radix-ui/themes/styles.css';
    import { Theme } from '@radix-ui/themes';
    import { ToastContainer } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';

    import { MaterialProvider } from './src/context/MaterialContext';
    import DashboardLayout from './src/components/DashboardLayout';
    import Dashboard from './src/pages/Dashboard';
    import Materials from './src/pages/Materials';
    import Flashcards from './src/pages/Flashcards';
    import Quiz from './src/pages/Quiz';
    import AIChat from './src/pages/AIChat';
    import NotFound from './src/pages/NotFound';

    const App: React.FC = () => {
      return (
        <Theme appearance="inherit" radius="large" scaling="100%">
          <MaterialProvider>
            <Router>
              <Routes>
                <Route path="/" element={<DashboardLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="materials" element={<Materials />} />
                  <Route path="flashcards" element={<Flashcards />} />
                  <Route path="quiz" element={<Quiz />} />
                  <Route path="chat" element={<AIChat />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
              <ToastContainer
                position="top-right"
                autoClose={3000}
                newestOnTop
                closeOnClick
                pauseOnHover
                theme="colored"
              />
            </Router>
          </MaterialProvider>
        </Theme>
      );
    }

    export default App;