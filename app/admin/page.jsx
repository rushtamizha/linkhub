"use client";
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, ExternalLink, Globe } from 'lucide-react';
import { redirect } from "next/navigation";
const emptyForm = {
  slug: "",
  url: "",
  seoTitle: "",
  seoDescription: "",
};

export default function Admin() {
  const [form, setForm] = useState(emptyForm);
  const [links, setLinks] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchLinks = async () => {
    const res = await fetch("/api/links");
    const data = await res.json();
    setLinks(data);
    console.log(data)
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const submit = async () => {
    const method = editId ? "PUT" : "POST";

    await fetch("/api/links", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editId ? { id: editId, ...form } : form),
    });

    setForm(emptyForm);
    setEditId(null);
    fetchLinks();
  };

  const editLink = (link) => {
    setForm({
      slug: link.slug,
      url: link.url,
      seoTitle: link.seoTitle,
      seoDescription: link.seoDescription,
    });
    setEditId(link._id);
  };

  const deleteLink = async (id) => {
    if (!confirm("Delete this link?")) return;

    await fetch("/api/links", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    fetchLinks();
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Rushtamizha</h1>
          <p className="text-gray-500"></p>
        </div>

        {/* Add Link Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-600">
            <Plus size={20} className="text-blue-600" /> Create New Link
          </h2>
          <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="px-4 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Slug (e.g. promo-2026)"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
            />
            <input
              className="px-4 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Target URL (https://...)"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
            />
            <input
              className="px-4 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="SEO Title"
              value={form.seoTitle}
              onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
            />
            <textarea
              className="px-4 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition md:col-span-2"
              placeholder="SEO Description"
              rows="2"
              value={form.seoDescription}
              onChange={(e) => setForm({ ...form, seoDescription: e.target.value })
        }
            />
            <button className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
              <Plus size={18} /> {editId ? "Update Link" : "Add Link"}
            </button>
          </form>
        </div>

        {/* Links List Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-bottom border-gray-200">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Link Details</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Target URL</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {links.map((link,i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-blue-600 flex items-center gap-1">
                      <Globe size={14}/> /{link.slug}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{link.seoTitle}</div>
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => redirect(link.url)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                        <ExternalLink size={18} className="text-gray-400"/>
                      </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                        
                      <button onClick={() => editLink(link)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                        <Pencil size={18} />
                      </button>
                      <button 
                        onClick={() => setLinks(links.filter(l => l.id !== link.id))}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
