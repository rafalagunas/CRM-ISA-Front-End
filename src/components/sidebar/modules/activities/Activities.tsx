import { Calendar } from "lucide-react";
import "./styles/Activities.css";

export default function Activities() {
  return (
    <div className="placeholder-container">
      <div className="placeholder-content">
        <Calendar className="placeholder-icon" />
        <h1 className="placeholder-title">Actividades</h1>
        <p className="placeholder-description">
          Gestiona tus actividades, tareas y calendario.
        </p>
        <div className="placeholder-card">
          <p>
            Esta página está en desarrollo. Aquí podrás gestionar todas tus
            actividades, programar tareas y ver tu calendario de eventos.
          </p>
        </div>
      </div>
    </div>
  );
}
