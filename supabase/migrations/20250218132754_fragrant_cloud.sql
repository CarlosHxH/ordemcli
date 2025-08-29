/*
  # Create orders table with updated RLS policies

  1. New Tables
    - `orders`
      - `id` (uuid, primary key)
      - `ordercli` (text, unique)
      - `cliente` (text, check constraint for 'Natura' or 'Avon')
      - `previsao_chegada` (date)
      - `qtde_pedidos` (integer, positive)
      - `qtde_volumes` (integer, positive)
      - `chegou_na_base` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on `orders` table
    - Add policies for anonymous access (read/write)
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ordercli text UNIQUE NOT NULL,
  cliente text NOT NULL CHECK (cliente IN ('Natura', 'Avon')),
  previsao_chegada date NOT NULL,
  qtde_pedidos integer NOT NULL CHECK (qtde_pedidos > 0),
  qtde_volumes integer NOT NULL CHECK (qtde_volumes > 0),
  chegou_na_base boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public read access"
  ON orders
  FOR SELECT
  TO public
  USING (true);

-- Allow public insert access
CREATE POLICY "Public insert access"
  ON orders
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow public update access
CREATE POLICY "Public update access"
  ON orders
  FOR UPDATE
  TO public
  USING (true);