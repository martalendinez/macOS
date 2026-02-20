// src/components/windows/Settings/components/QuickActionsSection.jsx
import QuickAction from "./QuickAction";

export default function QuickActionsSection({ uiTheme, onDownloadResume }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <QuickAction uiTheme={uiTheme} label="Share portfolio" icon="↗" />
      <QuickAction uiTheme={uiTheme} label="Download Resume" icon="⬇" onClick={onDownloadResume} />
      <QuickAction uiTheme={uiTheme} label="Keyboard shortcuts" icon="⌘" />
      <QuickAction uiTheme={uiTheme} label="About this portfolio" icon="ℹ" />
    </div>
  );
}