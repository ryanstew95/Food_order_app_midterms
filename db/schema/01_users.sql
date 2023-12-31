DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS food_items CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  isEmployee BOOLEAN
);

CREATE TABLE food_items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  price DECIMAL(10, 2),
  photo_url VARCHAR(255),
  description TEXT
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  active BOOLEAN NOT NULL DEFAULT true,
  estimated_time_minutes INT,
  date_created TIMESTAMP DEFAULT NOW(),
  date_accepted TIMESTAMP DEFAULT NULL,
  date_completed TIMESTAMP DEFAULT NULL
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  food_id INTEGER REFERENCES food_items(id) ON DELETE CASCADE,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE
);
