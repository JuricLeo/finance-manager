import { ModeToggle } from "@/components/mode-toggle";

const SettingsPage = () => {
  return (
    <main className="p-8 space-y-6">
      <div className="flex items-center gap-x-2">
        <h2>Change the application's theme here:</h2>
        <ModeToggle />
      </div>
      <div className="flex items-center gap-x-2">
        <h2>Change the application's currency here:</h2>
      </div>
      <div className="flex items-center gap-x-2">
        <h2>Change the application's language here:</h2>
      </div>
    </main>
  );
};

export default SettingsPage;
