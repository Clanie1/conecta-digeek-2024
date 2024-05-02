import { PiChartLineUpLight } from "react-icons/pi";
import { RiMoneyDollarCircleLine, RiGroup2Line } from "react-icons/ri";
import { MdAccessTime } from "react-icons/md";
import "./industrial.css";

const IndustrialEngineeringAnimation = () => {
  return (
    <div className="hidden lg:flex lg:flex-col justify-center items-center relative h-[90%] w-full">
      <PiChartLineUpLight className="absolute text-white text-[400px] floating1" />
      <RiMoneyDollarCircleLine className="absolute text-white text-[50px] top-2 left-12 floating2" />
      <RiGroup2Line className="absolute text-white text-[50px] right-16 bottom-12 floating3" />
      <MdAccessTime className="absolute text-white text-[50px] right-10 top-12 floating4" />
    </div>
  );
};

export default IndustrialEngineeringAnimation;
