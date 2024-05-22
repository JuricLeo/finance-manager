import Navbar from "@/components/global/navbar";
import Sidebar from "@/components/global/sidebar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full overflow-x-hidden">
      <div className="w-full h-20 md:pl-56 fixed z-50 bg-background">
        <Navbar />
      </div>
      <div className="hidden md:flex w-56 h-full flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-20 h-full">{children}</main>
    </div>
  );
};

export default AppLayout;
