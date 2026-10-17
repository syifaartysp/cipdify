'use client';

import { useEffect, useState } from 'react';

const emptyForm = { name: '', category: 'Makanan', description: '', price: '', stock: '' };

export default function Home() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [sortBy, setSortBy] = useState('newest');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [deletingId, setDeletingId] = useState(null);
  const [isDeletingAll, setIsDeletingAll] = useState(false);

  async function loadProducts() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal memuat data');
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function startEdit(product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      category: product.category || 'Makanan',
      description: product.description || '',
      price: product.price,
      stock: product.stock !== undefined && product.stock !== null ? product.stock : '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccessMessage('');

    if (!form.name.trim() || form.price <= 0) {
      setError('Nama produk dan harga harus diisi dengan benar!');
      setSaving(false);
      return;
    }

    try {
      const url = editingId ? `/api/products/${editingId}` : '/api/products';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal menyimpan data');

      setSuccessMessage(editingId ? 'Produk berhasil diperbarui! ✨' : 'Produk baru berhasil ditambahkan! 🎉');
      setForm(emptyForm);
      setEditingId(null);
      await loadProducts();

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  function confirmDelete(id) {
    setDeletingId(id);
  }

  async function executeDelete() {
    if (!deletingId) return;
    setError('');
    setSuccessMessage('');
    const idToDelete = deletingId;
    setDeletingId(null);

    try {
      const res = await fetch(`/api/products/${idToDelete}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal menghapus data');
      
      setSuccessMessage('Produk berhasil dihapus! 🗑️');
      await loadProducts();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  }

  async function executeDeleteAll() {
    setIsDeletingAll(false);
    setError('');
    setSuccessMessage('');

    try {
      const deletePromises = products.map((p) =>
        fetch(`/api/products/${p.id}`, { method: 'DELETE' })
      );
      await Promise.all(deletePromises);

      setSuccessMessage('Semua produk berhasil dihapus! 🗑️');
      await loadProducts();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  }

  const filteredProducts = products
    .filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory =
        selectedCategory === 'Semua' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return Number(a.price) - Number(b.price);
      if (sortBy === 'price-high') return Number(b.price) - Number(a.price);
      if (sortBy === 'stock-low') return (Number(a.stock) || 0) - (Number(b.stock) || 0);
      return 0;
    });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalValue = products.reduce((acc, p) => acc + (Number(p.price) * (Number(p.stock) || 1)), 0);
  const totalStock = products.reduce((acc, p) => acc + (Number(p.stock) || 0), 0);

  function exportCSV() {
    if (products.length === 0) return;
    const headers = ['ID', 'Nama', 'Kategori', 'Deskripsi', 'Harga', 'Stok'];
    const rows = products.map((p) => [
      p.id,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.category || '-'}"`,
      `"${(p.description || '-').replace(/"/g, '""')}"`,
      p.price,
      p.stock || 0
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `daftar_produk_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <main>
      <h1>CRUD Produk</h1>
      <p className="subtitle">Next.js + MySQL (Aiven) • Ultra Pro Edition</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '16px',
        marginBottom: '28px'
      }}>
        <div style={{
          background: '#fff',
          padding: '18px 20px',
          borderRadius: 'var(--radius-lg)',
          border: '2px solid var(--pink-200)',
          boxShadow: 'var(--shadow-pink)'
        }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--pink-600)', textTransform: 'uppercase' }}>Total Produk</div>
          <div style={{ fontSize: '26px', fontWeight: '800', color: 'var(--ink)', marginTop: '4px' }}>{products.length}</div>
        </div>

        <div style={{
          background: '#fff',
          padding: '18px 20px',
          borderRadius: 'var(--radius-lg)',
          border: '2px solid var(--pink-200)',
          boxShadow: 'var(--shadow-pink)'
        }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--pink-600)', textTransform: 'uppercase' }}>Total Stok</div>
          <div style={{ fontSize: '26px', fontWeight: '800', color: 'var(--ink)', marginTop: '4px' }}>{totalStock}</div>
        </div>

        <div style={{
          background: '#fff',
          padding: '18px 20px',
          borderRadius: 'var(--radius-lg)',
          border: '2px solid var(--pink-200)',
          boxShadow: 'var(--shadow-pink)'
        }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--pink-600)', textTransform: 'uppercase' }}>Nilai Inventaris</div>
          <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--pink-600)', marginTop: '8px' }}>
            Rp {totalValue.toLocaleString('id-ID')}
          </div>
        </div>
      </div>

      {successMessage && (
        <div style={{
          background: 'var(--pink-100)',
          color: 'var(--pink-700)',
          padding: '14px 18px',
          border: '1.5px solid var(--pink-300)',
          borderRadius: '14px',
          fontSize: '14px',
          fontWeight: '700',
          marginBottom: '20px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-pink)'
        }}>
          {successMessage}
        </div>
      )}

      {error && <div className="error-box">{error}</div>}

      <div className="card">
        <h3>{editingId ? 'Edit Produk' : 'Tambah Produk Baru'}</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div className="form-row">
              <label htmlFor="name">Nama Produk</label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Misal: Kopi Susu Creamy"
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="category">Kategori</label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                style={{
                  padding: '12px 16px',
                  border: '1.5px solid var(--pink-200)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  color: 'var(--ink)',
                  background: '#fff',
                  outline: 'none'
                }}
              >
                <option value="Makanan">Makanan</option>
                <option value="Minuman">Minuman</option>
                <option value="Snack">Snack</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="description">Deskripsi</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={2}
              placeholder="Deskripsi singkat produk (opsional)"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div className="form-row">
              <label htmlFor="price">Harga (Rp)</label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={handleChange}
                placeholder="0"
                required
              />
            </div>

            <div className="form-row">
              <label htmlFor="stock">Jumlah Stok</label>
              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                value={form.stock}
                onChange={handleChange}
                placeholder="0"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Menyimpan...' : editingId ? 'Perbarui Produk' : 'Simpan Produk'}
            </button>
            {editingId && (
              <button type="button" className="btn-secondary" onClick={cancelEdit}>
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              padding: '10px 16px',
              borderRadius: '999px',
              border: '1.5px solid var(--pink-200)',
              background: '#fff',
              fontSize: '13px',
              fontWeight: '600',
              outline: 'none',
              width: '180px',
              color: 'var(--ink)'
            }}
          />

          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              padding: '10px 16px',
              borderRadius: '999px',
              border: '1.5px solid var(--pink-200)',
              background: '#fff',
              fontSize: '13px',
              fontWeight: '700',
              color: 'var(--pink-600)',
              outline: 'none'
            }}
          >
            <option value="Semua">Semua Kategori</option>
            <option value="Makanan">Makanan</option>
            <option value="Minuman">Minuman</option>
            <option value="Snack">Snack</option>
            <option value="Lainnya">Lainnya</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '10px 16px',
              borderRadius: '999px',
              border: '1.5px solid var(--pink-200)',
              background: '#fff',
              fontSize: '13px',
              fontWeight: '700',
              color: 'var(--pink-600)',
              outline: 'none'
            }}
          >
            <option value="newest">Urutan Terbaru</option>
            <option value="price-low">Harga: Terendah</option>
            <option value="price-high">Harga: Tertinggi</option>
            <option value="stock-low">Stok: Tersekit</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            onClick={() => setIsDeletingAll(true)}
            disabled={products.length === 0}
            className="btn-danger"
            style={{ padding: '8px 16px', fontSize: '13px' }}
          >
            🗑️ Hapus Semua
          </button>
          <button
            type="button"
            onClick={exportCSV}
            disabled={products.length === 0}
            className="btn-secondary"
            style={{ padding: '8px 16px', fontSize: '13px' }}
          >
            📥 Ekspor Excel (CSV)
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Produk</th>
            <th>Kategori</th>
            <th>Harga</th>
            <th>Stok</th>
            <th style={{ textAlign: 'center' }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((p) => (
            <tr key={p.id}>
              <td>
                <div style={{ fontWeight: '700', color: 'var(--ink)' }}>{p.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{p.description || '-'}</div>
              </td>
              <td>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: '700',
                  background: 'var(--pink-100)',
                  color: 'var(--pink-600)'
                }}>
                  {p.category || 'Makanan'}
                </span>
              </td>
              <td>Rp {Number(p.price).toLocaleString('id-ID')}</td>
              <td>
                <span style={{
                  fontWeight: '700',
                  color: (p.stock || 0) <= 5 ? 'var(--pink-600)' : 'var(--ink)'
                }}>
                  {p.stock || 0} unit
                </span>
              </td>
              <td style={{ textAlign: 'center' }}>
                <button className="btn-edit" onClick={() => startEdit(p)}>
                  Edit
                </button>
                <button className="btn-danger" onClick={() => confirmDelete(p.id)}>
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!loading && filteredProducts.length === 0 && (
        <div className="empty">
          {searchTerm || selectedCategory !== 'Semua' ? 'Pencarian / filter tidak ditemukan.' : 'Belum ada produk. Tambahkan produk pertama di atas.'}
        </div>
      )}

      {filteredProducts.length > itemsPerPage && (
        <div style={{
          display: 'flex',
          justify: 'center',
          alignItems: 'center',
          gap: '12px',
          marginTop: '20px'
        }}>
          <button
            className="btn-secondary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            style={{ padding: '6px 14px', fontSize: '13px' }}
          >
            ←
          </button>
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--pink-600)' }}>
            Halaman {currentPage} dari {totalPages}
          </span>
          <button
            className="btn-secondary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            style={{ padding: '6px 14px', fontSize: '13px' }}
          >
            →
          </button>
        </div>
      )}

      {deletingId && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(43, 31, 45, 0.4)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 'var(--radius-lg)',
            border: '2px solid var(--pink-200)',
            boxShadow: '0 20px 40px -15px rgba(236, 72, 135, 0.3)',
            padding: '28px 24px',
            maxWidth: '400px',
            width: '100%',
            textAlign: 'center'
          }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: 'var(--pink-100)',
              color: 'var(--pink-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              margin: '0 auto 16px',
              border: '1.5px solid var(--pink-200)'
            }}>
              ⚠️
            </div>
            <h4 style={{
              margin: '0 0 8px',
              fontSize: '18px',
              fontWeight: '800',
              color: 'var(--pink-600)'
            }}>
              Konfirmasi Hapus
            </h4>
            <p style={{
              margin: '0 0 24px',
              fontSize: '14px',
              color: 'var(--ink)',
              lineHeight: '1.5'
            }}>
              Apakah kamu yakin ingin menghapus produk ini dari daftar?
            </p>
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center'
            }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setDeletingId(null)}
                style={{ flex: 1 }}
              >
                Batal
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={executeDelete}
                style={{ flex: 1 }}
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeletingAll && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(43, 31, 45, 0.4)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 'var(--radius-lg)',
            border: '2px solid var(--pink-200)',
            boxShadow: '0 20px 40px -15px rgba(236, 72, 135, 0.3)',
            padding: '28px 24px',
            maxWidth: '400px',
            width: '100%',
            textAlign: 'center'
          }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: 'var(--pink-100)',
              color: 'var(--pink-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              margin: '0 auto 16px',
              border: '1.5px solid var(--pink-200)'
            }}>
              🚨
            </div>
            <h4 style={{
              margin: '0 0 8px',
              fontSize: '18px',
              fontWeight: '800',
              color: 'var(--pink-600)'
            }}>
              Hapus Semua Produk?
            </h4>
            <p style={{
              margin: '0 0 24px',
              fontSize: '14px',
              color: 'var(--ink)',
              lineHeight: '1.5'
            }}>
              Apakah kamu benar-benar yakin ingin menghapus <strong>seluruh data produk ({products.length} produk)</strong>? Tindakan ini tidak dapat dibatalkan!
            </p>
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center'
            }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setIsDeletingAll(false)}
                style={{ flex: 1 }}
              >
                Batal
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={executeDeleteAll}
                style={{ flex: 1 }}
              >
                Ya, Hapus Semua
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}