import { Users, Plus, Search, Filter } from "lucide-react";
import "./styles/Leads.css";

export default function Leads() {
  return (
    <div className="leads-container">
      <div className="page-header">
        <div className="page-title">
          <h1>Leads</h1>
          <p>Gestiona tus leads y prospectos</p>
        </div>
        <button className="primary-button">
          <Plus className="icon" />
          Nuevo Lead
        </button>
      </div>

      {/* Search and Filters */}
      <div className="search-filters">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Buscar leads..."
            className="search-input"
          />
        </div>
        <button className="filter-button">
          <Filter className="icon" />
          Filtros
        </button>
      </div>

      {/* Leads Table */}
      <div className="content-card">
        <div className="card-header">
          <div className="card-header-content">
            <Users className="icon" />
            <h3>Lista de Leads</h3>
            <span className="badge">3 nuevos</span>
          </div>
        </div>
        <div className="card-content">
          <div className="items-list">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="list-item">
                <div className="item-content">
                  <div className="item-avatar">
                    <Users className="icon" />
                  </div>
                  <div className="item-info">
                    <h4>Lead {i}</h4>
                    <p>lead{i}@example.com</p>
                  </div>
                </div>
                <div className="item-meta">
                  <span className="status-badge green">Calificado</span>
                  <span className="item-time">
                    Hace {i} día{i > 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
