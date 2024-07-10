import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import { FaChevronDown } from 'react-icons/fa';
import useOutsideClick from '../hooks/useOutsideClick';

export type DropdownItem = {
  id: number;
  name: string;
};

type DropdownProps = {
  id: string;
  title?: string;
  data: DropdownItem[];
  selectedId?: number;
  position?: "top" | "bottom";
  onSelect?: (id: number) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ id, title, data, selectedId, position = "bottom", onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setIsOpen(false));

  const handleSelect = (id: number) => {
    if (onSelect) onSelect(id);
    setIsOpen(false);
  };

  const selectedName = data.find(item => item.id === selectedId)?.name || title || "Select a term";

  return (
    <div className="relative inline-block w-full" ref={ref}>
      <div
        id={id}
        className="flex justify-between items-center bg-blue-200 bg-opacity-50 p-2 rounded cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="mx-auto">{selectedName}</span>
        <FaChevronDown className="ml-2" />
      </div>
      {isOpen && (
        <div className={classNames(
          "absolute w-full bg-white border border-gray-300 rounded mt-1 z-10",
          position === "bottom" ? "top-full" : "bottom-full"
        )}>
          <div className="grid grid-cols-4 gap-2 p-2">
            {data.map(item => (
              <div
                key={item.id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(item.id)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
