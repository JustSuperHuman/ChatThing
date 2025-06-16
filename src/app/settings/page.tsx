import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountTab from "@/app/_components/settings/AccountTab";
import CustomizationTab from "../_components/settings/CustomizationTab";
import ModelsTab from "../_components/settings/ModelsTab";

function PlaceholderTab({ title }: { title: string }) {
  return <div className="p-4">{title} Placeholder</div>;
}

export default function SettingsPage() {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="customization">Customization</TabsTrigger>
          <TabsTrigger value="history">History & Sync</TabsTrigger>
          <TabsTrigger value="models">Models</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="attachments">Attachments</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <AccountTab />
        </TabsContent>
        <TabsContent value="customization">
          <CustomizationTab />
        </TabsContent>
        <TabsContent value="history">
          <PlaceholderTab title="History & Sync" />
        </TabsContent>
        <TabsContent value="models">
          <ModelsTab />
        </TabsContent>
        <TabsContent value="api-keys">
          <PlaceholderTab title="API Keys" />
        </TabsContent>
        <TabsContent value="attachments">
          <PlaceholderTab title="Attachments" />
        </TabsContent>
      </Tabs>
    </div>
  );
}