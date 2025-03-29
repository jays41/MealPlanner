import { useEffect, useState, useRef } from "react";
import DropdownItem from "./DropdownItem";

import "./DropdownMenu.css";
import "./DropdownContent.css";
import "./DropdownButton.css";

const DropdownMenu = ({ buttonText, mealType, content, setId }) => {
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

  return (
    <div ref={dropdownRef} className="dropdown">
      <div
        onClick={toggleDropdown}
        className={`text-xl font-bold dropdown-btn ${open ? "button-open" : null}`}
        ref={buttonRef}>
        {buttonText}
      </div>
      <div
        className={`dropdown-content ${open ? "content-open" : null}`}
        style={{ dropdownTop: dropdownTop ? `${top}px` : "100%" }}
        ref={contentRef}
        >{mealType}
        {<>{content.map(item => <DropdownItem key={item.id} onClick={()=>selectItem(item)}>{`${item.name}`}</DropdownItem>)}</>}
      </div>
    </div>
  );
};

export default DropdownMenu;