import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-6 flex flex-col ">
      <div className="flex flex-col items-center justify-center text-center mt-20">
        <h1 className=" font-bold mb-4 p-2 text-7xl">Contact</h1>

        <div className="p-2 text-lg">
          Phone:
          <a href="tel:+911234123412" className="m-2 hover:underline">
            +91 12341 23412
          </a>
        </div>
        <div>
          Email:
          <a href="mailto:example@gmail.com" className="m-2 hover:underline">
            example@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
