import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ToastProvider } from './components/Toast'
import PublicForm from './pages/PublicForm'
import ThankYou from './pages/ThankYou'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Applications from './pages/Applications'
import ApplicationDetail from './pages/ApplicationDetail'
import Reports from './pages/Reports'
import Layout from './components/Layout'

import LandingPage from './pages/LandingPage'

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
      <ToastProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/apply" element={<JobList />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/apply-form" element={<PublicForm />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
          <Route path="/applications" element={<PrivateRoute><Layout><Applications /></Layout></PrivateRoute>} />
          <Route path="/applications/:id" element={<PrivateRoute><Layout><ApplicationDetail /></Layout></PrivateRoute>} />
          <Route path="/reports" element={<PrivateRoute><Layout><Reports /></Layout></PrivateRoute>} />
          <Route path="/jobs-manage" element={<PrivateRoute><Layout><ManageJobs /></Layout></PrivateRoute>} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  )
}