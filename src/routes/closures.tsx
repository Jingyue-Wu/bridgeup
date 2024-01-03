import { ClosureType } from "../../types";
import { useState, useEffect } from "react";
import ClosureCard from "../components/ClosureCard";

export default function Closures() {
  const [closures, setClosures] = useState<ClosureType[]>([]);
  const [isLoading, setIsloading] = useState(false);

  function fetchData() {
    const endpoint = "https://bridge-up-api.vercel.app/api/closures";
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setClosures(data.closures);
        console.log(data.closures);
        setIsloading(false);
      });
  }

  useEffect(() => {
    setIsloading(true);
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 600000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className='lg:m-auto lg:max-w-[40%] m-[5%]'>
        <h1 className='text-[32px] pt-1 my-5 font-title'>Closures</h1>

        {isLoading ? (
          <div className='border-0 my-5 p-5 rounded-[13px] mt-[30vh] bg-card dark:bg-card_d'>
            <h2 className=' text-lg font-thin text-center text-text2 dark:text-text2_d'>
              Loading...
            </h2>
          </div>
        ) : null
        }

        {!isLoading ? (
          closures.length !== 0 ? (
            closures.map((closure) => (
              <ClosureCard closure={closure} key={closure.id} />
            ))
          ) : (
            <div className='border-0 my-5 p-5 rounded-[13px] mt-[30vh] bg-card dark:bg-card_d'>
              <h2 className=' text-lg font-thin text-center text-text2 dark:text-text2_d'>
                There are currently no bridge closures
              </h2>
            </div>
          )
        ) : null}
      </div>
    </>
  );
}
