function Features() {
  return (
    <div className="pt-10 md:pt-20 mx-5">
      <h1 className="text-center text-blue-900 text-2xl sm:text-4xl font-bold">
        Why{" "}
        <span className="text-white bg-blue-900 rounded-xl p-2">
          online billing?
        </span>
      </h1>
      <div className="container flex flex-col items-center py-10 space-y-2 md:flex-row md:mx-auto md:space-x-5 md:px-20 md:mb-10 md:justify-around">
        <div className="flex items-center bg-blue-900 rounded-2xl p-6 w-full duration-150 md:h-48 md:px-0 hover:scale-105 cursor-pointer">
          <div className="flex flex-col text-center w-full">
            <h1 className="px-5 text-white text-xl font-bold">Convenience</h1>
            <p className="px-5 pt-2 text-white text-center">
              View and pay your bills online, from anywhere in the world.
            </p>
          </div>
        </div>
        <div className="flex items-center bg-blue-900 rounded-2xl p-6 w-full duration-150 md:h-48 md:px-0 hover:scale-105 cursor-pointer">
          <div className="flex flex-col text-center w-full">
            <h1 className="px-5 text-white text-xl font-bold">Transparency</h1>
            <p className="px-5 pt-2 text-white text-center">
              Get to know how your bill is calculated.
            </p>
          </div>
        </div>
        <div className="flex items-center bg-blue-900 rounded-2xl p-6 w-full duration-150 md:h-48 md:px-0 hover:scale-105 cursor-pointer">
          <div className="flex flex-col text-center w-full">
            <h1 className="px-5 text-white text-xl font-bold">Save Trees</h1>
            <p className="px-5 pt-2 text-white text-center">
              Reduce the environmental impact of by reducing paper usage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
