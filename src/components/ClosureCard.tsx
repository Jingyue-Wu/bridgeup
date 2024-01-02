import { ClosureType } from "../../types";

export default function ClosureCard({ closure }: { closure: ClosureType }) {
  const bridges: Record<number, string> = {
    1: "Lakeshore Rd.",
    2: "Carlton St.",
    3: "Queenston St.",
    4: "Glendale Ave.",
    5: "Highway 20",
    6: "Main St.",
    7: "Mellanby Ave.",
    8: "Clarence St.",
  };

  function getBridgeName(id: number): string {
    return bridges[id];
  }

  return (
    <>
      <div className='border-0 my-5 p-5 rounded-[13px] bg-card dark:bg-card_d'>
        <h1 className='text-xl mb-5'>{getBridgeName(closure.bridge_id)}</h1>
        <h2 className=' text-sm font-thin mb-5 text-text2 dark:text-text2_d'>
          Closed from: {closure.time_string}
        </h2>
        <h1 className='text-sm font-thin text-text2 dark:text-text2_d'>
          Closed for: {closure.closed_for}
        </h1>
        <h1 className='text-2xl font-semibold mt-5 text-primary'>
          {closure.purpose}
        </h1>
      </div>
    </>
  );
}
