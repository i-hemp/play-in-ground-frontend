import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function Navbar() {
  const { isLoggedIn, userInitial, logout } = useContext(AuthContext);
  return (
    <div style={{ position: "relative" }}>
      <nav
        style={{ width: "100%",height:"50px" }}
        className="p-4 bg-gray-800 text-white flex gap-4"
      >
        <Link className="hover:underline ml-2" to="/home">
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

        {isLoggedIn ? (
          <div
            style={{
              position: "absolute",
              top: "9px",
              right: "10px",
              display: "flex",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: "#2196F3",
                display: "flex",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              {userInitial}
            </div>
            <button className="cursor-pointer" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <div
            style={{
              position: "absolute",
              right: "10px",
            }}
          >
            <Link to="/auth">Login</Link>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
