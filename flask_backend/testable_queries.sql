-- find comment of Hamlet   
select r.review_text, b.title
from review r join book b on b.book_id = r.book_id
where b.book_id = 1420;

-- find average rating 
SELECT 
    AVG(i.rating), b.title
FROM
    interaction i
        JOIN
    book b ON i.book_id = b.book_id
WHERE
    b.title = "hamlet";

-- look up user defined genre
SELECT 
    g.genre, b.book_id
FROM
    genre g
        JOIN
    book b ON g.book_id = b.book_id
WHERE
    b.title = 'The Complete Verse and Other Nonsense';

-- look up all books by an author (stored in two tables)
SELECT DISTINCT
    a.author_name, b.title
FROM
    author a
        JOIN
    book b ON a.author_id = b.authors
WHERE
    a.author_name = "William Shakespeare";
    
-- find similar books of, this can expand to a stored procedure
SELECT 
    s.similar_book
FROM
    similar s
        JOIN
    book b ON b.book_id = s.book_id
WHERE
    b.title = 'A Treasury of Kahlil Gibran';
-- stored procedure
DROP PROCEDURE add_book;
delimiter //
CREATE PROCEDURE add_book(
		IN titleIn VARCHAR(200), urlIn VARCHAR(200), isbnIn INT, authorIn INT)
BEGIN
DECLARE addSucess INT;

DECLARE EXIT HANDLER FOR sqlexception
BEGIN
	GET diagnostics CONDITION 1
    @p1 = returned_sqlstate, @p2 = message_text;
    SELECT @pa1, @p2;
ROLLBACK;
END;

DECLARE exit handler for sqlwarning
BEGIN
GET DIAGNOSTICS CONDITION 1
@p1 = RETURNED_SQLSTATE, @p2 = MESSAGE_TEXT;
SELECT @p1 as RETURNED_SQLSTATE  , @p2 as MESSAGE_TEXT;
ROLLBACK;
END;

	IF EXISTS (SELECT 1 FROM book WHERE title = titleIn) THEN
		SET addSucess = 0;
	ELSE 
		INSERT INTO book (authors, title, url, book_id)
			VALUES (authorIn, titleIn, urlIn, null);
        SET addSucess = 1;
	END IF;
    SELECT addSucess;
END//
delimiter ;
CALL add_book("Dark Sons", "google.com", 1232312, 11102113);
CALL add_book("steve king", "aggo.com", 3, 3);

INSERT INTO book (authors, book_id, title) VALUES (5, null, 'facebbok');
SELECT @var;
SELECT * FROM book WHERE authors  = 3;


-- trigger to insert a book with fields in different tables
delimiter //
CREATE TRIGGER verify BEFORE INSERT ON book
	FOR EACH ROW
    BEGIN
		IF NEW.authors NOT IN (
			SELECT @output = author_id
            FROM author
            WHERE (NEW.authors = author_name)
		) THEN 
			INSERT INTO author (author_id, author_name) VALUES (null, NEW.authors);
			SET NEW.authors = LAST_INSERT_ID();
		ELSE 
			INSERT INTO author (author_id, author_name) VALUES (@output, NEW.authors);
        END IF;
	END;//
delimiter ;
drop trigger verify;

insert into author (author_id, author_name) 
			values (null, 'start star');
insert into book (authors, book_id, title)
			value (LAST_INSERT_ID(), null, 'new title');


-- delete duplicate, worked
CREATE TABLE author_copy_t 
LIKE author;

INSERT INTO author_copy_t
SELECT any_value(rating_avg) as rating_avg, any_value(author_id) as id, any_value(count_review) as count_review, author_name, any_value(count_rating) as count_rating
FROM author
GROUP by author_name;
 alter table author rename to author_orig;
 alter TABLE author rename to author_new;

-- delete non matching rows in book table
DELETE FROM book
WHERE  NOT EXISTS (
   SELECT * FROM author_new an
   WHERE  an.author_id = book.authors
   );
   

-- unique
create unique index unique_name on author_copy_t (author_name);
create unique index unique_title on book (title);

-- doesn't work
insert into book (authors, book_id, title)
			value ("hello", null, 'new title');

-- auto increment id for author and book
insert into author (author_id, author_name) values (null, 'start star');

alter table author	
	modify author_id int auto_increment;
alter table author auto_increment = 17343375;

alter table book 
	modify book_id int auto_increment;
alter table book auto_increment = 36485480;
-- use auto generated id for another add
-- https://dev.mysql.com/doc/c-api/8.0/en/getting-unique-id.html


-- useful (not exclusive) statement to add FK and PK
alter table book 
	drop foreign key book_ibfk_1;

alter table book
	add foreign key (authors) references author_new(author_id)
    on update cascade
    on delete restrict;
    
alter table book
	add primary key (book_id);

alter table genre
	add foreign key (book_id) references book(book_id)
    on delete cascade
    on update cascade;

alter table genre 
	drop foreign key genre_ibfk_1;

alter table genre
	add foreign key (book_id) references book(book_id);

alter table interaction
	modify column user_id varchar(100);
alter table interaction
	add primary key (user_id, book_id);
    
alter table interaction
	add foreign key (book_id) references book(book_id)
    on delete cascade
	on update cascade;

alter table interaction
	drop foreign key interaction_ibfk_1;

alter table review
	add primary key (review_id);
alter table review
	add foreign key (book_id) references book(book_id)
    on delete cascade
    on update cascade;

alter table review
	drop foreign key review_ibfk_1;
alter table similar
	add primary key (book_id, similar_book);
alter table similar
	modify column book_id int;
alter table similar
	add foreign key (book_id) references book(book_id)
    on delete cascade
    on update cascade;
alter table similar
	drop foreign key similar_ibfk_1;
alter table interaction
	drop foreign key interaction_ibfk_1;