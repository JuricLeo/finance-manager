import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col-reverse lg:flex-row md:h-screen">
      <div className="flex flex-1 flex-col justify-between h-full px-6 py-16 md:py-8 bg-black">
        <div className="flex items-center justify-center lg:justify-start">
          <Image src="/logo-light.svg" alt="Logo" width={100} height={100} />
          <p className="ml-4 text-white text-2xl">FinancialFocus</p>
        </div>
        <Image
          className="mx-auto py-16"
          src="/undraw.svg"
          width={500}
          height={100}
          alt="Chart"
        />
        <p className="text-white text-center lg:text-start">
          Automate your financial tracking, reducing manual effort and allowing
          you to focus on more important tasks.
        </p>
      </div>
      <div className="flex-1 flex justify-center items-center bg-white py-8 md:py-0">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
