import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <div className="max-w-md mx-auto my-8 p-4 bg-white border-2 rounded-lg border-orange-300 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#eb9282,0_0_15px_#eb9282,0_0_30px_#eb9282]">
      This page does not exist,{" "}
      <NavLink className="text-orange-400 underline" to="/">
        go HOME
      </NavLink>
    </div>
  );
};
export default Error;
