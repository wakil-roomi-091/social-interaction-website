import { useState } from 'react';
import BackButton from '../components/common/BackButton';
import EditProfileModal from '../components/modals/EditProfileModal';
import SettingsSidebar from '../components/settings/SettingsSidebar';
import SettingsContent from '../components/settings/SettingsContent';

const Settings = () => {
  const [active, setActive] = useState('account');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleProfileUpdate = (updatedUser) => {
    // Refresh user data in settings
    localStorage.setItem('user', JSON.stringify(updatedUser));
    window.location.reload();
  };

  return (
    <div className="bg-cream font-body min-h-screen relative">
      <div className="max-w-[1100px] mx-auto px-[5%] py-8 relative">
        
        <BackButton label="Back to Home" />
        
        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] bg-paper border border-[#1C1B19]/[0.12] rounded-lg overflow-hidden min-h-[600px]">
            
            <SettingsSidebar active={active} setActive={setActive} />
            <SettingsContent 
              active={active} 
              onEditProfile={() => setIsEditModalOpen(true)}
            />
            
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
        onProfileUpdate={handleProfileUpdate}
      />
    </div>
  );
};

export default Settings;