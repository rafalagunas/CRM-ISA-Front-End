import { useLocation, Link } from "react-router-dom";
import { useThemeStore } from "../../zustand/themeStore";
import { useEffect, useState, useRef } from "react";
import {
  LayoutDashboard,
  Users,
  Contact,
  Target,
  Calendar,
  Megaphone,
  BrainCircuit,
  Mic,
  Bot,
  Share2,
  TrendingUp,
  Workflow,
  Shield,
  Link as LinkIcon,
  Code,
  TestTube,
  Plus,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  List,
  Upload,
  Brain,
  Star,
  Zap,
  MessageSquare,
  BarChart3,
} from "lucide-react";
import "./styles/Sidebar.css";

const navigationItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/",
  },
  {
    title: "Leads",
    icon: Users,
    url: "/leads",
    badge: "3",
    subItems: [
      {
        title: "Listado",
        icon: List,
        url: "/leads/listado",
      },
      {
        title: "Crear / Importar",
        icon: Upload,
        url: "/leads/crear-importar",
      },
      {
        title: "Análisis de Intenciones",
        icon: Brain,
        url: "/leads/analisis-intenciones",
      },
      {
        title: "Lead Scoring",
        icon: Star,
        url: "/leads/lead-scoring",
      },
      {
        title: "Automatizaciones",
        icon: Zap,
        url: "/leads/automatizaciones",
      },
      {
        title: "Interacciones",
        icon: MessageSquare,
        url: "/leads/interacciones",
      },
      {
        title: "Reportes",
        icon: BarChart3,
        url: "/leads/reportes",
      },
    ],
  },
  {
    title: "Contactos",
    icon: Contact,
    url: "/contacts",
  },
  {
    title: "Oportunidades",
    icon: Target,
    url: "/opportunities",
    badge: "5",
  },
  {
    title: "Actividades",
    icon: Calendar,
    url: "/activities",
  },
  {
    title: "Campañas",
    icon: Megaphone,
    url: "/campaigns",
  },
];

const analysisItems = [
  {
    title: "Análisis de comportamiento",
    icon: BrainCircuit,
    url: "/behavior-analysis",
  },
  {
    title: "Ajustes de voz",
    icon: Mic,
    url: "/voice-settings",
  },
  {
    title: "Aprendizaje automático",
    icon: Bot,
    url: "/machine-learning",
  },
  {
    title: "Análisis de redes sociales",
    icon: Share2,
    url: "/social-analysis",
  },
  {
    title: "Análisis de competencia",
    icon: TrendingUp,
    url: "/competition-analysis",
  },
  {
    title: "Optimización de campañas",
    icon: Target,
    url: "/campaign-optimization",
  },
];

const automationItems = [
  {
    title: "Flujos automatizados",
    icon: Workflow,
    url: "/automated-flows",
  },
  {
    title: "Permisos de cambios",
    icon: Shield,
    url: "/change-permissions",
  },
  {
    title: "Conexiones externas",
    icon: LinkIcon,
    url: "/external-connections",
  },
];

const developerItems = [
  {
    title: "Sandbox",
    icon: TestTube,
    url: "/sandbox",
  },
  {
    title: "Área de desarrolladores",
    icon: Code,
    url: "/developer-area",
  },
];

interface MenuItemProps {
  title: string;
  icon: React.ComponentType;
  url: string;
  badge?: string;
  isActive: boolean;
  isCollapsed: boolean;
  subItems?: Array<{
    title: string;
    icon: React.ComponentType;
    url: string;
  }>;
}

function MenuItem({
  title,
  icon: Icon,
  url,
  badge,
  isActive,
  isCollapsed,
  subItems,
}: MenuItemProps) {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [isTooltipPinned, setIsTooltipPinned] = useState(false);
  const location = useLocation();
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isTooltipPinned &&
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setIsTooltipPinned(false);
      }
    };

    if (isTooltipPinned) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isTooltipPinned]);

  const hasActiveSubItem = subItems?.some(
    (subItem) =>
      location.pathname === subItem.url ||
      location.pathname.startsWith(subItem.url + "/"),
  );

  const shouldShowAsActive = isActive || hasActiveSubItem;

  const handleClick = (e: React.MouseEvent) => {
    if (subItems && !isCollapsed) {
      e.preventDefault();
      setIsSubmenuOpen(!isSubmenuOpen);
    } else if (subItems && isCollapsed) {
      e.preventDefault();
      setIsTooltipPinned(!isTooltipPinned);
    }
  };

  return (
    <>
      <div
        style={{ position: "relative" }}
        className={
          subItems && isCollapsed ? "sidebar-menu-item-with-tooltip" : ""
        }
      >
        <Link
          to={subItems && !isCollapsed ? "#" : subItems ? subItems[0].url : url}
          className={`sidebar-menu-item ${
            shouldShowAsActive ? "sidebar-menu-item-active" : ""
          } ${isCollapsed ? "sidebar-menu-item-collapsed" : ""} ${
            subItems ? "sidebar-menu-item-submenu" : ""
          }`}
          onClick={handleClick}
        >
          <Icon className="sidebar-menu-icon" />
          <span className="sidebar-menu-text">{title}</span>
          {badge && <span className="sidebar-menu-badge">{badge}</span>}
          {subItems && !isCollapsed && (
            <ChevronDown
              className={`sidebar-chevron ${isSubmenuOpen ? "sidebar-chevron-open" : ""}`}
            />
          )}
        </Link>

        {/* Tooltip for collapsed state */}
        {subItems && isCollapsed && (
          <div
            ref={tooltipRef}
            className={`sidebar-submenu-tooltip ${isTooltipPinned ? "sidebar-submenu-tooltip-pinned" : ""}`}
            style={{
              top: "0px",
            }}
          >
            <div
              style={{
                fontWeight: "600",
                marginBottom: "8px",
                fontSize: "0.875rem",
                color: "var(--sidebar-foreground)",
                borderBottom: "1px solid var(--sidebar-border)",
                paddingBottom: "4px",
              }}
            >
              {title}
            </div>
            {subItems.map((subItem) => {
              const SubIcon = subItem.icon;
              const isSubItemActive = location.pathname === subItem.url;

              return (
                <Link
                  key={subItem.url}
                  to={subItem.url}
                  className={`sidebar-submenu-item ${
                    isSubItemActive ? "sidebar-submenu-item-active" : ""
                  }`}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 12px",
                    fontSize: "0.875rem",
                    color: "var(--sidebar-foreground)",
                  }}
                  onClick={() => setIsTooltipPinned(false)}
                >
                  <SubIcon
                    style={{ width: "16px", height: "16px", flexShrink: 0 }}
                  />
                  <span>{subItem.title}</span>
                </Link>
              );
            })}
            {isTooltipPinned && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsTooltipPinned(false);
                }}
                style={{
                  position: "absolute",
                  top: "4px",
                  right: "4px",
                  background: "transparent",
                  border: "none",
                  fontSize: "18px",
                  cursor: "pointer",
                  color: "var(--muted-foreground)",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--sidebar-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                ×
              </button>
            )}
          </div>
        )}
      </div>

      {subItems && !isCollapsed && (
        <div
          className={`sidebar-submenu ${isSubmenuOpen ? "sidebar-submenu-open" : ""}`}
        >
          {subItems.map((subItem) => {
            const SubIcon = subItem.icon;
            const isSubItemActive = location.pathname === subItem.url;

            return (
              <Link
                key={subItem.url}
                to={subItem.url}
                className={`sidebar-submenu-item ${
                  isSubItemActive ? "sidebar-submenu-item-active" : ""
                }`}
                style={{ position: "relative" }}
              >
                <SubIcon className="sidebar-menu-icon" />
                <span className="sidebar-menu-text">{subItem.title}</span>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}

interface MenuGroupProps {
  title?: string;
  children: React.ReactNode;
  isCollapsed: boolean;
}

function MenuGroup({ title, children, isCollapsed }: MenuGroupProps) {
  return (
    <div className="sidebar-menu-group">
      {title && !isCollapsed && (
        <div className="sidebar-group-title">{title}</div>
      )}
      <div className="sidebar-group-items">{children}</div>
    </div>
  );
}

export function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isDarkMode, toggleTheme } = useThemeStore();

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-theme" : "light-theme";
  }, [isDarkMode]);

  const isActive = (url: string) => {
    return location.pathname === url;
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <div
      className={`crm-sidebar ${isCollapsed ? "crm-sidebar-collapsed" : "crm-sidebar-expanded"}`}
    >
      {/* Header */}
      <div className="sidebar-header">
        <div
          className={`sidebar-logo-container ${isCollapsed ? "sidebar-logo-collapsed" : ""}`}
        >
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon" />
          </div>
          <h1
            className={`sidebar-title ${isCollapsed ? "sidebar-title-collapsed" : ""}`}
          >
            CRM
          </h1>
        </div>

        {/* Floating Toggle Button */}
        <button
          className="sidebar-toggle-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="toggle-icon" />
          ) : (
            <ChevronLeft className="toggle-icon" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="sidebar-content">
        <div className="sidebar-menu">
          {/* Main Navigation */}
          <MenuGroup isCollapsed={isCollapsed}>
            {navigationItems.map((item) => (
              <MenuItem
                key={item.url}
                title={item.title}
                icon={item.icon}
                url={item.url}
                badge={item.badge}
                isActive={isActive(item.url)}
                isCollapsed={isCollapsed}
                subItems={item.subItems}
              />
            ))}
          </MenuGroup>

          {/* Analysis Group */}
          <MenuGroup title="Análisis" isCollapsed={isCollapsed}>
            {analysisItems.map((item) => (
              <MenuItem
                key={item.url}
                title={item.title}
                icon={item.icon}
                url={item.url}
                isActive={isActive(item.url)}
                isCollapsed={isCollapsed}
              />
            ))}
          </MenuGroup>

          {/* Automation Group */}
          <MenuGroup title="Automatización" isCollapsed={isCollapsed}>
            {automationItems.map((item) => (
              <MenuItem
                key={item.url}
                title={item.title}
                icon={item.icon}
                url={item.url}
                isActive={isActive(item.url)}
                isCollapsed={isCollapsed}
              />
            ))}
          </MenuGroup>

          {/* Developer Group */}
          <MenuGroup title="Desarrollo" isCollapsed={isCollapsed}>
            {developerItems.map((item) => (
              <MenuItem
                key={item.url}
                title={item.title}
                icon={item.icon}
                url={item.url}
                isActive={isActive(item.url)}
                isCollapsed={isCollapsed}
              />
            ))}
          </MenuGroup>
        </div>
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        {/* Theme Toggle - Clean & Simple */}
        <div className="footer-theme-section">
          <button
            className={`theme-toggle ${isCollapsed ? "theme-collapsed" : ""}`}
            onClick={handleThemeToggle}
          >
            {isDarkMode ? (
              <Sun className="theme-icon" />
            ) : (
              <Moon className="theme-icon" />
            )}
            {!isCollapsed && (
              <span className="theme-text">
                {isDarkMode ? "Oscuro" : "Claro"}
              </span>
            )}
          </button>
        </div>

        {/* Action Button */}
        <button
          className={`footer-action-btn ${isCollapsed ? "action-collapsed" : ""}`}
        >
          <Plus className="action-icon" />
          {!isCollapsed && <span className="action-text">Nuevo</span>}
        </button>
      </div>
    </div>
  );
}
