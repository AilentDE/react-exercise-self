import { NavLink } from "react-router-dom";

const headerLinks = [
  { path: "/google", text: "Google" },
  { path: "/leaflet", text: "Leaflet" },
  { path: "/map8", text: "圖霸" },
];

const Header = () => {
  return (
    <div className="flex justify-between items-center p-2 mx-2 mb-2 shadow-md">
      <NavLink to="/" className="p-1 text-2xl font-bold">
        Map Test
      </NavLink>
      <nav>
        <ul className="flex space-x-2">
          {headerLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `p-1 rounded-sm border ${
                    isActive
                      ? "bg-gray-200 text-gray-900 border-gray-900"
                      : "text-gray-700 border-transparent hover:text-gray-900 hover:border-gray-500"
                  }`
                }
              >
                {link.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
