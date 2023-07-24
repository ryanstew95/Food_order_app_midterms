INSERT INTO users (name, isEmployee)
VALUES
(bob, false),
(alice, false),
(john, false),
(ryan, true),
(jesse, true),
(sourav, true),
(nick, true);


INSERT INTO Food_Items(item_id, name, price, photo_url, description)
VALUES(1, 'Pizza', 8, 'Paneer Pizza'),
(2, '', 8, 'Paneer Pizza'),
(3, 'Pizza', 8, 'Paneer Pizza'),
(4, 'Pizza', 8, 'Paneer Pizza');

INSERT INTO Order_Items(food_id, order_id, quantity)
VALUES(1, 1,3),
(2, 1, 2),
(3, 1, 2),
(4, 1, 1);

INSERT INTO Orders(user_id, active, estimated_time_minutes)
VALUES(1, 1, 15),
(2, 1, 20),
(3, 1, 25),
(4, 1, 13);

