CREATE TABLE IF NOT EXISTS barang (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Data contoh (opsional)
INSERT INTO barang (name, description, price) VALUES
('Kopi Susu', 'Kopi dengan susu segar', 18000),
('Matcha Latte', 'Matcha premium dingin', 25000),
('Roti Bakar', 'Cokelat keju', 15000);
