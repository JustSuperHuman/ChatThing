"use client";

import { Switch } from "@/components/ui/switch";
import { api } from "@/trpc/react";
import Image from "next/image";
import { models, type Model } from "../../../lib/models";

export default function ModelsTab() {
  const { data: settings, refetch } = api.settings.getSettings.useQuery();
  const updateSettings = api.settings.updateSettings.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const enabledModels: string[] = settings?.enabledModels
    ? (JSON.parse(settings.enabledModels) as string[])
    : [];

  const handleModelToggle = (modelId: string, isEnabled: boolean) => {
    const newEnabledModels = isEnabled
      ? [...enabledModels, modelId]
      : enabledModels.filter((id) => id !== modelId);
    updateSettings.mutate({ enabledModels: newEnabledModels });
  };

  return (
    <div className="flex flex-col gap-4">
      {models.map((model: Model) => (
        <div
          key={model.model_id}
          className="flex items-center justify-between rounded-lg border p-4"
        >
          <div className="flex items-center gap-4">
            <Image
              src={model.icon}
              alt={`${model.name} icon`}
              width={32}
              height={32}
              className="rounded-md"
            />
            <div className="flex flex-col">
              <span className="font-semibold">{model.name}</span>
              <span className="text-sm text-muted-foreground">
                {model.description}
              </span>
            </div>
          </div>
          <Switch
            checked={enabledModels.includes(model.model_id)}
            onCheckedChange={(isChecked) =>
              handleModelToggle(model.model_id, isChecked)
            }
          />
        </div>
      ))}
    </div>
  );
}