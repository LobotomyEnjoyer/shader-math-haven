
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TopicsProvider } from '@/contexts/TopicsContext';
import NavigationPanel from '@/components/topics/NavigationPanel';
import MainPanel from '@/components/topics/MainPanel';
import AdditionsPanel from '@/components/topics/AdditionsPanel';
import CustomButton from '@/components/CustomButton';

// Placeholder for adding new topics
const AddTopicDialog: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Add New Topic</h2>
        <p className="mb-4 text-gray-600">This is a placeholder for adding new topics. In a real application, you would add a form here.</p>
        <div className="flex justify-end">
          <CustomButton onClick={onClose} variant="primary">Close</CustomButton>
        </div>
      </div>
    </div>
  );
};

const Topics: React.FC = () => {
  const { t } = useLanguage();
  const [isAddTopicOpen, setIsAddTopicOpen] = useState(false);
  
  return (
    <TopicsProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Back button */}
        <div className="fixed top-4 left-6 z-50">
          <Link to="/">
            <CustomButton variant="outlined" size="sm" className="gap-2">
              <ArrowLeft size={16} />
              {t('back')}
            </CustomButton>
          </Link>
        </div>
        
        {/* Navigation Panel */}
        <NavigationPanel onAddTopic={() => setIsAddTopicOpen(true)} />
        
        {/* Main content area with left margin to account for the navigation panel */}
        <div className="pt-16 pl-6 pr-4 pb-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* MainPanel (takes up 3/4 of the width on large screens) */}
            <div className="lg:col-span-3">
              <MainPanel />
            </div>
            
            {/* Additions Panel (takes up 1/4 of the width on large screens) */}
            <div className="lg:col-span-1">
              <AdditionsPanel />
            </div>
          </div>
        </div>
        
        {/* Add Topic Dialog */}
        <AddTopicDialog 
          isOpen={isAddTopicOpen} 
          onClose={() => setIsAddTopicOpen(false)} 
        />
      </div>
    </TopicsProvider>
  );
};

export default Topics;
