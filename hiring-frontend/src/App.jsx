import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ToastProvider } from './components/Toast'
import { ThemeProvider } from './context/ThemeContext'
import PublicForm from './pages/PublicForm'
import ThankYou from './pages/ThankYou'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Applications from './pages/Applications'
import ApplicationDetail from './pages/ApplicationDetail'
import Reports from './pages/Reports'
import Layout from './components/Layout'
import CandidateLayout from './components/CandidateLayout'
import About from './pages/About'
import Help from './pages/Help'

import LandingPage from './pages/LandingPage'
import PortalSelection from './pages/PortalSelection'

import JobList from './pages/JobList'
import JobDetail from './pages/JobDetail'
import ManageJobs from './pages/ManageJobs'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <Routes>
            {/* Candidate Portal */}
            <Route path="/" element={<CandidateLayout><LandingPage /></CandidateLayout>} />
            <Route path="/select" element={<CandidateLayout><PortalSelection /></CandidateLayout>} />
            <Route path="/apply" element={<CandidateLayout><JobList /></CandidateLayout>} />
            <Route path="/jobs/:id" element={<CandidateLayout><JobDetail /></CandidateLayout>} />
            <Route path="/apply-form" element={<CandidateLayout><PublicForm /></CandidateLayout>} />
            <Route path="/thank-you" element={<CandidateLayout><ThankYou /></CandidateLayout>} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />

            {/* Admin/HR Portal */}
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/applications" element={<Layout><Applications /></Layout>} />
            <Route path="/applications/:id" element={<Layout><ApplicationDetail /></Layout>} />
            <Route path="/reports" element={<Layout><Reports /></Layout>} />
            <Route path="/jobs-manage" element={<Layout><ManageJobs /></Layout>} />
          </Routes>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}