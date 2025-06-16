"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";

export default function CustomizationTab() {
  const { data: session } = useSession();
  const { data: settings, refetch } = api.settings.getSettings.useQuery(
    undefined,
    { enabled: !!session },
  );

  const [formData, setFormData] = useState({
    profession: "",
    aiTraits: "",
    userPreferences: "",
    boringTheme: false,
    hidePersonalInfo: false,
    disableThematicBreaks: false,
    statsForNerds: false,
    mainTextFont: "Proxima Vara",
    codeFont: "JetBrains Mono",
  });

  useEffect(() => {
    if (settings) {
      setFormData({
        profession: settings.profession ?? "",
        aiTraits: settings.aiTraits ?? "",
        userPreferences: settings.userPreferences ?? "",
        boringTheme: settings.boringTheme,
        hidePersonalInfo: settings.hidePersonalInfo,
        disableThematicBreaks: settings.disableThematicBreaks,
        statsForNerds: settings.statsForNerds,
        mainTextFont: settings.mainTextFont ?? "Proxima Vara",
        codeFont: settings.codeFont ?? "JetBrains Mono",
      });
    }
  }, [settings]);

  const updateSettings = api.settings.updateSettings.useMutation({
    onSuccess: () => {
      toast.success("Preferences saved!");
      void refetch();
    },
    onError: (error) => {
      toast.error("Failed to save preferences", {
        description: error.message,
      });
    },
  });

  const handleSave = () => {
    updateSettings.mutate(formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">User Profile Settings</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="preferredName">Preferred Name</Label>
            <Input
              id="preferredName"
              name="preferredName"
              value={session?.user.name ?? ""}
              disabled
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="profession">Profession</Label>
            <Input
              id="profession"
              name="profession"
              value={formData.profession}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="aiTraits">AI Traits</Label>
            <Input
              id="aiTraits"
              name="aiTraits"
              value={formData.aiTraits}
              onChange={handleInputChange}
              placeholder="e.g. friendly, witty, concise"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="userPreferences">User Preferences</Label>
          <Textarea
            id="userPreferences"
            name="userPreferences"
            value={formData.userPreferences}
            onChange={handleInputChange}
            placeholder="Anything else T3 Chat should know about you?"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Visual Options</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <Label htmlFor="boringTheme">Boring Theme</Label>
            <Switch
              id="boringTheme"
              name="boringTheme"
              checked={formData.boringTheme}
              onCheckedChange={(c) => handleSwitchChange("boringTheme", c)}
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <Label htmlFor="hidePersonalInfo">Hide Personal Information</Label>
            <Switch
              id="hidePersonalInfo"
              name="hidePersonalInfo"
              checked={formData.hidePersonalInfo}
              onCheckedChange={(c) => handleSwitchChange("hidePersonalInfo", c)}
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <Label htmlFor="disableThematicBreaks">
              Disable Thematic Breaks
            </Label>
            <Switch
              id="disableThematicBreaks"
              name="disableThematicBreaks"
              checked={formData.disableThematicBreaks}
              onCheckedChange={(c) =>
                handleSwitchChange("disableThematicBreaks", c)
              }
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <Label htmlFor="statsForNerds">Stats for Nerds</Label>
            <Switch
              id="statsForNerds"
              name="statsForNerds"
              checked={formData.statsForNerds}
              onCheckedChange={(c) => handleSwitchChange("statsForNerds", c)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="mainTextFont">Main Text Font</Label>
            <Select
              name="mainTextFont"
              value={formData.mainTextFont}
              onValueChange={(v) => handleSelectChange("mainTextFont", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a font" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Proxima Vara">Proxima Vara</SelectItem>
                <SelectItem value="Inter">Inter</SelectItem>
                <SelectItem value="Roboto">Roboto</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="codeFont">Code Font</Label>
            <Select
              name="codeFont"
              value={formData.codeFont}
              onValueChange={(v) => handleSelectChange("codeFont", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a font" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="JetBrains Mono">JetBrains Mono</SelectItem>
                <SelectItem value="Fira Code">Fira Code</SelectItem>
                <SelectItem value="Source Code Pro">Source Code Pro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Button onClick={handleSave} className="w-fit self-end">
        Save Preferences
      </Button>
    </div>
  );
}