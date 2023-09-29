function NeedHelp() {
  return (
    <div className="bg-blue-400 pt-10 md:pt-16 md:pb-10">
      <h1 className="text-center text-white font-bold text-2xl px-5 sm:text-4xl">
        <span className="text-blue-400 bg-white rounded-xl p-2">Need help</span>{" "}
        in setting up?
      </h1>
      <div className="flex flex-col items-center mx-auto py-10 space-y-2 md:flex-row md:px-20 md:justify-around lg:divide-x md:divide-white">
        <div className="flex items-center text-white px-6 py-2 w-full cursor-pointer md:py-0 md:px-0 hover:text-blue-100">
          <div className="flex flex-col text-center w-full">
            <h1>Call Us</h1>
            <p>(+94) 11 1122333</p>
          </div>
        </div>
        <div className="flex items-center text-white px-6 py-2 w-full cursor-pointer md:py-0 md:px-0 hover:text-blue-100">
          <div className="flex flex-col text-center w-full">
            <h1>Email Us</h1>
            <p>customersupport@ceb.com</p>
          </div>
        </div>
        <div className="flex items-center text-white px-6 py-2 w-full cursor-pointer md:py-0 md:px-0 hover:text-blue-100">
          <div className="flex flex-col text-center w-full">
            <h1>Social Media</h1>
            <p>CEB Customer Support</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NeedHelp;
