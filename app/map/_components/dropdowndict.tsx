import React, { useEffect, useState, useRef } from 'react'
import classNames from 'classnames';
import useOutsideClick from '../hooks/useOutsideClick';

export type DropdownItem = {
  id: number
  name: string
}

type DropdownProps = {
  id: string
  title?: string
  data: DropdownItem[]
  selectedId?: number
  position?: "top" | "buttom";
  onSelect?: (id: number) => void;
}

const Dropdown = ({
  id,
  title,
  data,
  selectedId,
  position = "top",
  onSelect = () => { }
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [selectedItem, setSelectedItem] = useState<DropdownItem | undefined>(
    selectedId ? data?.find((item) => item.id === selectedId) : undefined
  );

  const handleChange = (item: DropdownItem) => {
    setSelectedItem(item);
    onSelect && onSelect(item.id);
    setIsOpen(false);
  };

  useEffect(() => {
    if (selectedId && data) {
      const newSelectedItem = data.find((item) => item.id === selectedId);
      newSelectedItem && setSelectedItem(newSelectedItem);
    } else {
      setSelectedItem(undefined);
    }
  }, [selectedId, data]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick({
    ref: dropdownRef,
    handler: () => setIsOpen(false),
  });

  const dropdownClass = classNames(
    'absolute bg-gray-100 w-max max-h-52 overflow-y-auto py-3 rounded shadow-md z-10',
    {
      'top-full mt-2': position === 'top',
      'bottom-full mt-2': position === 'buttom'
    }
  );

  return (
    <div ref={dropdownRef} className='relative'>
      <button
        aria-label='Toggle dropdown'
        aria-haspopup='true'
        aria-expanded={isOpen}
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className=
        'flex justify-between items-center gap-5 rounded w-full py-2 px-4 bg-blue-500 text-white'
      >
        <span>{selectedItem?.name || title}</span>
        {/* <GoChevronDown
          size={20}
          className={classNames('transform duration-500 ease-in-out', {
            'rotate-180': isOpen,
          })}
        /> */}
      </button>
      {/* Open */}
      {isOpen && (
        <div aria-label='Dropdown menu' className={dropdownClass}>
          <ul
            role='menu'
            aria-labelledby={id}
            aria-orientation='vertical'
            className='leading-10'
          >
            {data?.map((item) => (
              <li
                key={item.id}
                onClick={() => handleChange(item)}
                className={classNames(
                  'flex items-center cursor-pointer hover:bg-gray-200 px-3',
                  { 'bg-gray-300': selectedItem?.id === item.id }
                )}
              >
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;