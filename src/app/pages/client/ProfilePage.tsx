import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChangePasswordForm } from '@/features/profile/components/ChangePasswordForm';
import { ProfileInfoForm } from '@/features/profile/components/ProfileInfoForm';
import { useProfile } from '@/features/profile/hooks/useProfile';

const ProfilePage = () => {
  const { isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold">My Profile</h1>
      
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="mb-4 grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="info">Personal Information</TabsTrigger>
          <TabsTrigger value="password">Change Password</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="space-y-4">
          <ProfileInfoForm />
        </TabsContent>
        
        <TabsContent value="password" className="space-y-4">
          <ChangePasswordForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;