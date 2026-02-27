import React from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AppProvider } from './src/context/AppContext';
import Layout from './src/components/Layout';
import Home from './src/pages/Home';
import Materials from './src/pages/Materials';
import Flashcards from './src/pages/Flashcards';
import Placeholder from './src/pages/Placeholder';
import NotFound from './src/pages/NotFound';

const App: React.FC = () => {
  return (
    <Theme appearance="dark" radius="large" scaling="100%" className="dark">
      <AppProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/materials" element={<Materials />} />
              <Route path="/flashcards" element={<Flashcards />} />
              
              {/* Shelled Pages per constraint */}
              <Route path="/quiz" element={<Placeholder title="AI Quiz" />} />
              <Route path="/chat" element={<Placeholder title="AI Chat" />} />
              <Route path="/roadmap" element={<Placeholder title="Roadmap" />} />
              <Route path="/community" element={<Placeholder title="Students Community" />} />
              
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            theme="dark"
            newestOnTop
            closeOnClick
            pauseOnHover
          />
        </Router>
      </AppProvider>
    </Theme>
  );
}

export default App;