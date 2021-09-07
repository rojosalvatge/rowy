import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

import { Container, Stack, Fade } from "@material-ui/core";

import SettingsSkeleton from "components/Settings/SettingsSkeleton";
import SettingsSection from "components/Settings/SettingsSection";
import About from "components/Settings/ProjectSettings/About";
import CloudRun from "@src/components/Settings/ProjectSettings/CloudRun";
import Authentication from "components/Settings/ProjectSettings/Authentication";
import Customization from "components/Settings/ProjectSettings/Customization";

import { useSnackContext } from "contexts/SnackContext";
import { SETTINGS, PUBLIC_SETTINGS } from "config/dbPaths";
import useDoc from "hooks/useDoc";
import { db } from "@src/firebase";
import { name } from "@root/package.json";

export interface IProjectSettingsChildProps {
  settings: Record<string, any>;
  updateSettings: (data: Record<string, any>) => void;
  publicSettings: Record<string, any>;
  updatePublicSettings: (data: Record<string, any>) => void;
}

export default function ProjectSettingsPage() {
  const snack = useSnackContext();

  const [settingsState] = useDoc({ path: SETTINGS }, { createIfMissing: true });
  const settings = settingsState.doc;
  const [updateSettings, , callPending] = useDebouncedCallback(
    (data: Record<string, any>) =>
      db
        .doc(SETTINGS)
        .update(data)
        .then(() =>
          snack.open({ message: "Saved", variant: "success", duration: 3000 })
        ),
    1000
  );

  const [publicSettingsState] = useDoc(
    { path: PUBLIC_SETTINGS },
    { createIfMissing: true }
  );
  const publicSettings = publicSettingsState.doc;
  const [updatePublicSettings, , callPendingPublic] = useDebouncedCallback(
    (data: Record<string, any>) =>
      db
        .doc(PUBLIC_SETTINGS)
        .update(data)
        .then(() =>
          snack.open({ message: "Saved", variant: "success", duration: 3000 })
        ),
    1000
  );

  useEffect(
    () => () => {
      callPending();
      callPendingPublic();
    },
    []
  );

  const childProps: IProjectSettingsChildProps = {
    settings,
    updateSettings,
    publicSettings,
    updatePublicSettings,
  };

  const sections = [
    { title: "About", Component: About },
    { title: `${name} Run`, Component: CloudRun, props: childProps },
    { title: "Authentication", Component: Authentication, props: childProps },
    { title: "Customization", Component: Customization, props: childProps },
  ];

  return (
    <Container maxWidth="sm" sx={{ px: 1, pt: 1, pb: 7 + 3 + 3 }}>
      {settingsState.loading || publicSettingsState.loading ? (
        <Fade in style={{ transitionDelay: "1s" }} unmountOnExit>
          <Stack spacing={4}>
            {new Array(sections.length).fill(null).map((_, i) => (
              <SettingsSkeleton key={i} />
            ))}
          </Stack>
        </Fade>
      ) : (
        <Stack spacing={4}>
          {sections.map(({ title, Component, props }, i) => (
            <SettingsSection title={title} transitionTimeout={(i + 1) * 100}>
              <Component {...(props as any)} />
            </SettingsSection>
          ))}
        </Stack>
      )}
    </Container>
  );
}
