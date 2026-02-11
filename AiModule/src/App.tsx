import { Routes, Route } from 'react-router-dom'
import { EditProvider } from './context/EditContext'
import { CaseStudyPage } from './pages/CaseStudyPage'
import { ProfilePage } from './pages/ProfilePage'
import { ReadOnlyPage } from './pages/ReadOnlyPage'

function App() {
  return (
    <EditProvider>
      <Routes>
        <Route path="/" element={<CaseStudyPage />} />
        <Route path="/case-study" element={<CaseStudyPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/public" element={<ReadOnlyPage />} />
      </Routes>
    </EditProvider>
  )
}

export default App
