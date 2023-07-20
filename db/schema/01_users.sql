DROP TABLE order_items;
DROP TABLE orders;
DROP TABLE food_items;
DROP TABLE users;

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
  description VARCHAR(255)
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  active BOOLEAN,
  estimated_time_minutes INT
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  food_id INTEGER REFERENCES food_items(id) ON DELETE CASCADE,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE
);
