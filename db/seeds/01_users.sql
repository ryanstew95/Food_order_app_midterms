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
('Italian Burger', 10.00, '/images/italianburger.jpg', 'A scrumptious Italian burger with freshly sourced tomatoes, lettuce, and our special house sauce. Served with aside of crispy fries'),
('Burrito Bowl', 15.00, '/images/burito.jpeg', 'Our Burrito Bowl features succulent grilled chicken, seasoned black beans, fresh avocado, and zesty salsa on a bed of fluffy rice. A hearty meal that will leave you satisfied!'),
('Lasagna', 20.00, '/images/lsangna.jpeg', 'Our Lasagna is a heavenly blend of pasta layers filled with rich meat sauce, creamy bechamel, and topped off with a generous sprinkle of mozzarella. Truly a comforting classic!'),
('Pizza', 15.00, '/images/pizza.jpeg', 'Experience the magic of Italy with our Pizza! Crafted with hand-tossed dough, slathered with tangy marinara, and topped with a delightful mix of cheese and toppings. Bellissimo!'),
('Chicken Wings', 18.00, '/images/wings.jpeg', 'Spice up your meal with our Chicken Wings! Crispy on the outside, juicy on the inside, and coated in our secret sauce. They''re finger-licking good!'),
('Fries', 22.00, '/images/combo1.png', 'Who can resist our golden Fries? Fried to perfection and lightly salted, they''re the perfect side dish or a delicious snack on their own. Don''t forget the ketchup!'),
('Combo 1', 30.00, '/images/combo1.png', 'Indulge in our Combo 1 for the perfect meal! You get our signature Italian Burger, a serving of crispy golden Fries, and your choice of a refreshing drink. It''s the ultimate meal deal!'),
('Combo 2', 18.99, 'images/combo2.jpeg', 'Dive into our Combo 2 for an unforgettable meal experience! Enjoy a slice of our delightful Pizza, accompanied by a fresh green salad, and wash it all down with a refreshing Mojito. The perfect combo to satisfy your hunger!'),
('Combo 3', 20.99, '/images/combo3.jpeg', 'Savor the flavors of the North with our Combo 3! This meal includes our North Indian Thali, featuring a variety of delectable dishes such as dal makhani, paneer butter masala, mix veg, jeera rice, raita, naan, and a sweet dessert. It''s a feast that''s sure to please!');


INSERT INTO orders
(user_id, active, estimated_time_minutes, date_created, date_accepted, date_completed) VALUES
(1, false, 15, '2023-07-24 16:15:06', '2023-07-24 16:17:36', '2023-07-24 16:25:41'),
(2, false, 20, '2023-07-24 16:18:13', '2023-07-24 16:19:22', '2023-07-24 16:34:40'),
(1, false, 15, '2023-07-24 17:01:02', '2023-07-24 17:01:30', '2023-07-24 17:10:04'),
(5, false, 13, '2023-07-24 17:48:36', '2023-07-24 17:49:01', '2023-07-24 18:02:06'),
(4, false, 15, '2023-07-24 17:49:00', '2023-07-24 17:49:06', '2023-07-24 17:59:03'),
(3, false, 25, '2023-07-24 18:00:12', '2023-07-24 18:01:45', '2023-07-24 18:13:31');

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
