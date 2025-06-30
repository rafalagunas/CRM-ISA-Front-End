import { Contact, Plus, Search, Filter } from "lucide-react";
import "./styles/Contacts.css";

export default function Contacts() {
  return (
    <div className="leads-container">
      <div className="page-header">
        <div className="page-title">
          <h1>Contactos</h1>
          <p>Gestiona tu base de contactos</p>
        </div>
        <button className="primary-button">
          <Plus className="icon" />
          Nuevo Contacto
        </button>
      </div>

      {/* Search and Filters */}
      <div className="search-filters">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Buscar contactos..."
            className="search-input"
          />
        </div>
        <button className="filter-button">
          <Filter className="icon" />
          Filtros
        </button>
      </div>

      {/* Contacts Grid */}
      <div className="contacts-grid">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="contact-card">
            <div className="contact-header">
              <div className="contact-avatar">
                <Contact className="icon" />
              </div>
              <div className="contact-info">
                <h3>Contacto {i}</h3>
                <p>Cliente</p>
              </div>
            </div>
            <div className="contact-details">
              <p>📧 contacto{i}@example.com</p>
              <p>📱 +34 600 000 00{i}</p>
              <p>🏢 Empresa {i}</p>
            </div>
            <div className="contact-footer">
              <span>
                Último contacto: Hace {i} día{i > 1 ? "s" : ""}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
