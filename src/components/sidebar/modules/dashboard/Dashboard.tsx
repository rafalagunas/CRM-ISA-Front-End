import {
  Users,
  Target,
  TrendingUp,
  DollarSign,
  Calendar,
  Phone,
  Mail,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Container, GridContainer } from "../../../shared/Container";
import { PageHeader } from "../../../shared/PageHeader";
import "./styles/Dashboard.css";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Leads",
      value: "2,847",
      change: "+12%",
      changeType: "positive" as const,
      icon: Users,
      description: "vs último mes",
    },
    {
      title: "Conversiones",
      value: "1,249",
      change: "+8%",
      changeType: "positive" as const,
      icon: Target,
      description: "vs último mes",
    },
    {
      title: "Ingresos",
      value: "$84,291",
      change: "-2%",
      changeType: "negative" as const,
      icon: DollarSign,
      description: "vs último mes",
    },
    {
      title: "Tasa de Conversión",
      value: "43.8%",
      change: "+5%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "vs último mes",
    },
  ];

  const recentLeads = [
    {
      name: "María González",
      company: "Tech Solutions",
      status: "Nuevo",
      value: "$12,500",
      lastContact: "Hace 2 horas",
    },
    {
      name: "Carlos Ruiz",
      company: "Digital Marketing Pro",
      status: "Calificado",
      value: "$8,900",
      lastContact: "Hace 4 horas",
    },
    {
      name: "Ana López",
      company: "Creative Studio",
      status: "Propuesta",
      value: "$15,200",
      lastContact: "Hace 1 día",
    },
    {
      name: "Juan Pérez",
      company: "Innovate Corp",
      status: "Negociación",
      value: "$22,000",
      lastContact: "Hace 2 días",
    },
  ];

  const activities = [
    {
      type: "call",
      icon: Phone,
      title: "Llamada programada",
      description: "Reunión con María González",
      time: "10:00 AM",
      status: "pending" as const,
    },
    {
      type: "email",
      icon: Mail,
      title: "Email enviado",
      description: "Propuesta enviada a Carlos Ruiz",
      time: "9:30 AM",
      status: "completed" as const,
    },
    {
      type: "meeting",
      icon: Calendar,
      title: "Reunión completada",
      description: "Demo con Ana López",
      time: "8:00 AM",
      status: "completed" as const,
    },
    {
      type: "message",
      icon: MessageSquare,
      title: "Mensaje recibido",
      description: "Juan Pérez respondió propuesta",
      time: "7:45 AM",
      status: "pending" as const,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Nuevo":
        return { backgroundColor: "#3b82f6", color: "white" };
      case "Calificado":
        return { backgroundColor: "#eab308", color: "white" };
      case "Propuesta":
        return { backgroundColor: "#8b5cf6", color: "white" };
      case "Negociación":
        return { backgroundColor: "#22c55e", color: "white" };
      default:
        return { backgroundColor: "#6b7280", color: "white" };
    }
  };

  return (
    <Container>
      <PageHeader title="Dashboard" subtitle="Resumen de tu actividad de CRM" />

      {/* Stats Grid */}
      <GridContainer variant="4-cols">
        {stats.map((stat) => (
          <div key={stat.title} className="dashboard-card stats-card">
            <div className="card-header">
              <div className="stats-card-header">
                <h3 className="stats-card-title">{stat.title}</h3>
                <stat.icon className="stats-card-icon" />
              </div>
            </div>
            <div className="card-content">
              <div className="stats-card-value">{stat.value}</div>
              <div className="stats-card-change">
                {stat.changeType === "positive" ? (
                  <ArrowUpRight className="stats-card-change-icon stats-card-change-positive" />
                ) : (
                  <ArrowDownRight className="stats-card-change-icon stats-card-change-negative" />
                )}
                <span
                  className={
                    stat.changeType === "positive"
                      ? "stats-card-change-positive"
                      : "stats-card-change-negative"
                  }
                >
                  {stat.change}
                </span>
                <span style={{ marginLeft: "0.25rem" }}>
                  {stat.description}
                </span>
              </div>
            </div>
          </div>
        ))}
      </GridContainer>

      {/* Main Content */}
      <GridContainer variant="2-1">
        {/* Recent Leads Card */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2 className="card-title">Leads Recientes</h2>
            <p className="card-description">Nuevos leads y oportunidades</p>
          </div>
          <div className="card-content">
            <div className="leads-list">
              {recentLeads.map((lead, index) => (
                <div key={index} className="lead-item">
                  <div className="lead-info">
                    <p className="lead-name">{lead.name}</p>
                    <p className="lead-company">{lead.company}</p>
                  </div>
                  <div className="lead-actions">
                    <span
                      className="lead-badge"
                      style={getStatusColor(lead.status)}
                    >
                      {lead.status}
                    </span>
                    <div className="lead-value-info">
                      <p className="lead-value">{lead.value}</p>
                      <p className="lead-contact-time">{lead.lastContact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Card */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2 className="card-title">Actividad Reciente</h2>
            <p className="card-description">Últimas acciones y eventos</p>
          </div>
          <div className="card-content">
            <div className="activity-list">
              {activities.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div
                    className={`activity-icon-container ${
                      activity.status === "completed"
                        ? "activity-icon-completed"
                        : "activity-icon-pending"
                    }`}
                  >
                    <activity.icon
                      className={`activity-icon ${
                        activity.status === "completed"
                          ? "activity-icon-completed-color"
                          : "activity-icon-pending-color"
                      }`}
                    />
                  </div>
                  <div className="activity-content">
                    <p className="activity-title">{activity.title}</p>
                    <p className="activity-description">
                      {activity.description}
                    </p>
                  </div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </GridContainer>

      {/* Progress Cards */}
      <GridContainer variant="equal">
        <div className="dashboard-card progress-card">
          <div className="card-header">
            <h2 className="card-title">Objetivo Mensual</h2>
            <p className="card-description">Progreso hacia la meta</p>
          </div>
          <div className="card-content">
            <div className="progress-content">
              <div className="progress-header">
                <span>$67,000 / $100,000</span>
                <span>67%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "67%" }} />
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card progress-card">
          <div className="card-header">
            <h2 className="card-title">Leads Este Mes</h2>
            <p className="card-description">Nuevos leads generados</p>
          </div>
          <div className="card-content">
            <div className="progress-content">
              <div className="progress-header">
                <span>847 / 1,000</span>
                <span>85%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "85%" }} />
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card progress-card">
          <div className="card-header">
            <h2 className="card-title">Conversiones</h2>
            <p className="card-description">Tasa de cierre</p>
          </div>
          <div className="card-content">
            <div className="progress-content">
              <div className="progress-header">
                <span>43.8% / 50%</span>
                <span>88%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "88%" }} />
              </div>
            </div>
          </div>
        </div>
      </GridContainer>
    </Container>
  );
}
