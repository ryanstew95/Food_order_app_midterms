CREATE TABLE Users (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  isEmployee BOOLEAN
);

CREATE TABLE Orders (
  id INT PRIMARY KEY,
  user_id INT,
  active BOOLEAN,
  estimated_time_minutes INT,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Food_Items (
  item_id INT PRIMARY KEY,
  name VARCHAR(255),
  price DECIMAL(10, 2),
  photo_url VARCHAR(255),
  description VARCHAR(255)
);

CREATE TABLE Order_Items (
  food_id INT,
  order_id INT,
  quantity INT,
  FOREIGN KEY (food_id) REFERENCES Food_Items(item_id),
  FOREIGN KEY (order_id) REFERENCES Orders(id),
  PRIMARY KEY (food_id, order_id)
);
