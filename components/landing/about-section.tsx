import { BarChart3, Clock, Smile } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="flex flex-col mt-36">
      <h1 className="text-4xl mb-8 text-center">Why FinancialFocus?</h1>
      <div className="flex flex-col lg:flex-row justify-around gap-y-4">
        <div className="text-center bg-slate-900 p-6 rounded-sm max-w-[40rem] mx-auto lg:w-[18rem]">
          <Clock size={50} className="mx-auto" />
          <h2 className="text-2xl my-6">Saves Time</h2>
          <p>
            Automate your financial tracking and budgeting, reduces manual
            effort and allows you to focus on more important tasks.
          </p>
        </div>
        <div className="text-center bg-slate-900 p-6 rounded-sm max-w-[40rem] mx-auto lg:w-[18rem]">
          <BarChart3 size={50} className="mx-auto" />
          <h2 className="text-2xl my-6">Detailed Analytics</h2>
          <p>
            Gain insights into your spending patterns with comprehensive reports
            and visualizations, helps you make informed financial decisions.
          </p>
        </div>
        <div className="text-center bg-slate-900 p-6 rounded-sm max-w-[40rem] mx-auto lg:w-[18rem]">
          <Smile size={50} className="mx-auto" />
          <h2 className="text-2xl my-6">Simple</h2>
          <p>
            User-friendly design and intuitive features make it easy for anyone
            to manage their finances, regardless of their tech skills.
          </p>
        </div>
      </div>
    </section>
  );
}
