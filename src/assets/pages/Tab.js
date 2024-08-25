import MyTable from "../components/TableContainer";

const Tab = () => {
  return (
    <main className="bg-gradient-to-r from-yellow-200 to-pink-200 min-h-screen flex items-center justify-center flex-col">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-5xl my-10 p-10 ">
        <h1 className="text-3xl mb-6 font-semibold text-center text-gray-800">
          Current Employees
        </h1>
        <MyTable />
      </div>
      <a
        href="/"
        className="text-pink-500 hover:text-pink-700  mb-4 block underline"
      >
        Home
      </a>
    </main>
  );
};
export default Tab;
