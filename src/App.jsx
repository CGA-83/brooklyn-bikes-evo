import { useState } from "react";

const COLORS = {
  bg: "#0f1117",
  surface: "#1a1d27",
  card: "#22263a",
  accent: "#4f8ef7",
  accentDim: "#1e3a6e",
  text: "#e8eaf0",
  muted: "#7a7f9a",
  border: "#2e3250",
  success: "#3ecf8e",
  warning: "#f5a623",
  danger: "#e05c5c",
};

const initialData = {
  sistema: "Bicicletería",
  elementos: [
    { nombre: "Dueños", valor: "2: Lucía (administración) y Bruno (taller y ventas)" },
    { nombre: "Mecánicos", valor: "2 empleados de taller, full time" },
    { nombre: "Stock de bicicletas", valor: "bicicletas nuevas y usadas, rodados variados" },
    { nombre: "Repuestos e insumos", valor: "cámaras, cubiertas, frenos, cadenas, lubricantes" },
    { nombre: "Clientes", valor: "reparación frecuente + venta ocasional" },
  ],
  variables: [
    { nombre: "Horario de atención", valor: "lunes a sábados 9-13hs y 15-19hs" },
    { nombre: "Tiempo promedio de reparación", valor: "1-3 días según complejidad" },
    { nombre: "Precio promedio reparación", valor: "$8.000 servicio básico" },
    { nombre: "Precio promedio venta", valor: "$150.000 bicicleta nueva" },
    { nombre: "Stock de repuestos", valor: "sin sistema formal, control de memoria" },
  ],
  operaciones: [
    { nombre: "Recepción de bicicletas", valor: "sin orden de trabajo formal" },
    { nombre: "Reparación en taller", valor: "2 mecánicos, a veces saturados en temporada" },
    { nombre: "Venta de bicicletas", valor: "mayor demanda octubre-marzo" },
    { nombre: "Compra de repuestos", valor: "reactiva, se compra cuando falta" },
    { nombre: "Entrega al cliente", valor: "sin aviso formal, cliente llama para preguntar" },
  ],
};

const SUBSISTEMAS = ["Taller", "Ventas", "Repuestos", "Clientes", "Empleados", "Precios", "Otro..."];

const DATOS_PUNTUAL = {
  "Taller": {
    elementos: [
      { nombre: "Mecánico 1", valor: "senior, resuelve trabajos complejos, 8hs diarias" },
      { nombre: "Mecánico 2", valor: "junior, tareas básicas, en formación" },
      { nombre: "Herramientas", valor: "juego básico completo, sin equipos especializados" },
      { nombre: "Espacio de trabajo", valor: "2 puestos de taller, espacio ajustado" },
      { nombre: "Bicicletas en espera", valor: "promedio 5-8 unidades en cola simultánea" },
    ],
    variables: [
      { nombre: "Tiempo de reparación", valor: "1-3 días, hasta 5 en temporada alta" },
      { nombre: "Capacidad diaria", valor: "4-6 bicicletas entre los dos mecánicos" },
      { nombre: "Tasa de reingreso", valor: "estimado 10%, clientes que vuelven por el mismo problema" },
      { nombre: "Tiempo de espera del cliente", valor: "sin estimación formal, genera reclamos" },
    ],
    operaciones: [
      { nombre: "Diagnóstico", valor: "informal, sin orden de trabajo escrita" },
      { nombre: "Reparación", valor: "sin priorización formal, se atiende por orden de llegada" },
      { nombre: "Control de calidad", valor: "ninguno formal antes de entrega" },
      { nombre: "Registro de trabajos", valor: "no existe, sin historial por bicicleta" },
    ],
  },
  "Ventas": {
    elementos: [
      { nombre: "Bicicletas nuevas", valor: "10-15 unidades, rodados 20, 24 y 26" },
      { nombre: "Bicicletas usadas", valor: "5-8 unidades recibidas en parte de pago" },
      { nombre: "Accesorios", valor: "cascos, luces, candados, guantes: margen alto" },
      { nombre: "Local de exhibición", valor: "espacio reducido, pocas unidades visibles simultáneamente" },
      { nombre: "Competencia", valor: "2 biciclerías en radio de 10 cuadras" },
    ],
    variables: [
      { nombre: "Temporada alta", valor: "octubre a marzo, demanda duplica o triplica" },
      { nombre: "Precio bicicleta nueva", valor: "$150.000 promedio" },
      { nombre: "Precio bicicleta usada", valor: "$60.000 promedio" },
      { nombre: "Venta de accesorios", valor: "baja, no se ofrecen activamente" },
    ],
    operaciones: [
      { nombre: "Exhibición", valor: "estática, sin renovación ni destaque de productos" },
      { nombre: "Asesoramiento al cliente", valor: "informal, depende del dueño disponible" },
      { nombre: "Cierre de venta", valor: "efectivo o transferencia, sin financiación propia" },
      { nombre: "Postventa", valor: "ninguna formal, cliente no recibe seguimiento" },
    ],
  },
  "Repuestos": {
    elementos: [
      { nombre: "Repuestos críticos", valor: "cámaras, cadenas, frenos, cables: alta rotación" },
      { nombre: "Repuestos secundarios", valor: "manubrios, sillines, pedales: baja rotación" },
      { nombre: "Lubricantes e insumos", valor: "aceite, grasa, limpiadores: consumo diario" },
      { nombre: "Proveedor principal", valor: "mayorista de capital, entrega 1 vez por semana" },
      { nombre: "Proveedor local", valor: "más caro, usado en urgencias" },
    ],
    variables: [
      { nombre: "Stock disponible", valor: "sin inventario formal, control de memoria" },
      { nombre: "Quiebre de stock", valor: "frecuente en temporada alta, genera demoras" },
      { nombre: "Costo promedio repuesto", valor: "$3.000 básico, $15.000 componente complejo" },
      { nombre: "Tiempo de reposición", valor: "3-5 días por proveedor mayorista" },
    ],
    operaciones: [
      { nombre: "Compra de repuestos", valor: "reactiva, se compra cuando ya falta" },
      { nombre: "Control de inventario", valor: "ninguno formal, de memoria" },
      { nombre: "Pedido semanal", valor: "sin lista previa, se improvisa al momento" },
      { nombre: "Almacenamiento", valor: "desorganizado, difícil encontrar repuestos rápido" },
    ],
  },
  "Clientes": {
    elementos: [
      { nombre: "Clientes de reparación", valor: "base fija del barrio, ~150 activos" },
      { nombre: "Clientes de venta", valor: "ocasionales, pico en verano y navidad" },
      { nombre: "Clientes nuevos", valor: "llegan por recomendación o por pasar" },
      { nombre: "Clientes problemáticos", valor: "~5%, reclaman demoras o precios" },
    ],
    variables: [
      { nombre: "Frecuencia de visita", valor: "reparación: 2-3 veces/año por cliente" },
      { nombre: "Ticket reparación", valor: "$8.000 promedio" },
      { nombre: "Ticket venta", valor: "$150.000 bicicleta nueva" },
      { nombre: "Satisfacción", valor: "sin medición formal, percepción positiva general" },
    ],
    operaciones: [
      { nombre: "Recepción del cliente", valor: "informal, sin registro de datos de contacto" },
      { nombre: "Aviso de entrega lista", valor: "el cliente llama, no se avisa proactivamente" },
      { nombre: "Seguimiento post-entrega", valor: "ninguno formal" },
      { nombre: "Gestión de reclamos", valor: "caso por caso, sin protocolo definido" },
    ],
  },
  "Empleados": {
    elementos: [
      { nombre: "Mecánico 1", valor: "senior, full time, indispensable para trabajos complejos" },
      { nombre: "Mecánico 2", valor: "junior, full time, en desarrollo" },
      { nombre: "Lucía (dueña)", valor: "administración, atención al cliente, caja" },
      { nombre: "Bruno (dueño)", valor: "taller, ventas, decisiones operativas" },
    ],
    variables: [
      { nombre: "Carga de trabajo", valor: "muy alta en temporada, baja en invierno" },
      { nombre: "Ausentismo", valor: "sin registro, cubre el dueño cuando falta alguien" },
      { nombre: "Capacitación", valor: "ninguna formal, aprenden en el trabajo" },
      { nombre: "Dependencia clave", valor: "si falta Mecánico 1, el taller se paraliza" },
    ],
    operaciones: [
      { nombre: "Asignación de tareas", valor: "informal, decide el dueño en el momento" },
      { nombre: "Control de rendimiento", valor: "ninguno formal" },
      { nombre: "Comunicación interna", valor: "verbal, sin registros escritos" },
      { nombre: "Cobertura por ausencia", valor: "sin protocolo, genera caos operativo" },
    ],
  },
  "Precios": {
    elementos: [
      { nombre: "Precio de reparación", valor: "variable según trabajo, sin lista oficial" },
      { nombre: "Precio de bicicletas", valor: "markup 30% sobre costo, negociable" },
      { nombre: "Precio de accesorios", valor: "markup 50%, no se promocionan activamente" },
      { nombre: "Competencia directa", valor: "2 locales cercanos con precios similares" },
    ],
    variables: [
      { nombre: "Margen reparación", valor: "estimado 50%, sin cálculo formal" },
      { nombre: "Margen venta bicicletas", valor: "estimado 30%, se negocia a la baja" },
      { nombre: "Inflación de costos", valor: "repuestos suben semanalmente, precios no se actualizan" },
      { nombre: "Descuentos aplicados", valor: "frecuentes, sin política formal" },
    ],
    operaciones: [
      { nombre: "Fijación de precios", valor: "de memoria, sin lista de referencia actualizada" },
      { nombre: "Actualización de precios", valor: "irregular, no sigue la inflación de costos" },
      { nombre: "Comparación con competencia", valor: "no se hace formalmente" },
      { nombre: "Cotización al cliente", valor: "verbal, sin presupuesto escrito" },
    ],
  },
};

const Tag = ({ label, color }) => (
  <span style={{
    background: color + "22", color, border: `1px solid ${color}44`,
    borderRadius: 6, padding: "2px 10px", fontSize: 12, fontWeight: 600,
  }}>{label}</span>
);

const PriorityBar = ({ score, max }) => {
  const pct = Math.round((score / max) * 100);
  const color = pct > 66 ? COLORS.danger : pct > 33 ? COLORS.warning : COLORS.success;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1, background: COLORS.border, borderRadius: 4, height: 8, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, background: color, height: "100%", borderRadius: 4, transition: "width 0.6s" }} />
      </div>
      <span style={{ color, fontWeight: 700, fontSize: 13, minWidth: 36 }}>{score}</span>
    </div>
  );
};

function ItemEditor({ label, color, items, onChange }) {
  const [nombre, setNombre] = useState("");
  const [valor, setValor] = useState("");
  const add = () => {
    const n = nombre.trim(), v = valor.trim();
    if (n && v) { onChange([...items, { nombre: n, valor: v }]); setNombre(""); setValor(""); }
  };
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ color, fontWeight: 700, fontSize: 13, marginBottom: 10, letterSpacing: 1, textTransform: "uppercase" }}>{label}</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
        <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre..."
          style={{ flex: "1 1 120px", background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 12px", color: COLORS.text, fontSize: 13, outline: "none" }} />
        <input value={valor} onChange={e => setValor(e.target.value)} onKeyDown={e => e.key === "Enter" && add()} placeholder="Valor real..."
          style={{ flex: "2 1 160px", background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 12px", color: COLORS.text, fontSize: 13, outline: "none" }} />
        <button onClick={add} style={{ background: color + "22", border: `1px solid ${color}`, color, borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>+</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {items.map((item, i) => (
          <div key={i} style={{ background: COLORS.card, border: `1px solid ${color}33`, borderRadius: 10, padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <span style={{ fontWeight: 600, fontSize: 13 }}>{item.nombre}</span>
              <span style={{ color: COLORS.muted, fontSize: 13 }}> → {item.valor}</span>
            </div>
            <span onClick={() => remove(i)} style={{ cursor: "pointer", color: COLORS.muted, fontSize: 18, lineHeight: 1, paddingLeft: 8 }}>×</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [autenticado, setAutenticado] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [step, setStep] = useState("modo");
  const [modo, setModo] = useState(null);
  const [subsistema, setSubsistema] = useState("");
  const [subsistemaCustom, setSubsistemaCustom] = useState("");
  const [data] = useState(initialData);
  const [puntualData, setPuntualData] = useState({ elementos: [], variables: [], operaciones: [] });
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [comentarios, setComentarios] = useState("");

  const formatItems = (items) => items.map(i => `${i.nombre}: ${i.valor}`).join(" | ");

  const handleLogin = () => {
    const correcta = import.meta.env.VITE_PASSWORD ?? "";
    if (correcta && password === correcta) {
      setAutenticado(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };
  const subsistemaFinal = subsistema === "Otro..." ? subsistemaCustom : subsistema;

  const analyze = async () => {
    setStep("analyzing");
    setError(null);
    try {
      const esGeneral = modo === "general";
      const elementos = esGeneral ? data.elementos : puntualData.elementos;
      const variables = esGeneral ? data.variables : puntualData.variables;
      const operaciones = esGeneral ? data.operaciones : puntualData.operaciones;
      const contextoModo = esGeneral ? "Análisis GENERAL del sistema completo." : `Análisis PUNTUAL del subsistema: ${subsistemaFinal}.`;

      const prompt = `EVO: ${contextoModo} Analizá cruces E×V, E×O, V×E, V×O, O×E, O×V con los datos reales. Conclusiones basadas en valores concretos.

SISTEMA: ${data.sistema}${comentarios ? `\nCOMENTARIOS ADICIONALES DEL USUARIO (incluílos en el análisis): ${comentarios}` : ``}
ELEMENTOS: ${formatItems(elementos)}
VARIABLES: ${formatItems(variables)}
OPERACIONES: ${formatItems(operaciones)}

Respondé SOLO con JSON válido, sin texto ni backticks:
{"hallazgos":[{"problema":"nombre corto","apariciones":4,"descripcion":"explicacion basada en datos reales, max 25 palabras","recomendacion":"accion concreta y especifica, max 20 palabras","impacto":"alto"}],"kpis":[{"nombre":"nombre KPI","que_mide":"descripcion con valores de referencia del sistema","frecuencia":"diario"}],"resumen_cruces":[{"categoria_a":"copia EXACTA del nombre ingresado que genera el efecto","categoria_b":"copia EXACTA del nombre ingresado que recibe el efecto","insight":"hallazgo concreto max 15 palabras"}]}
Máximo 4 hallazgos y 4 KPIs.`;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 2000, messages: [{ role: "user", content: prompt }] })
      });

      if (!response.ok) throw new Error(`API error ${response.status}`);
      const raw = await response.json();
      if (!raw.content?.length) throw new Error("Respuesta vacía");
      const text = raw.content.map(i => i.text || "").join("");
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResults(parsed);
      setStep("results");
    } catch (err) {
      setError(`Error: ${err.message}`);
      setStep("input");
    }
  };

  const reset = () => { setStep("modo"); setModo(null); setSubsistema(""); setSubsistemaCustom(""); setResults(null); setError(null); setComentarios(""); setPuntualData({ elementos: [], variables: [], operaciones: [] }); };
  const impactoColor = (i) => i === "alto" ? COLORS.danger : i === "medio" ? COLORS.warning : COLORS.success;
  const maxApariciones = results ? Math.max(...results.hallazgos.map(h => h.apariciones)) : 1;

  if (!autenticado) {
    return (
      <div style={{ minHeight: "100vh", background: COLORS.bg, color: COLORS.text, fontFamily: "'Inter', system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ background: COLORS.surface, borderRadius: 20, padding: 40, border: `1px solid ${COLORS.border}`, width: "100%", maxWidth: 380, textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: COLORS.accent, textTransform: "uppercase", marginBottom: 8 }}>Framework Analítico</div>
          <h1 style={{ margin: "0 0 4px", fontSize: 28, fontWeight: 800 }}>
            <span style={{ color: COLORS.accent }}>EVO</span> Asistente
          </h1>
          <img src="data:image/png;base64,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" alt="Brooklyn Bikes" style={{ width: 80, height: 80, objectFit: "contain", margin: "16px auto", display: "block" }} />
          <p style={{ color: COLORS.muted, fontSize: 13, marginBottom: 24 }}>Ingresá la contraseña para acceder</p>
          <input
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setLoginError(false); }}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            placeholder="Contraseña"
            style={{
              width: "100%", background: COLORS.card, border: `1px solid ${loginError ? COLORS.danger : COLORS.border}`,
              borderRadius: 10, padding: "12px 16px", color: COLORS.text, fontSize: 15,
              outline: "none", boxSizing: "border-box", marginBottom: 8, textAlign: "center", letterSpacing: 4
            }}
          />
          {loginError && <p style={{ color: COLORS.danger, fontSize: 13, marginBottom: 8 }}>Contraseña incorrecta</p>}
          <button onClick={handleLogin} style={{
            width: "100%", background: COLORS.accent, color: "#fff", border: "none",
            borderRadius: 10, padding: "13px", fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 8
          }}>Ingresar</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, color: COLORS.text, fontFamily: "'Inter', system-ui, sans-serif", padding: "24px 16px" }}>

      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 11, letterSpacing: 3, color: COLORS.accent, textTransform: "uppercase", marginBottom: 6 }}>Framework Analítico</div>
        <h1 style={{ margin: 0, fontSize: 30, fontWeight: 800, letterSpacing: -1 }}>
          <span style={{ color: COLORS.accent }}>EVO</span> Asistente
        </h1>
        <img src="data:image/png;base64,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" alt="Brooklyn Bikes" style={{ width: 100, height: 100, objectFit: "contain", margin: "12px auto 0", display: "block" }} />
        <p style={{ color: COLORS.muted, margin: "8px 0 0", fontSize: 13 }}>Bicicletería · Datos reales · Resultados accionables</p>
      </div>

      {step === "modo" && (
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ color: COLORS.text, fontSize: 17, fontWeight: 700, marginBottom: 8 }}>¿Qué tipo de análisis querés hacer?</div>
            <div style={{ color: COLORS.muted, fontSize: 14 }}>Elegí el enfoque antes de cargar los datos</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
            <div onClick={() => { setModo("general"); setStep("input"); }} style={{ background: COLORS.surface, border: `2px solid ${COLORS.accent}`, borderRadius: 16, padding: 24, cursor: "pointer", textAlign: "center" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>🌐</div>
              <div style={{ fontWeight: 800, fontSize: 16, color: COLORS.accent, marginBottom: 8 }}>Análisis General</div>
              <div style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.5 }}>Analizás la bicicletería completa</div>
            </div>
            <div onClick={() => setModo("puntual")} style={{ background: COLORS.surface, border: `2px solid ${modo === "puntual" ? COLORS.warning : COLORS.border}`, borderRadius: 16, padding: 24, cursor: "pointer", textAlign: "center" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>🎯</div>
              <div style={{ fontWeight: 800, fontSize: 16, color: COLORS.warning, marginBottom: 8 }}>Análisis Puntual</div>
              <div style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.5 }}>Te enfocás en un área específica</div>
            </div>
          </div>

          {modo === "puntual" && (
            <div style={{ background: COLORS.surface, borderRadius: 16, padding: 20, border: `1px solid ${COLORS.warning}44`, marginBottom: 16 }}>
              <div style={{ color: COLORS.warning, fontWeight: 700, fontSize: 13, marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>¿Qué área querés analizar?</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: subsistema === "Otro..." ? 12 : 0 }}>
                {SUBSISTEMAS.map(s => (
                  <button key={s} onClick={() => setSubsistema(s)} style={{
                    background: subsistema === s ? COLORS.warning + "33" : COLORS.card,
                    border: `1px solid ${subsistema === s ? COLORS.warning : COLORS.border}`,
                    color: subsistema === s ? COLORS.warning : COLORS.text,
                    borderRadius: 20, padding: "6px 14px", cursor: "pointer", fontSize: 13, fontWeight: subsistema === s ? 700 : 400
                  }}>{s}</button>
                ))}
              </div>
              {subsistema === "Otro..." && (
                <input value={subsistemaCustom} onChange={e => setSubsistemaCustom(e.target.value)} placeholder="Escribí el área..."
                  style={{ width: "100%", background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 12px", color: COLORS.text, fontSize: 14, outline: "none", boxSizing: "border-box", marginTop: 8 }} />
              )}
              {subsistema && (subsistema !== "Otro..." || subsistemaCustom) && (
                <button onClick={() => { const d = DATOS_PUNTUAL[subsistema]; if (d) setPuntualData({...d}); else setPuntualData({ elementos: [], variables: [], operaciones: [] }); setStep("input"); }} style={{
                  width: "100%", background: COLORS.warning, color: "#000", border: "none",
                  borderRadius: 10, padding: "12px", fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 14
                }}>Continuar con "{subsistemaFinal}" →</button>
              )}
            </div>
          )}
        </div>
      )}

      {step === "input" && (
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span onClick={reset} style={{ color: COLORS.muted, cursor: "pointer", fontSize: 13 }}>← Cambiar modo</span>
            <Tag label={modo === "general" ? "🌐 Análisis General" : `🎯 Análisis Puntual · ${subsistemaFinal}`} color={modo === "general" ? COLORS.accent : COLORS.warning} />
          </div>

          <div style={{ background: COLORS.surface, borderRadius: 16, padding: 20, border: `1px solid ${modo === "general" ? COLORS.accent : COLORS.warning}`, marginBottom: 12 }}>
            <div style={{ color: COLORS.muted, fontSize: 11, textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 }}>① Sistema bajo análisis</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.text, marginBottom: modo === "puntual" ? 10 : 0 }}>{data.sistema}</div>
            {modo === "puntual" && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                <span style={{ color: COLORS.muted, fontSize: 13 }}>Área:</span>
                <span style={{ background: COLORS.warning + "22", color: COLORS.warning, border: `1px solid ${COLORS.warning}66`, borderRadius: 8, padding: "4px 14px", fontWeight: 700, fontSize: 14 }}>{subsistemaFinal}</span>
              </div>
            )}
          </div>

          <div style={{ background: COLORS.surface, borderRadius: 16, padding: 20, border: `1px solid ${COLORS.border}`, marginBottom: 12 }}>
            {modo === "general" ? (
              <>
                <ItemEditor label="② Elementos" color="#4f8ef7" items={data.elementos} onChange={(v) => setData(d => ({ ...d, elementos: v }))} />
                <ItemEditor label="③ Variables" color="#a78bfa" items={data.variables} onChange={(v) => setData(d => ({ ...d, variables: v }))} />
                <ItemEditor label="④ Operaciones" color="#3ecf8e" items={data.operaciones} onChange={(v) => setData(d => ({ ...d, operaciones: v }))} />
              </>
            ) : (
              <>
                <div style={{ background: COLORS.accentDim, borderRadius: 10, padding: "10px 14px", marginBottom: 16, border: `1px solid ${COLORS.warning}33` }}>
                  <span style={{ color: COLORS.warning, fontSize: 13 }}>Datos del área <strong>{subsistemaFinal}</strong> — editá o agregá los tuyos</span>
                </div>
                <ItemEditor label="② Elementos" color="#4f8ef7" items={puntualData.elementos} onChange={(v) => setPuntualData(d => ({ ...d, elementos: v }))} />
                <ItemEditor label="③ Variables" color="#a78bfa" items={puntualData.variables} onChange={(v) => setPuntualData(d => ({ ...d, variables: v }))} />
                <ItemEditor label="④ Operaciones" color="#3ecf8e" items={puntualData.operaciones} onChange={(v) => setPuntualData(d => ({ ...d, operaciones: v }))} />
              </>
            )}
          </div>

          <div style={{ background: COLORS.surface, borderRadius: 16, padding: 20, border: `1px solid ${COLORS.border}`, marginBottom: 12 }}>
            <div style={{ color: COLORS.muted, fontSize: 12, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>💬 Comentarios adicionales</div>
            <textarea
              value={comentarios}
              onChange={e => setComentarios(e.target.value)}
              placeholder="Agregá aquí cualquier información extra que quieras incluir en el análisis: contexto del negocio, problemas puntuales, situaciones recientes, dudas específicas..."
              rows={4}
              style={{
                width: "100%", background: COLORS.card, border: `1px solid ${COLORS.border}`,
                borderRadius: 10, padding: "12px 14px", color: COLORS.text, fontSize: 13,
                outline: "none", resize: "vertical", boxSizing: "border-box",
                fontFamily: "inherit", lineHeight: 1.6
              }}
            />
            <div style={{ color: COLORS.muted, fontSize: 11, marginTop: 6 }}>Esta información se incluirá en el análisis junto con los datos cargados</div>
          </div>

          <button onClick={analyze} style={{
            width: "100%", background: modo === "general" ? COLORS.accent : COLORS.warning,
            color: modo === "general" ? "#fff" : "#000", border: "none",
            borderRadius: 12, padding: "16px", fontSize: 16, fontWeight: 700, cursor: "pointer"
          }}>⑤ Ejecutar Análisis EVO</button>

          {error && <div style={{ textAlign: "center", color: COLORS.danger, marginTop: 12, fontSize: 13 }}>{error}</div>}
        </div>
      )}

      {step === "analyzing" && (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>{modo === "general" ? "🌐" : "🎯"}</div>
          <div style={{ color: modo === "general" ? COLORS.accent : COLORS.warning, fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
            {modo === "general" ? "Analizando bicicletería completa..." : `Analizando área: ${subsistemaFinal}...`}
          </div>
          <div style={{ color: COLORS.muted, fontSize: 14 }}>Procesando datos reales · Identificando hallazgos críticos</div>
        </div>
      )}

      {step === "results" && results && (
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <Tag label={modo === "general" ? "🌐 Análisis General" : `🎯 ${subsistemaFinal}`} color={modo === "general" ? COLORS.accent : COLORS.warning} />
            <span style={{ color: COLORS.muted, fontSize: 13 }}>{data.sistema}</span>
          </div>

          <div style={{ background: COLORS.surface, borderRadius: 16, padding: 20, border: `1px solid ${COLORS.border}`, marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>⑥ Hallazgos Priorizados</h2>
              <Tag label="Por frecuencia" color={COLORS.accent} />
            </div>
            {[...results.hallazgos].sort((a, b) => b.apariciones - a.apariciones).map((h, i) => (
              <div key={i} style={{ background: COLORS.card, borderRadius: 12, padding: 14, marginBottom: 10, border: `1px solid ${i === 0 ? COLORS.danger + "66" : COLORS.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{i === 0 ? "🔴 " : i === 1 ? "🟡 " : "🟢 "}{h.problema}</div>
                  <Tag label={`${h.apariciones} apariciones`} color={impactoColor(h.impacto)} />
                </div>
                <PriorityBar score={h.apariciones} max={maxApariciones} />
                <p style={{ color: COLORS.muted, fontSize: 13, margin: "10px 0 6px" }}>{h.descripcion}</p>
                <div style={{ background: COLORS.accentDim, borderRadius: 8, padding: "8px 12px", fontSize: 13, color: COLORS.accent }}>💡 {h.recomendacion}</div>
              </div>
            ))}
          </div>

          <div style={{ background: COLORS.surface, borderRadius: 16, padding: 20, border: `1px solid ${COLORS.border}`, marginBottom: 12 }}>
            <h2 style={{ margin: "0 0 14px", fontSize: 17, fontWeight: 700 }}>📊 KPIs Recomendados</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 10 }}>
              {results.kpis.map((k, i) => (
                <div key={i} style={{ background: COLORS.card, borderRadius: 12, padding: 14, border: `1px solid ${COLORS.border}` }}>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{k.nombre}</div>
                  <div style={{ color: COLORS.muted, fontSize: 12, marginBottom: 8 }}>{k.que_mide}</div>
                  <Tag label={k.frecuencia} color={COLORS.accent} />
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: COLORS.surface, borderRadius: 16, padding: 20, border: `1px solid ${COLORS.border}`, marginBottom: 12 }}>
            <h2 style={{ margin: "0 0 14px", fontSize: 17, fontWeight: 700 }}>🔗 Relaciones detectadas</h2>
            {(results.resumen_cruces || []).map((c, i) => (
              <div key={i} style={{ background: COLORS.card, borderRadius: 10, padding: "10px 14px", marginBottom: 8, borderLeft: `3px solid ${COLORS.accent}`, fontSize: 13 }}>
                <div style={{ marginBottom: 4 }}>
                  <span style={{ color: COLORS.accent, fontWeight: 700 }}>{c.categoria_a}</span>
                  <span style={{ color: COLORS.muted, margin: "0 8px" }}>→</span>
                  <span style={{ color: COLORS.warning, fontWeight: 700 }}>{c.categoria_b}</span>
                </div>
                <div style={{ color: COLORS.text }}>{c.insight}</div>
              </div>
            ))}
          </div>

          <button onClick={reset} style={{ width: "100%", background: "transparent", color: COLORS.muted, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "14px", fontSize: 14, cursor: "pointer" }}>
            ← Nuevo análisis
          </button>
        </div>
      )}
    </div>
  );
}
