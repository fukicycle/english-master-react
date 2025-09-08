import { FaHome } from "react-icons/fa";
import { FaTags } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { Link } from "react-router-dom";
export const BottomNavMenu = () => {
  return (
    <>
      <nav className="border-t border-[var(--color-accent)]">
        <ul className="flex justify-around">
          <li>
            <Link
              to="/"
              className="flex flex-col items-center justify-center p-2 gap-2"
            >
              <FaHome className="size-6" />
              <p className="text-xs">Home</p>
            </Link>
          </li>
          <li>
            <Link
              to="/study"
              className="flex flex-col items-center justify-center p-2 gap-2"
            >
              <FaTags className="size-6" />
              <p className="text-xs">Study</p>
            </Link>
          </li>
          <li>
            <Link
              to="/words"
              className="flex flex-col items-center justify-center p-2 gap-2"
            >
              <FaListUl className="size-6" />
              <p className="text-xs">Words</p>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default BottomNavMenu;
