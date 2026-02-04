import { Header } from '../components/Header';
import { LeftSidebar } from '../components/LeftSidebar';
import { RightSidebar } from '../components/RightSidebar';
import { CaseStudyContent } from '../components/CaseStudyContent';
import { EditBar } from '../components/EditBar';
import { EditableContent } from '../components/EditableContent';
import { useEdit } from '../context/EditContext';

export function CaseStudyPage() {
    const { isEditMode } = useEdit();

    const handleDelete = () => {
        // Handle delete - could navigate away or show success message
        console.log('Case study deleted');
    };

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <Header />
            {isEditMode && (
                <EditBar
                    title="Hero Vida EICMA 2025 Case Study"
                    onDelete={handleDelete}
                />
            )}
            <div className="flex-1 flex overflow-hidden">
                <LeftSidebar />
                {isEditMode ? <EditableContent /> : <CaseStudyContent />}
                {/* Keep RightSidebar space as placeholder in edit mode */}
                {isEditMode ? (
                    <div style={{ width: 200, borderLeft: '1px solid #e5e7eb', backgroundColor: '#fafafa' }} />
                ) : (
                    <RightSidebar />
                )}
            </div>
        </div>
    );
}
