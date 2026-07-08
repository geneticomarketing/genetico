"use client";

import { GearIcon, Popup, useTranslation } from "@payloadcms/ui";
import React from "react";

type SettingsMenuButtonProps = {
  settingsMenu?: React.ReactNode[];
};

export function SettingsMenuButton({ settingsMenu }: SettingsMenuButtonProps) {
  const { t } = useTranslation();

  if (!settingsMenu?.length) return null;

  return (
    <Popup
      button={<GearIcon ariaLabel={t("general:menu")} />}
      className="settings-menu-button"
      horizontalAlign="left"
      id="settings-menu"
      size="small"
      verticalAlign="bottom"
    >
      {settingsMenu.map((item, index) => (
        <React.Fragment key={`settings-menu-item-${index}`}>{item}</React.Fragment>
      ))}
    </Popup>
  );
}
