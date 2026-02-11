import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar/Navbar'
import { LeftSidebar } from '../components/LeftSidebar'
import { CaseStudyContent } from '../components/CaseStudyContent'

export function ReadOnlyPage() {
    const navigate = useNavigate()

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <Navbar
                user={null}
                onLogin={() => navigate('/case-study')}
            />
            <div className="flex-1 flex overflow-hidden">
                <LeftSidebar />
                <CaseStudyContent />
            </div>
        </div>
    )
}
