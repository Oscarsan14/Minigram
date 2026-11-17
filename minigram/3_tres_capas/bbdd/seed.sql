INSERT INTO users(username, email, password, avatar_filename) VALUES
('Oscarsan14', 'oparra@gmail.com', '$2b$10$rjExSozgwyStxTQlxFQWtuLBG79zWUUMiSqOtGEEFJALCdlZKo0/O', 'Perfil2.jpg'),
('Yuyi', 'Yuyi@gmail.com', '$2b$10$rjExSozgwyStxTQlxFQWtuLBG79zWUUMiSqOtGEEFJALCdlZKo0/O', 'Perfil1.jpg'),
('Niggi', 'Niggi@gmail.com', '$2b$10$rjExSozgwyStxTQlxFQWtuLBG79zWUUMiSqOtGEEFJALCdlZKo0/O', 'Perfil3.jpg');


INSERT INTO posts(user_id, caption, image_filename) VALUES
(1, 'Mi primer post lol', 'Post1.jpg'),
(2, 'Crazy niga 2', 'Post2.png'),
(3, 'Terror', 'Post3.png');

INSERT INTO comments(post_id, user_id, comment) VALUES
(1, 2,  'KYS'),
(2, 3,  ':3'),
(3, 1,  'AAAAAAAAAAAAAAAAAAAA :0');

INSERT INTO LIKES(post_id, user_id) VALUES
(1, 2),
(1, 3),
(2, 1);