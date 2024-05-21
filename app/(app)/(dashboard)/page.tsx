import HelloUser from "@/components/dashboard/hello-user";
import MoneySpentCard from "@/components/dashboard/money-spent-card";
import NewRecord from "@/components/dashboard/new-record";

const DashboardPage = () => {
  return ( 
    <div className="p-8">
      <HelloUser />
      <div className="flex flex-col xl:flex-row mt-6 gap-y-6 gap-x-4">
        <MoneySpentCard date="month" amount={150} />
        <MoneySpentCard date="week" amount={300} />
      </div>
      <NewRecord />
    </div>
   );
}
 
export default DashboardPage;