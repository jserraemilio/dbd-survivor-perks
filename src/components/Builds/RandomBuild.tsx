import { useEffect, useState } from "react";
import perkData from "../Perks/perks.json";
import Perk from "../Perks/Perk";

export default function RandomBuild() {
  const [builds, setBuilds] = useState([[], [], []]);
  const [isLoading, setIsLoading] = useState(false);

  const getRandomBuild = () => {
    const generateBuild = () => {
      const selectedPerks = new Set();
      while (selectedPerks.size < 4) {
        const perk = perkData[Math.floor(Math.random() * perkData.length)];
        selectedPerks.add(perk);
      }
      return Array.from(selectedPerks);
    };

    const newBuilds = [generateBuild(), generateBuild(), generateBuild()];
    setBuilds(newBuilds);
  };

  const startSlotMachine = () => {
    setIsLoading(true);
    const interval = setInterval(() => {
      const randomBuilds = [
        Array.from(
          { length: 4 },
          () => perkData[Math.floor(Math.random() * perkData.length)]
        ),
        Array.from(
          { length: 4 },
          () => perkData[Math.floor(Math.random() * perkData.length)]
        ),
        Array.from(
          { length: 4 },
          () => perkData[Math.floor(Math.random() * perkData.length)]
        ),
      ];
      setBuilds(randomBuilds);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      getRandomBuild();
      setIsLoading(false);
    }, 1300);
  };

  useEffect(() => {
    startSlotMachine();
  }, []);

  return (
    <div className={`flex flex-col justify-center items-center mt-20`}>
      <h1 className="text-5xl font-bold mb-20">Random Builds</h1>
      <button
        className=" bg-[#1e2734] border border-[#ffffff1f] hover:bg-transparent rounded-lg px-4 py-2"
        onClick={() => startSlotMachine()}
        disabled={isLoading}
      >
        {isLoading ? "Rolling..." : "Roll it!"}
      </button>
      <div className="flex flex-col gap-16 md:gap-32">
        {builds.map((build, index) => (
          <div key={index} className="mt-6">
            <strong className="text-2xl">Random build #{index + 1}</strong>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:h-[256px]">
              {build.map((perk, perkIndex) => (
                <Perk key={perkIndex} perk={perk} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
