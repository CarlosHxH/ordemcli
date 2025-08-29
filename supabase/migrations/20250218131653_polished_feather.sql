/*
  # Create orders table for tracking deliveries

  1. New Tables
    - `orders`
      - `id` (uuid, primary key)
      - `ordercli` (text, unique) - Order client reference number
      - `cliente` (text) - Client name (Natura or Avon)
      - `previsao_chegada` (date) - Expected arrival date
      - `qtde_pedidos` (integer) - Number of orders
      - `qtde_volumes` (integer) - Number of volumes
      - `chegou_na_base` (boolean) - Arrival status
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `orders` table
    - Add policies for authenticated users to manage orders
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

-- Policy for reading orders
CREATE POLICY "Anyone can read orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy for inserting orders
CREATE POLICY "Authenticated users can insert orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy for updating orders
CREATE POLICY "Authenticated users can update orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (true);