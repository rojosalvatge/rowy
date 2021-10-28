import { lazy, Suspense } from "react";
import { IExtensionModalStepProps } from "./ExtensionModal";
import useStateRef from "react-usestateref";

import FieldSkeleton from "components/SideDrawer/Form/FieldSkeleton";
import CodeEditorHelper from "@src/components/CodeEditor/CodeEditorHelper";
import { WIKI_LINKS } from "constants/externalLinks";

const CodeEditor = lazy(
  () => import("components/CodeEditor" /* webpackChunkName: "CodeEditor" */)
);

const additionalVariables = [
  {
    key: "change",
    description:
      "you can pass in field name to change.before.get() or change.after.get() to get changes",
  },
  {
    key: "triggerType",
    description: "triggerType indicates the type of the extension invocation",
  },
  {
    key: "fieldTypes",
    description:
      "fieldTypes is a map of all fields and its corresponding field type",
  },
  {
    key: "extensionConfig",
    description: "the configuration object of this extension",
  },
];

export default function Step3Conditions({
  extensionObject,
  setExtensionObject,
  setValidation,
  validationRef,
}: IExtensionModalStepProps) {
  const [, setConditionEditorActive, conditionEditorActiveRef] =
    useStateRef(false);

  return (
    <>
      <Suspense fallback={<FieldSkeleton height={200} />}>
        <CodeEditor
          value={extensionObject.conditions}
          minHeight={200}
          onChange={(newValue) => {
            setExtensionObject({
              ...extensionObject,
              conditions: newValue || "",
            });
          }}
          onValidStatusUpdate={({ isValid }) => {
            if (!conditionEditorActiveRef.current) return;
            setValidation({ ...validationRef.current!, condition: isValid });
          }}
          diagnosticsOptions={{
            noSemanticValidation: false,
            noSyntaxValidation: false,
            noSuggestionDiagnostics: true,
          }}
          onMount={() => setConditionEditorActive(true)}
          onUnmount={() => setConditionEditorActive(false)}
        />
      </Suspense>

      <CodeEditorHelper
        docLink={WIKI_LINKS.extensions}
        additionalVariables={additionalVariables}
      />
    </>
  );
}