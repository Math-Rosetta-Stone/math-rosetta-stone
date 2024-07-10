'use client';

import GameMap from './_components/gamemap';
import Dropdown from './_components/dropdowndict';
import { DropdownItem } from './_components/dropdowndict';
import './map.css';

const Map: React.FC = () => {
  const data: DropdownItem[]= [{id: 1, name: "set"}]
  return (
    <>
      <Dropdown id='dictionary' data={data}/>
      <GameMap/>
    </>
  );
};

export default Map;
