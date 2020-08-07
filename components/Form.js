import React, { useState } from "react";

const Form = () => {
  const [hasPassword, setHasPassword] = useState(false);
  return (
    <div className="w-full mt-20">
      <div>
        <label className="text-lg text-gray-800">Delete after: </label>
        <select className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500">
          <option value="" key="" disabled>
            -- Select --
          </option>
          <option value="1" key="">
            1 Download
          </option>
          <option value="5" key="">
            5 Downloads
          </option>
          <option value="10" key="">
            10 Downloads
          </option>
          <option value="20" key="">
            20 Downloads
          </option>
        </select>
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center">
          <label className="text-lg text-gray-800 mr-2">
            Protect with password
          </label>
          <input
            type="checkbox"
            onChange={() => setHasPassword(!hasPassword)}
          />
        </div>
        {hasPassword ? (
          <input
            type="password"
            className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
          />
        ) : null}
      </div>
    </div>
  );
};

export default Form;
