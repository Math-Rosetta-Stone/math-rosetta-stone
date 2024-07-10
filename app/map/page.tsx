'use client';

import GameMap from './_components/gamemap';
import Dropdown from './_components/dropdowndict';
import { DropdownItem } from './_components/dropdowndict';

const Map: React.FC = () => {
  const data: DropdownItem[]= [{id: 1, name: "function"}, {id: 2, name: "derivative"}]
  return (
    <>
      <Dropdown id='dictionary' data={data}/>
      <div className='rounded-lg m-4 bg-blue-500 p-4'>
        <GameMap/>
      </div>
    </>
  );
};

export default Map;
