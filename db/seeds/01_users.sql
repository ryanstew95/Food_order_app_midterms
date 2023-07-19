-- Users table seeds here (Example)
INSERT INTO users (name, isEmployee)
VALUES
(bob, false),
(alice, false),
(john, false),
(ryan, true),
(jesse, true),
(sourav, true),
(nick, true);


INSERT INTO Food_Items (item_id, name, price, photo_url, description)
VALUES
  (1, 'Burger', 9.99, 'https://example.com/burger.jpg', 'Delicious beef burger with lettuce, tomato, and cheese.'),
  (2, 'Pizza', 12.99, 'https://example.com/pizza.jpg', 'Freshly baked pizza with a variety of toppings.'),
  (3, 'Salad', 7.99, 'https://example.com/salad.jpg', 'Healthy salad with mixed greens, vegetables, and vinaigrette dressing.'),
  (4, 'Pasta', 11.99, 'https://example.com/pasta.jpg', 'Homemade pasta with your choice of sauce.'),
  (5, 'Sushi', 14.99, 'https://example.com/sushi.jpg', 'Assorted sushi rolls with fresh fish and rice.');


INSERT INTO Order_Items(food_id, order_id, quantity)
VALUES(1, 1, 3),
(2, 1, 2),
(3, 1, 2),
(4, 1, 1),
(5, 3, 2);

INSERT INTO Orders(user_id, active, estimated_time_minutes)
VALUES(1, true, 15),
(2, false, 20),
(3, true, 25),
(4, false, 13);
