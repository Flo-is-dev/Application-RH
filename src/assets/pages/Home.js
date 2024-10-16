import Form from "./Form";

const Home = () => {
  return (
    <main className="bg-gradient-to-r from-yellow-200 to-pink-200 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-5xl my-10">
        <div className="sm:flex sm:flex-row">
          <div className="sm:w-1/2 bg-gradient-to-r from-pink-300 to-purple-600 flex justify-center items-center">
            {/* <img
              src="/bg.webp"
              loading="lazy"
              alt="Illustration"
              className="w-full h-full object-cover"
            /> */}
          </div>

          <div className="p-8 sm:w-1/2">
            <Form />
          </div>
        </div>
      </div>
    </main>
  );
};
export default Home;
