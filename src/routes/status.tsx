import { useState, useEffect } from "react";
import { BridgeType } from "../../types";
import Card from "../components/Card";

export default function Status() {
  const [bridges, setBridges] = useState<BridgeType[]>([]);

  function fetchData() {
    const endpoint = "https://bridge-up-api.vercel.app/api/bridges";
    // const endpoint = "http://localhost:3000/api/bridges";
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setBridges(data.bridges);
        console.log(data.bridges);
      });
  }

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className='lg:m-auto lg:max-w-[40%] m-[5%]'>
        <h1 className='text-3xl pt-2 my-5 font-semibold'>Bridge Status</h1>


        {bridges.map((bridge) => (
          <Card bridge={bridge} key={bridge.id} />
        ))}
      </div>
    </>
  );
}
