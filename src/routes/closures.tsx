import { ClosureType } from "../../types";
import { useState, useEffect } from "react";
import ClosureCard from "../components/ClosureCard";

export default function Closures() {
  const [closures, setClosures] = useState<ClosureType[]>([]);

  function fetchData() {
    const endpoint = "https://bridge-up-api.vercel.app/api/closures";
    // const endpoint = "http://localhost:3000/api/closures";
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setClosures(data.closures);
        console.log(data.closures);
      });
  }

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 600000); // 10 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className='lg:m-auto lg:max-w-[40%] m-[5%]'>
        <h1 className='font-bold text-[28px] pt-2 my-5'>Closures</h1>
        {closures.length !== 0 ? (
          closures.map((closure) => (
            <ClosureCard closure={closure} key={closure.id} />
          ))
        ) : (
          <div className='border-0 my-5 p-5 rounded-[13px] mt-[30vh] bg-card dark:bg-card_d'>
            <h2 className=' text-lg font-thin text-center text-text2 dark:text-text2_d'>
              There are currently no bridge closures
            </h2>
          </div>
        )}
      </div>
    </>
  );
}
