import { useState } from "react";
import {
  Plus,
  Upload,
  Download,
  FileText,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Button } from "../../../../ui/Button";
import "./styles/Crear.css";

export default function Crear() {
  const [activeTab, setActiveTab] = useState<"manual" | "import">("manual");
  const [formData, setFormData] = useState({
    company: "",
    contact: "",
    email: "",
    phone: "",
    position: "",
    website: "",
    source: "",
    notes: "",
    value: "",
    priority: "media",
  });
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importStatus, setImportStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  const [importResults, setImportResults] = useState({
    success: 0,
    errors: 0,
    total: 0,
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para crear el lead
    console.log("Creando lead:", formData);
    // Reset form
    setFormData({
      company: "",
      contact: "",
      email: "",
      phone: "",
      position: "",
      website: "",
      source: "",
      notes: "",
      value: "",
      priority: "media",
    });
    alert("Lead creado exitosamente!");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImportFile(file);
    }
  };

  const processImport = () => {
    if (!importFile) return;

    setImportStatus("processing");
    // Simular procesamiento
    setTimeout(() => {
      setImportResults({ success: 85, errors: 5, total: 90 });
      setImportStatus("success");
    }, 3000);
  };

  const downloadTemplate = () => {
    // Crear CSV template
    const headers =
      "Empresa,Contacto,Email,Teléfono,Cargo,Website,Fuente,Notas,Valor Estimado,Prioridad";
    const example =
      "Empresa Ejemplo,Juan Pérez,juan@empresa.com,+34 600 123 456,Director Comercial,https://empresa.com,Website,Interesado en nuestros servicios,15000,alta";
    const csvContent = `${headers}\n${example}`;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "plantilla_leads.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Crear / Importar Leads
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Agrega nuevos leads manualmente o importa desde archivos CSV/Excel
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("manual")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "manual"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Crear Manual
              </button>
              <button
                onClick={() => setActiveTab("import")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "import"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Upload className="w-4 h-4 inline mr-2" />
                Importación Masiva
              </button>
            </nav>
          </div>
        </div>

        {activeTab === "manual" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold">Crear Nuevo Lead</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Completa la información del lead para agregarlo al sistema
              </p>
            </div>
            <div className="p-6">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Empresa *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nombre de la empresa"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Persona de contacto *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contact}
                      onChange={(e) =>
                        setFormData({ ...formData, contact: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nombre del contacto principal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="contacto@empresa.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+34 600 000 000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Cargo/Posición
                    </label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) =>
                        setFormData({ ...formData, position: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Director Comercial, CEO, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) =>
                        setFormData({ ...formData, website: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://empresa.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Fuente
                    </label>
                    <select
                      value={formData.source}
                      onChange={(e) =>
                        setFormData({ ...formData, source: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Seleccionar fuente</option>
                      <option value="Website">Website</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Google Ads">Google Ads</option>
                      <option value="Referido">Referido</option>
                      <option value="Email Campaign">Email Campaign</option>
                      <option value="Evento">Evento</option>
                      <option value="Llamada fría">Llamada fría</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Valor Estimado (€)
                    </label>
                    <input
                      type="number"
                      value={formData.value}
                      onChange={(e) =>
                        setFormData({ ...formData, value: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="15000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Prioridad
                  </label>
                  <div className="flex gap-4">
                    {["baja", "media", "alta"].map((priority) => (
                      <label key={priority} className="flex items-center">
                        <input
                          type="radio"
                          name="priority"
                          value={priority}
                          checked={formData.priority === priority}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              priority: e.target.value,
                            })
                          }
                          className="mr-2"
                        />
                        <span className="capitalize">{priority}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Notas adicionales
                  </label>
                  <textarea
                    rows={4}
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Información adicional sobre el lead..."
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                  <Button type="submit">Crear Lead</Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === "import" && (
          <div className="space-y-6">
            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex">
                <AlertCircle className="w-5 h-5 text-blue-400 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-blue-800">
                    Instrucciones para la importación
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <ul className="list-disc list-inside space-y-1">
                      <li>
                        El archivo debe estar en formato CSV o Excel (.xlsx)
                      </li>
                      <li>
                        La primera fila debe contener los encabezados de columna
                      </li>
                      <li>
                        Los campos Empresa, Contacto y Email son obligatorios
                      </li>
                      <li>
                        Descarga la plantilla para ver el formato correcto
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Template Download */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="w-8 h-8 text-green-600 mr-3" />
                  <div>
                    <h3 className="text-lg font-medium">
                      Plantilla de Importación
                    </h3>
                    <p className="text-sm text-gray-600">
                      Descarga la plantilla con el formato correcto para
                      importar leads
                    </p>
                  </div>
                </div>
                <Button onClick={downloadTemplate} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Plantilla
                </Button>
              </div>
            </div>

            {/* File Upload */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-4">Subir Archivo</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <div className="mb-4">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-500 font-medium">
                      Selecciona un archivo
                    </span>
                    <span className="text-gray-600">
                      {" "}
                      o arrastra y suelta aquí
                    </span>
                    <input
                      id="file-upload"
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-500">CSV, XLSX hasta 10MB</p>
              </div>

              {importFile && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-gray-600 mr-2" />
                      <span className="text-sm font-medium">
                        {importFile.name}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">
                        ({(importFile.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <Button
                      onClick={processImport}
                      disabled={importStatus === "processing"}
                      size="sm"
                    >
                      {importStatus === "processing"
                        ? "Procesando..."
                        : "Importar"}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Import Results */}
            {importStatus === "processing" && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
                  <span>Procesando archivo...</span>
                </div>
              </div>
            )}

            {importStatus === "success" && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium text-green-800">
                      Importación Completada
                    </h3>
                    <div className="mt-2 space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Total de registros:</span>{" "}
                        {importResults.total}
                      </p>
                      <p>
                        <span className="font-medium text-green-600">
                          Importados exitosamente:
                        </span>{" "}
                        {importResults.success}
                      </p>
                      {importResults.errors > 0 && (
                        <p>
                          <span className="font-medium text-red-600">
                            Errores:
                          </span>{" "}
                          {importResults.errors}
                        </p>
                      )}
                    </div>
                    <div className="mt-4">
                      <Button onClick={() => setImportStatus("idle")} size="sm">
                        Importar Otro Archivo
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
