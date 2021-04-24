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
	add foreign key (authors) references author(author_id)
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