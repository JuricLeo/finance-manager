import ExpenseHistory from "@/components/analytics/expense-history";
import MostExpensesBar from "@/components/analytics/most-expenses-bar";
import MostExpensesPie from "@/components/analytics/most-expenses-pie";

const AnalyticsPage = () => {
  return ( 
    <main className="p-8 gap-y-4 flex flex-col justify-center">
      <MostExpensesPie />
      <MostExpensesBar />
      <ExpenseHistory />
    </main>
   );
}
 
export default AnalyticsPage;