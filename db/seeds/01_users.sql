-- Users table seeds here (Example)
INSERT INTO users
(name, isEmployee) VALUES
('bob', false),
('alice', false),
('john', false),
('ryan', true),
('jesse', true),
('sourav', true),
('nick', true);

INSERT INTO food_items
(name, price, photo_url, description) VALUES
('Burger', 9.99, 'https://example.com/burger.jpg', 'Delicious beef burger with lettuce, tomato, and cheese.'),
('Pizza', 12.99, 'https://example.com/pizza.jpg', 'Freshly baked pizza with a variety of toppings.'),
('Salad', 7.99, 'https://example.com/salad.jpg', 'Healthy salad with mixed greens, vegetables, and vinaigrette dressing.'),
('Pasta', 11.99, 'https://example.com/pasta.jpg', 'Homemade pasta with your choice of sauce.'),
('Sushi', 14.99, 'https://example.com/sushi.jpg', 'Assorted sushi rolls with fresh fish and rice.');

INSERT INTO orders
(user_id, active, estimated_time_minutes) VALUES
(1, true, 15),
(2, false, 20),
(3, true, 25),
(4, false, 13);

INSERT INTO order_items
(food_id, order_id) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(3, 2),
(3, 2),
(1, 2),
(4, 2),
(4, 3),
(2, 3),
(3, 3),
(4, 3);
