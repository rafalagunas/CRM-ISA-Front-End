import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Download,
  Upload,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import "./styles/Listado.css";

interface Lead {
  id: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  status: "nuevo" | "contactado" | "calificado" | "convertido";
  score: number;
  source: string;
  lastActivity: string;
  value: number;
}

const mockLeads: Lead[] = [
  {
    id: "1",
    company: "TechCorp Solutions",
    contact: "María García",
    email: "maria@techcorp.com",
    phone: "+34 600 123 456",
    status: "calificado",
    score: 85,
    source: "Website",
    lastActivity: "2024-01-15",
    value: 15000,
  },
  {
    id: "2",
    company: "Digital Innovations",
    contact: "Carlos López",
    email: "carlos@digital.com",
    phone: "+34 600 789 012",
    status: "contactado",
    score: 72,
    source: "LinkedIn",
    lastActivity: "2024-01-14",
    value: 8500,
  },
  {
    id: "3",
    company: "Future Systems",
    contact: "Ana Martínez",
    email: "ana@future.com",
    phone: "+34 600 345 678",
    status: "nuevo",
    score: 65,
    source: "Referido",
    lastActivity: "2024-01-13",
    value: 12000,
  },
  {
    id: "4",
    company: "NextGen Media",
    contact: "Diego Fernández",
    email: "diego@nextgen.com",
    phone: "+34 600 901 234",
    status: "convertido",
    score: 95,
    source: "Email Campaign",
    lastActivity: "2024-01-12",
    value: 25000,
  },
  {
    id: "5",
    company: "Smart Solutions",
    contact: "Laura Rodríguez",
    email: "laura@smart.com",
    phone: "+34 600 567 890",
    status: "nuevo",
    score: 58,
    source: "Google Ads",
    lastActivity: "2024-01-11",
    value: 6500,
  },
];

const statusColors = {
  nuevo: "bg-blue-100 text-blue-800",
  contactado: "bg-yellow-100 text-yellow-800",
  calificado: "bg-green-100 text-green-800",
  convertido: "bg-purple-100 text-purple-800",
};

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-yellow-600";
  return "text-red-600";
};

export default function Listado() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [sourceFilter, setSourceFilter] = useState<string>("todos");
  const [sortBy, setSortBy] = useState<string>("lastActivity");
  const [showFilters, setShowFilters] = useState(false);

  const filteredLeads = leads
    .filter((lead) => {
      const matchesSearch =
        lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "todos" || lead.status === statusFilter;
      const matchesSource =
        sourceFilter === "todos" || lead.source === sourceFilter;

      return matchesSearch && matchesStatus && matchesSource;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "score":
          return b.score - a.score;
        case "value":
          return b.value - a.value;
        case "company":
          return a.company.localeCompare(b.company);
        default:
          return (
            new Date(b.lastActivity).getTime() -
            new Date(a.lastActivity).getTime()
          );
      }
    });

  const uniqueSources = [...new Set(leads.map((lead) => lead.source))];

  return (
    <div className="listado-page">
      <div className="listado-container">
        {/* Header */}
        <div className="listado-header">
          <div className="listado-header__top">
            <div className="listado-header__content">
              <h1>Listado de Leads</h1>
              <p>Vista completa de todos los leads en el sistema</p>
            </div>
            <div className="listado-header__actions">
              <Button variant="outline" size="sm">
                <Download />
                Exportar
              </Button>
              <Button variant="outline" size="sm">
                <Upload />
                Importar
              </Button>
              <Button>
                <Plus />
                Nuevo Lead
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="listado-stats">
            <div className="listado-stats__card">
              <div className="listado-stats__content">
                <div className="listado-stats__info">
                  <h3>Total Leads</h3>
                  <p>{leads.length}</p>
                </div>
                <div className="listado-stats__icon listado-stats__icon--blue">
                  <Star />
                </div>
              </div>
            </div>
            <div className="listado-stats__card">
              <div className="listado-stats__content">
                <div className="listado-stats__info">
                  <h3>Calificados</h3>
                  <p>{leads.filter((l) => l.status === "calificado").length}</p>
                </div>
                <div className="listado-stats__icon listado-stats__icon--green">
                  <Star />
                </div>
              </div>
            </div>
            <div className="listado-stats__card">
              <div className="listado-stats__content">
                <div className="listado-stats__info">
                  <h3>Convertidos</h3>
                  <p>{leads.filter((l) => l.status === "convertido").length}</p>
                </div>
                <div className="listado-stats__icon listado-stats__icon--purple">
                  <Star />
                </div>
              </div>
            </div>
            <div className="listado-stats__card">
              <div className="listado-stats__content">
                <div className="listado-stats__info">
                  <h3>Valor Total</h3>
                  <p>
                    €
                    {leads
                      .reduce((sum, lead) => sum + lead.value, 0)
                      .toLocaleString()}
                  </p>
                </div>
                <div className="listado-stats__icon listado-stats__icon--orange">
                  <Star />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="listado-filters">
            <div className="listado-filters__main">
              <div className="listado-filters__search">
                <Search className="listado-filters__search-icon" />
                <input
                  type="text"
                  placeholder="Buscar por empresa, contacto o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="listado-filters__search-input"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter />
                Filtros
              </Button>
            </div>

            {showFilters && (
              <div className="listado-filters__advanced">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="listado-filters__select"
                >
                  <option value="todos">Todos los estados</option>
                  <option value="nuevo">Nuevo</option>
                  <option value="contactado">Contactado</option>
                  <option value="calificado">Calificado</option>
                  <option value="convertido">Convertido</option>
                </select>
                <select
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  className="listado-filters__select"
                >
                  <option value="todos">Todas las fuentes</option>
                  {uniqueSources.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="listado-filters__select"
                >
                  <option value="lastActivity">Última actividad</option>
                  <option value="score">Score más alto</option>
                  <option value="value">Valor más alto</option>
                  <option value="company">Nombre (A-Z)</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Leads Table */}
        <div className="listado-table">
          <div className="listado-table__container">
            <table className="listado-table__table">
              <thead className="listado-table__header">
                <tr>
                  <th>Empresa / Contacto</th>
                  <th>Estado</th>
                  <th>Score</th>
                  <th>Fuente</th>
                  <th>Valor</th>
                  <th>Última Actividad</th>
                  <th style={{ textAlign: "right" }}>Acciones</th>
                </tr>
              </thead>
              <tbody className="listado-table__body">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="listado-table__row">
                    <td className="listado-table__cell">
                      <div className="listado-table__lead-info">
                        <h4>{lead.company}</h4>
                        <div className="contact">{lead.contact}</div>
                        <div className="email">{lead.email}</div>
                      </div>
                    </td>
                    <td className="listado-table__cell">
                      <span
                        className={`listado-badge listado-badge--${lead.status}`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="listado-table__cell">
                      <div className="listado-score">
                        <span
                          className={`listado-score__value ${
                            lead.score >= 80
                              ? "listado-score__value--high"
                              : lead.score >= 60
                                ? "listado-score__value--medium"
                                : "listado-score__value--low"
                          }`}
                        >
                          {lead.score}
                        </span>
                        <div className="listado-score__bar">
                          <div
                            className="listado-score__fill"
                            style={{ width: `${lead.score}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="listado-table__cell">{lead.source}</td>
                    <td className="listado-table__cell">
                      €{lead.value.toLocaleString()}
                    </td>
                    <td className="listado-table__cell">
                      {new Date(lead.lastActivity).toLocaleDateString()}
                    </td>
                    <td className="listado-table__cell">
                      <div className="listado-actions">
                        <button className="listado-actions__btn listado-actions__btn--view">
                          <Eye />
                        </button>
                        <button className="listado-actions__btn listado-actions__btn--edit">
                          <Edit />
                        </button>
                        <button className="listado-actions__btn listado-actions__btn--delete">
                          <Trash2 />
                        </button>
                        <button className="listado-actions__btn">
                          <MoreVertical />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLeads.length === 0 && (
            <div className="listado-empty">
              <Search />
              <h3>No se encontraron leads</h3>
              <p>Intenta ajustar los filtros o términos de búsqueda</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
