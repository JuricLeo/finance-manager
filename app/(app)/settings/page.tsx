import { ModeToggle } from "@/components/mode-toggle";
import { DataTable } from "@/components/settings/data-table";
import { columns } from "./columns";

const SettingsPage = () => {
  const data = [
    {
      name: "Coffee",
      emoji: "☕",
    },
  ];

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
      <div className="pt-4">
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  );
};

export default SettingsPage;
