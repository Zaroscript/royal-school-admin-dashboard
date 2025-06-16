import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import DashboardLayout from './components/Layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Classes from './pages/Classes';
import Subjects from './pages/Subjects';
import './i18n';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          } />
          <Route path="/students" element={
            <DashboardLayout>
              <Students />
            </DashboardLayout>
          } />
          <Route path="/teachers" element={
            <DashboardLayout>
              <Teachers />
            </DashboardLayout>
          } />
          <Route path="/classes" element={
            <DashboardLayout>
              <Classes />
            </DashboardLayout>
          } />
          <Route path="/subjects" element={
            <DashboardLayout>
              <Subjects />
            </DashboardLayout>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;