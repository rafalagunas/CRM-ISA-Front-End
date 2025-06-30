
import { Bell, User, Search } from "lucide-react";
import "./styles/Header.css";

export function Header() {
  return (
    <header className="header">
      <div className="header-left">
        {/* <SidebarTrigger /> */}

        {/* Pure CSS Search Bar */}
        <div className="search-container">
          <Search className="search-icon" />
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
      </div>

      <div className="header-right">
        {/* Pure CSS Notification Button */}
        <button className="notification-button">
          <Bell />
        </button>

        {/* Pure CSS User Avatar */}
        <div className="user-avatar">
          <User className="user-icon" />
        </div>
      </div>
    </header>
  );
}
