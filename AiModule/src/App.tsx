import { Routes, Route } from 'react-router-dom'
import { EditProvider } from './context/EditContext'
import { CaseStudyPage } from './pages/CaseStudyPage'

function App() {
  return (
    <EditProvider>
      <Routes>
        <Route path="/" element={<CaseStudyPage />} />
        <Route path="/case-study" element={<CaseStudyPage />} />
      </Routes>
    </EditProvider>
  )
}

export default App
