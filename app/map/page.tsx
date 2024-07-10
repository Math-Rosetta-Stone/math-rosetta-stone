'use client';

import GameMap from './_components/gamemap';
import Dropdown, { DropdownItem } from './_components/dropdowndict';
import PracticeBadge from './_components/practicebadge';

const Map: React.FC = () => {
  const data: DropdownItem[] = [
    { id: 1, name: "function" }, { id: 2, name: "derivative" },
    { id: 3, name: "integral" }, { id: 4, name: "limit" },
    { id: 5, name: "slope" }, { id: 6, name: "tangent" }
  ];

  return (
    <>
      <div className="absolute top-0 left-1/4 w-1/2 p-4 z-20">
        <Dropdown id='dictionary' data={data} />
      </div>
      <div className='rounded-lg bg-blue-500 p-4 z-10'>
        <GameMap />
        <div className='absolute right-12 top-12'>
          <PracticeBadge/>
        </div>
      </div>
      
    </>
  );
};

export default Map;
