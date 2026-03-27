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

function PrivateRoute({ children }) {
  const auth = useSelector((state) => state.auth)
  const token = auth?.token
  return token ? children : <Navigate to="/login" />
}

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
            <Route path="/dashboard" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
            <Route path="/applications" element={<PrivateRoute><Layout><Applications /></Layout></PrivateRoute>} />
            <Route path="/applications/:id" element={<PrivateRoute><Layout><ApplicationDetail /></Layout></PrivateRoute>} />
            <Route path="/reports" element={<PrivateRoute><Layout><Reports /></Layout></PrivateRoute>} />
            <Route path="/jobs-manage" element={<PrivateRoute><Layout><ManageJobs /></Layout></PrivateRoute>} />
          </Routes>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}