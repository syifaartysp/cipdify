import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET: Ambil semua tracks
export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM tracks ORDER BY created_at DESC');
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error('Database GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch tracks' }, { status: 500 });
  }
}

// POST: Tambah track baru
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, artist, album, genre, rating, notes, cover_url, spotify_link } = body;

    if (!title || !artist) {
      return NextResponse.json({ error: 'Title and Artist are required' }, { status: 400 });
    }

    const query = `
      INSERT INTO tracks (title, artist, album, genre, rating, notes, cover_url, spotify_link)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      title, 
      artist, 
      album || '-', 
      genre || 'Pop', 
      rating || 5, 
      notes || '', 
      cover_url || '', 
      spotify_link || ''
    ];

    const [result] = await pool.query(query, values);
    return NextResponse.json({ id: result.insertId, message: 'Track added successfully' }, { status: 201 });
  } catch (error) {
    console.error('Database POST Error:', error);
    return NextResponse.json({ error: 'Failed to add track' }, { status: 500 });
  }
}

// PUT: Update track
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, title, artist, album, genre, rating, notes, cover_url, spotify_link } = body;

    if (!id || !title || !artist) {
      return NextResponse.json({ error: 'ID, Title, and Artist are required' }, { status: 400 });
    }

    const query = `
      UPDATE tracks 
      SET title = ?, artist = ?, album = ?, genre = ?, rating = ?, notes = ?, cover_url = ?, spotify_link = ?
      WHERE id = ?
    `;
    const values = [
      title, 
      artist, 
      album || '-', 
      genre || 'Pop', 
      rating || 5, 
      notes || '', 
      cover_url || '', 
      spotify_link || '', 
      id
    ];

    await pool.query(query, values);
    return NextResponse.json({ message: 'Track updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Database PUT Error:', error);
    return NextResponse.json({ error: 'Failed to update track' }, { status: 500 });
  }
}

// DELETE: Hapus track berdasarkan ID
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Track ID is required' }, { status: 400 });
    }

    await pool.query('DELETE FROM tracks WHERE id = ?', [id]);
    return NextResponse.json({ message: 'Track deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Database DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete track' }, { status: 500 });
  }
}