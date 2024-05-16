import { UserButton } from "@clerk/nextjs";

const DashboardPage = () => {
  return ( 
    <div>
      hello
      <UserButton afterSignOutUrl="/landing" />
    </div>
   );
}
 
export default DashboardPage;