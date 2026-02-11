import { Navbar } from '../components/Navbar/Navbar';
import { LeftSidebar } from '../components/LeftSidebar';
import { RightSidebar } from '../components/RightSidebar';
import { CaseStudyContent } from '../components/CaseStudyContent';
import { EditBar } from '../components/EditBar';
import { EditableContent } from '../components/EditableContent';
import { AIPanel } from '../components/AIPanel';
import { useEdit } from '../context/EditContext';

export function CaseStudyPage() {
    const { isEditMode } = useEdit();

    const handleDelete = () => {
        // Handle delete - could navigate away or show success message
        console.log('Case study deleted');
    };

    // Mock user for navbar
    const mockUser = {
        id: '1',
        name: 'Dev User'
    };

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <Navbar
                user={mockUser}
                onLogin={() => console.log('Login clicked')}
                onLogout={() => console.log('Logout clicked')}
            />
            {isEditMode && (
                <EditBar
                    title="Hero Vida EICMA 2025 Case Study"
                    onDelete={handleDelete}
                />
            )}
            <div className="flex-1 flex overflow-hidden">
                <LeftSidebar />
                {isEditMode ? <EditableContent /> : <CaseStudyContent />}
                {/* Show AIPanel in edit mode, RightSidebar in view mode */}
                {isEditMode ? <AIPanel /> : <RightSidebar />}
            </div>
        </div>
    );
}
