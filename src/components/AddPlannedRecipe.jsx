import { useState, useEffect, useRef } from 'react';
import { CgLayoutGrid } from 'react-icons/cg';
import { TbHexagonLetterV, TbMeat } from "react-icons/tb";
import { Link } from 'react-router-dom';
import DropdownMenu from './Dropdowns/DropdownMenu';
import DropdownItem from './Dropdowns/DropdownItem';

const AddPlannedRecipe = ({ mealType, recipes, setId }) => {

  const defaultTextStyle = {color: '#6366F1'};

  const hoverTextStyle = {color: '#E8628F'};

  const [textStyle, setTextStyle] = useState(defaultTextStyle);

  // Need to change what onClick() does

  const [open, setOpen] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);

  const dropdownRef = useRef();
  const buttonRef = useRef();
  const contentRef = useRef();

  const toggleDropdown = () => {
    if (!open) {
      const spaceRemaining =
        window.innerHeight - buttonRef.current.getBoundingClientRect().bottom;
      const contentHeight = contentRef.current.clientHeight;

      const topPosition =
        spaceRemaining > contentHeight
          ? null
          : -(contentHeight - spaceRemaining); // move up by height clipped by window
      setDropdownTop(topPosition);
    }

    setOpen((open) => !open);
  };

  useEffect(() => {
    const handler = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, [dropdownRef]);

  const selectItem = (item) => {
    setId(item.id);
  };

  const buttonText='+';

  return (
    <div ref={dropdownRef} className="dropdown">
      <button
      style={textStyle}
      onMouseEnter={() => {setTextStyle(hoverTextStyle);}}
      onMouseLeave={() => {setTextStyle(defaultTextStyle);}}
      onClick={toggleDropdown}
      className={`mb-3 w-full flex bg-white p-3.5 rounded-lg shadow-md text-center md:text-left justify-center text-xl font-bold dropdown-btn ${open ? "button-open" : null}`}
      ref={buttonRef}>
      {buttonText}
      
      <div
        className={`font-normal dropdown-content ${open ? "content-open" : null} text-base absolute z-50`}
        style={{ dropdownTop: dropdownTop ? `${top}px` : "100%", fontSize:'16px' }}
        ref={contentRef}>
        {mealType}
        {<>{recipes.filter((recipe) => {return recipe.type==mealType}).map(item => <DropdownItem key={item.id} onClick={()=>selectItem(item)}>{`${item.name}`}</DropdownItem>)}</>}
      </div>
      </button>
    </div>
  )
}

export default AddPlannedRecipe