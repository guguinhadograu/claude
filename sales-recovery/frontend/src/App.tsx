import { useState, useEffect } from "react";
import { Phone, MessageCircle, TrendingUp, Users, Zap, RefreshCw, Plus, CheckCircle } from "lucide-react";

const API = "/api";

type LeadStatus = "new" | "contacted" | "recovered" | "lost" | "do_not_contact";

interface Lead {
  id: number;
  name: string;
  phone: string;
  email?: string;
  product?: string;
  cart_value?: number;
  abandonment_reason?: string;
  status: LeadStatus;
  created_at: string;
}

interface Stats {
  total_leads: number;
  recovered: number;
  contacted: number;
  recovery_rate: number;
  recovered_value: number;
  contacts_sent: number;
}

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: "#3b82f6",
  contacted: "#f59e0b",
  recovered: "#10b981",
  lost: "#ef4444",
  do_not_contact: "#6b7280",
};

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "Novo",
  contacted: "Contatado",
  recovered: "Recuperado",
  lost: "Perdido",
  do_not_contact: "Opt-out",
};

function StatCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string | number; sub?: string }) {
  return (
    <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 12, padding: "20px 24px", display: "flex", gap: 16, alignItems: "center" }}>
      <div style={{ background: "#252525", borderRadius: 10, padding: 12 }}>{icon}</div>
      <div>
        <div style={{ fontSize: 13, color: "#888", marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 26, fontWeight: 700, color: "#fff" }}>{value}</div>
        {sub && <div style={{ fontSize: 12, color: "#555", marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}

function AddLeadModal({ onClose, onAdded }: { onClose: () => void; onAdded: () => void }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", product: "", cart_value: "", abandonment_reason: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const body = { ...form, cart_value: form.cart_value ? parseFloat(form.cart_value) : undefined };
    await fetch(`${API}/leads/`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setLoading(false);
    onAdded();
    onClose();
  };

  const inputStyle = { width: "100%", background: "#252525", border: "1px solid #333", borderRadius: 8, padding: "10px 14px", color: "#e0e0e0", fontSize: 14, outline: "none" };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
      <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 16, padding: 32, width: 480, maxWidth: "95vw" }}>
        <h2 style={{ marginBottom: 24, fontSize: 18 }}>Adicionar Lead</h2>
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <input style={inputStyle} placeholder="Nome *" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          <input style={inputStyle} placeholder="Telefone (+5511...) *" required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
          <input style={inputStyle} placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          <input style={inputStyle} placeholder="Produto / Carrinho" value={form.product} onChange={e => setForm(f => ({ ...f, product: e.target.value }))} />
          <input style={inputStyle} type="number" step="0.01" placeholder="Valor do carrinho (R$)" value={form.cart_value} onChange={e => setForm(f => ({ ...f, cart_value: e.target.value }))} />
          <input style={inputStyle} placeholder="Motivo do abandono" value={form.abandonment_reason} onChange={e => setForm(f => ({ ...f, abandonment_reason: e.target.value }))} />
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <button type="button" onClick={onClose} style={{ flex: 1, padding: "10px", background: "#252525", border: "1px solid #333", borderRadius: 8, color: "#e0e0e0", cursor: "pointer" }}>Cancelar</button>
            <button type="submit" disabled={loading} style={{ flex: 1, padding: "10px", background: "#3b82f6", border: "none", borderRadius: 8, color: "#fff", cursor: "pointer", fontWeight: 600 }}>
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [recovering, setRecovering] = useState<Set<number>>(new Set());
  const [showAdd, setShowAdd] = useState(false);
  const [filter, setFilter] = useState<LeadStatus | "all">("all");

  const fetchData = async () => {
    const [s, l] = await Promise.all([
      fetch(`${API}/leads/stats`).then(r => r.json()),
      fetch(`${API}/leads/?limit=100${filter !== "all" ? `&status=${filter}` : ""}`).then(r => r.json()),
    ]);
    setStats(s);
    setLeads(l);
  };

  useEffect(() => { fetchData(); }, [filter]);

  const triggerRecovery = async (id: number) => {
    setRecovering(s => new Set(s).add(id));
    await fetch(`${API}/recovery/${id}`, { method: "POST" });
    setTimeout(() => {
      setRecovering(s => { const n = new Set(s); n.delete(id); return n; });
      fetchData();
    }, 3000);
  };

  const triggerAll = async () => {
    setLoading(true);
    await fetch(`${API}/recovery/bulk/all-new`, { method: "POST" });
    setTimeout(() => { setLoading(false); fetchData(); }, 4000);
  };

  const updateStatus = async (id: number, status: LeadStatus) => {
    await fetch(`${API}/leads/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    fetchData();
  };

  return (
    <div style={{ minHeight: "100vh", padding: "32px 24px", maxWidth: 1200, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#fff" }}>Sales Recovery AI</h1>
          <p style={{ color: "#666", fontSize: 14, marginTop: 4 }}>Agente de IA que recupera vendas via áudio e ligações</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setShowAdd(true)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 10, color: "#e0e0e0", cursor: "pointer", fontSize: 14 }}>
            <Plus size={16} /> Novo Lead
          </button>
          <button onClick={triggerAll} disabled={loading} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "#3b82f6", border: "none", borderRadius: 10, color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
            <Zap size={16} /> {loading ? "Processando..." : "Recuperar Todos"}
          </button>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
          <StatCard icon={<Users size={20} color="#3b82f6" />} label="Total de Leads" value={stats.total_leads} />
          <StatCard icon={<MessageCircle size={20} color="#f59e0b" />} label="Contatados" value={stats.contacted} sub={`${stats.contacts_sent} contatos enviados`} />
          <StatCard icon={<CheckCircle size={20} color="#10b981" />} label="Recuperados" value={stats.recovered} sub={`${stats.recovery_rate}% de conversão`} />
          <StatCard icon={<TrendingUp size={20} color="#10b981" />} label="Valor Recuperado" value={`R$ ${stats.recovered_value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`} />
        </div>
      )}

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {(["all", "new", "contacted", "recovered", "lost"] as const).map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{ padding: "6px 14px", borderRadius: 20, border: "1px solid", borderColor: filter === s ? "#3b82f6" : "#2a2a2a", background: filter === s ? "#1e3a5f" : "transparent", color: filter === s ? "#60a5fa" : "#888", cursor: "pointer", fontSize: 13 }}>
            {s === "all" ? "Todos" : STATUS_LABELS[s]}
          </button>
        ))}
        <button onClick={fetchData} style={{ marginLeft: "auto", background: "transparent", border: "none", color: "#555", cursor: "pointer" }}>
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Leads table */}
      <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #2a2a2a" }}>
              {["Nome", "Telefone", "Produto", "Valor", "Status", "Ações"].map(h => (
                <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: 12, color: "#666", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map(lead => (
              <tr key={lead.id} style={{ borderBottom: "1px solid #1f1f1f" }}>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ fontWeight: 500, color: "#e0e0e0" }}>{lead.name}</div>
                  {lead.email && <div style={{ fontSize: 12, color: "#555" }}>{lead.email}</div>}
                </td>
                <td style={{ padding: "14px 16px", color: "#aaa", fontSize: 14 }}>{lead.phone}</td>
                <td style={{ padding: "14px 16px", color: "#aaa", fontSize: 13, maxWidth: 200 }}>
                  <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{lead.product || "—"}</div>
                </td>
                <td style={{ padding: "14px 16px", color: "#aaa", fontSize: 14 }}>
                  {lead.cart_value ? `R$ ${lead.cart_value.toFixed(2)}` : "—"}
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <select
                    value={lead.status}
                    onChange={e => updateStatus(lead.id, e.target.value as LeadStatus)}
                    style={{ background: "#252525", border: `1px solid ${STATUS_COLORS[lead.status]}33`, borderRadius: 6, color: STATUS_COLORS[lead.status], padding: "4px 8px", fontSize: 12, cursor: "pointer" }}
                  >
                    {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => triggerRecovery(lead.id)}
                      disabled={recovering.has(lead.id) || lead.status === "do_not_contact"}
                      title="Enviar áudio/ligação via IA"
                      style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: recovering.has(lead.id) ? "#252525" : "#1e3a5f", border: "1px solid #3b82f620", borderRadius: 8, color: recovering.has(lead.id) ? "#555" : "#60a5fa", cursor: "pointer", fontSize: 12 }}
                    >
                      {recovering.has(lead.id) ? <RefreshCw size={14} className="spin" /> : <Phone size={14} />}
                      {recovering.has(lead.id) ? "Enviando..." : "Recuperar"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: 48, textAlign: "center", color: "#555" }}>
                  Nenhum lead encontrado. Adicione leads ou configure o webhook de carrinho abandonado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showAdd && <AddLeadModal onClose={() => setShowAdd(false)} onAdded={fetchData} />}
    </div>
  );
}
