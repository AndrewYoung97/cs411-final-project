-- find comment of Hamlet   
SELECT 
    r.review_text, b.title
FROM
    review r
        JOIN
    book b ON b.book_id = r.book_id
WHERE
    b.book_id = 1420;

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
    
-- --------------------------------
-- stored procedure 1 
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
CALL add_book("steve kingf", "aggo.com", 3, 3);

INSERT INTO book (authors, book_id, title) VALUES (7, null, 'facebbok');

-- --------------------------------
-- creative component: fuzzy match function
DROP FUNCTION fuzzyMatchString;
DELIMITER $$

CREATE FUNCTION fuzzyMatchString (s1 varchar(255), s2 varchar(255))
RETURNS INT
DETERMINISTIC
BEGIN
    -- algorithm by William Talada
    DECLARE i INT;
    DECLARE j INT;
    SET j = 0;
	SET i = 1;

    WHILE i < LENGTH(s1) DO
        IF locate(SUBSTRING(s1,i,3), s2) > 0 THEN SET j=j+1;
        END IF;
        SET i=i+1;
    END WHILE;
    RETURN j;
END $$

DELIMITER ;

-- --------------------------------
-- stored procedure 2: get book with title and author, fuzzy match title
DROP PROCEDURE get_book;
DELIMITER $$
CREATE DEFINER=`root`@`%` PROCEDURE `get_book`(
IN authorName VARCHAR(255), bookTitle VARCHAR(200)
)
BEGIN
IF authorName IS NULL THEN
	-- fuzzy search here
	SELECT fuzzyMatchString(bookTitle, b.title) as score, a.author_name, b.title, b.image_url
	FROM
		author a
			JOIN
		book b ON a.author_id = b.authors
	ORDER BY score DESC
	LIMIT 0, 15;
ELSE
	SELECT *
    FROM
		author a JOIN
        book b ON a.author_id = b.authors
	WHERE a.author_name = authorName AND b.title = bookTitle
	LIMIT 0, 15;
END IF; 


END$$

DELIMITER ;

select fuzzyMatchString('Billy William Lee Talada Jr.', 'William Lee Talada Jr.');

call goodread.get_book(null, 'let');
call goodread.get_book('Jude Fisher', null);

-- --------------------------------
-- trigger 1: update new book list when insert into book table
drop trigger frequency;
delimiter //
CREATE TRIGGER frequency AFTER INSERT ON book
	FOR EACH ROW
    BEGIN
		IF EXISTS (SELECT * FROM newBookTab n WHERE n.book_id = new.book_id) THEN 
			UPDATE newBookTab SET num_access = num_access + 1 AND time_last_access = current_timestamp WHERE book_id = new.book_id;
        ELSE
        -- SELECT max(book_id) INTO @var FROM book;
		INSERT INTO newBookTab(isbn,review_count,language_code,avg_rating,description_text,formt,link,authors,publisher,num_pages,publication_month,
publication_year,url,image_url,book_id,ratings_count,work_id,title)
		VALUES (new.isbn,new.review_count,new.language_code,new.avg_rating,new.description_text,new.formt,new.link,new.authors,new.publisher,new.num_pages,new.publication_month,
new.publication_year,new.url,new.image_url,new.book_id,new.ratings_count,new.work_id,new.title);
		END IF;
    END;//
delimiter ;

insert into book (authors, book_id, title, ratings_count)
			value (7, null, 'ft', 25);