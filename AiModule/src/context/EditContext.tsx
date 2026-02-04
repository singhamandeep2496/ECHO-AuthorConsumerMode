import { createContext, useContext, useState, type ReactNode } from 'react';

interface ContentData {
    title: string;
    subtitle: string;
    intro: string;
    challenge: string;
    approach: string;
    method: string;
}

interface EditContextType {
    isEditMode: boolean;
    contentData: ContentData;
    setEditMode: (mode: boolean) => void;
    updateContent: (data: Partial<ContentData>) => void;
    saveChanges: () => void;
    discardChanges: () => void;
}

const defaultContent: ContentData = {
    title: 'Hero Vida EICMA 2025 Case Study',
    subtitle: "Bringing Hero VIDA's electric mobility lineup to life through interactive screens at one of the most talked-about automotive events in the world",
    intro: `EICMA is the world's largest stage for two-wheeler innovation. The annual gathering in Milan is an opportunity for global manufacturers to unveil new models, technology, and accessories to an audience of passionate gear-heads and curious visitors.

The event attracts large crowds that move fast. Machines glow under bright spotlights and every brand is fighting for a moment of attention. Hero VIDA had to capitalise on this moment not just with their standout lineup of two-wheelers, but also with screens and marketing materials that invited attendees to understand the products at a deeper level.`,
    challenge: `Hero VIDA needed a set of on-device product screens to spotlight their electric two-wheelers at EICMA. Each screen had to give visitors a quick, intuitive way to explore every model's features, specs, and personality, all within the rhythm of a fast-moving trade show.

In previous years, attendees often left the webpages scrolled to the end, meaning the next visitor saw incomplete or confusing information. The audience added another layer of complexity. Most visitors aren't tech-forward, so interactions needed to be visually clear, intuitive, and impossible to miss.`,
    approach: `ownpath Studios was tasked with transforming static information on each model into an engaging experience that could stand out amidst the hubbub of the world's biggest mobility showcase. The goal was to surface all essential details while keeping the experience light, playful, and effortlessly navigable.`,
    method: `We started by mapping out the key information visitors would want: range, charging time, price, color options, and unique features. From there, we designed an interface that surfaced this information in layers, so casual browsers could get a quick hit of inspiration while more curious visitors could dig deeper.`
};

const EditContext = createContext<EditContextType | undefined>(undefined);

export function EditProvider({ children }: { children: ReactNode }) {
    const [isEditMode, setIsEditMode] = useState(false);
    const [contentData, setContentData] = useState<ContentData>(defaultContent);
    const [savedContent, setSavedContent] = useState<ContentData>(defaultContent);

    const setEditMode = (mode: boolean) => {
        if (mode) {
            // Entering edit mode - save current state
            setSavedContent(contentData);
        }
        setIsEditMode(mode);
    };

    const updateContent = (data: Partial<ContentData>) => {
        setContentData(prev => ({ ...prev, ...data }));
    };

    const saveChanges = () => {
        setSavedContent(contentData);
        setIsEditMode(false);
    };

    const discardChanges = () => {
        setContentData(savedContent);
        setIsEditMode(false);
    };

    return (
        <EditContext.Provider value={{
            isEditMode,
            contentData,
            setEditMode,
            updateContent,
            saveChanges,
            discardChanges
        }}>
            {children}
        </EditContext.Provider>
    );
}

export function useEdit() {
    const context = useContext(EditContext);
    if (context === undefined) {
        throw new Error('useEdit must be used within an EditProvider');
    }
    return context;
}
