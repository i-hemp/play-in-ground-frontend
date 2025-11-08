import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav
      style={{ width: "100%" }}
      className="p-4 bg-gray-800 text-white flex gap-4"
    >
      <Link className="hover:underline" to="/home">
        Home
      </Link>
      <Link className="hover:underline" to="/grounds">
        Grounds
      </Link>
      <Link className="hover:underline" to="/about">
        About
      </Link>
      <Link className="hover:underline" to="/Contact">
        Contact
      </Link>
    </nav>
  );
}

export default Navbar;

// <nav className="flex gap-6 bg-gray-800 p-4 text-white rounded-md">
