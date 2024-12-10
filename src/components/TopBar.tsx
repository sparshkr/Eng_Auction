export default function Topbar() {
  return (
    <div className="w-[100%] flex flex-row justify-between items-center pt-2 px-2 text-md">
      <button className="bg-[#dddde0] rounded-lg px-2 text-md top-2 bg-opacity-50 text-white ">
        5,999
      </button>

      <button className="bg-[#dddde0] w-7 h-7 flex flex-col justify-evenly items-center rounded-lg top-2 bg-opacity-50">
        <span className="block w-3 border-t-1 border border-white"></span>
        <span className="block w-3 border-t-1 border border-white"></span>
        <span className="block w-3 border-t-1 border border-white"></span>
      </button>
    </div>
  );
}
