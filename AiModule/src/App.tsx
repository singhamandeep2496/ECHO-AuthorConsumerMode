import { Routes, Route } from 'react-router-dom'
import { EditProvider } from './context/EditContext'
import { CaseStudyPage } from './pages/CaseStudyPage'
import { ProfilePage } from './pages/ProfilePage'

function App() {
  return (
    <EditProvider>
      <Routes>
        <Route path="/" element={<CaseStudyPage />} />
        <Route path="/case-study" element={<CaseStudyPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </EditProvider>
  )
}

export default App
