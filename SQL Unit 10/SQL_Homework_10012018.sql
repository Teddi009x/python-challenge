SELECT * FROM sakila.actor;

-- 1a
SELECT first_name," ",last_name FROM sakila.actor;

-- 1b
SELECT CONCAT(first_name, ",  ", last_name) AS "Actor Name" FROM sakila.actor;


-- 2a
SELECT actor_id," ", first_name," ",last_name FROM sakila.actor WHERE first_name = "Joe";

-- 2b
SELECT actor_id," ", first_name," ",last_name FROM sakila.actor WHERE last_name LIKE "%GEN%";

-- 2c
SELECT actor_id," ", first_name," ",last_name FROM sakila.actor WHERE last_name LIKE "%LI%" order by last_name;

-- 2d
select country_id, country FROM sakila.country WHERE country IN ('Afghanistan', 'Bangladesh', 'China');


-- 3a
ALTER TABLE `sakila`.`actor` 
ADD COLUMN `` `description` VARCHAR(45) NULL ;

-- 3b
ALTER TABLE sakila.actor DROP COLUMN description;



-- 4a
SELECT Count(Actor_id), last_name FROM sakila.actor GROUP BY last_name;

-- 4b
SELECT Count(Actor_id) as act_count, last_name FROM sakila.actor GROUP BY last_name having act_count >2;

-- 4c
SELECT actor_id as selet_id From sakila.actor WHERE first_name = 'GROUCHO'and last_name='WILLIAMS';
UPDATE sakila.actor SET first_name = 'HARPO' WHERE actor_id =172;
SELECT * From sakila.actor WHERE actor_id = 172;

-- 4d
UPDATE sakila.actor SET first_name = 'GROUCHO' WHERE actor_id = 172;
SELECT * From sakila.actor WHERE actor_id = 172;

-- 5a   SHOW CREATE TABLE tableName
SHOW CREATE TABLE address; 
CREATE TABLE IF NOT EXISTS address ( address_id smallint(5) unsigned NOT NULL AUTO_INCREMENT,address varchar(50) NOT NULL, address2 varchar(50) NOT NULL, district varchar(50) NOT NULL,
city_id smallint(5) unsigned NOT NULL, postal_code varchar(10) DEFAULT NULL, phone varchar(20) NOT NULL, location geometry NOT NULL, last_update timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;


-- 6a
Select s.first_name, last_name, address, district From sakila.staff s
join sakila.address a 
on s.address_id = a.address_id;

-- 6b
Select sum(amount) as total, s.first_name, s.last_name From sakila.staff s
inner join sakila.payment p 
on s.staff_id = p.staff_id
where p.payment_date like '%2005-08%'
group by s.first_name, s.last_name;

-- 6c
Select sakila.film.title, count(sakila.film.actor_id) as 'total'
From sakila.film 
inner join sakila.film_actor 
on sakila.film.film_id = sakila.film_actor.film_id
group by sakila.film.title;


-- 6d
-- individual check first
SELECT film_id as found_id From sakila.film WHERE title = 'Hunchback Impossible';

Select i.film_id, count(i.film_id)
From sakila.inventory i
WHERE film_id = 439; 

-- completed
Select sakila.film.title, count(sakila.inventory.inventory_id)
From sakila.film 
join sakila.inventory 
on sakila.inventory.film_id = sakila.film.film_id
WHERE sakila.film.title = 'Hunchback Impossible';

-- 6e
Select c.first_name, c.last_name,sum(amount) as total From sakila.customer c
inner join sakila.payment p 
on c.customer_id = p.customer_id
where p.payment_date like '%2005%'
group by c.first_name, c.last_name
ORDER BY c.last_name;


-- 7a
SELECT sakila.film.titLe 
FROM sakila.film
WHERE sakila.film.title LIKE 'K%' or sakila.film.title LIKE 'Q%'
and sakila.film.language_id(Select sakila.language.language_id From sakila.language  where sakila.language.name= 'English');

-- 7b
-- Individual Parts
select sakila.actor.actor_id, sakila.actor.first_name, sakila.actor.last_name FROM sakila.actor WHERE sakila.actor.actor_id IN (77 ,91 ,94 ,114 ,176)
Group by actor_id;

SELECT actor_id FROM sakila.film_actor
Where  film_id = 13
Group by actor_id;

select sakila.film.film_id From sakila.film
where sakila.film.title = 'Alone Trip';

-- Parts combined
select sakila.actor.actor_id, sakila.actor.first_name, sakila.actor.last_name FROM sakila.actor WHERE sakila.actor.actor_id IN (SELECT actor_id FROM sakila.film_actor
Where  film_id = (select sakila.film.film_id From sakila.film
where sakila.film.title = 'Alone Trip'))
Group by actor_id
order by last_name;

-- 7c
-- Individual Parts  start with the inner part and work out then push it down until I am done
-- find customer name and email (4)
select sakila.customer.last_name, sakila.customer.first_name, sakila.customer.email
from sakila.customer
right join sakila.address
on sakila.customer.address_id = sakila.address.address_id
where sakila.address.address_id IN (481, 468, 1, 3, 193, 415, 441)
Order by sakila.customer.last_name;

-- working out customer
select sakila.customer.customer_id From sakila.customer where sakila.customer.address_id IN (481, 468, 1, 3, 193, 415, 441))
order by sakila.customer.last_name);

-- find addresses (3)
SELECT sakila.address.address_id FROM sakila.address
where sakila.address.city_id IN (179, 196, 300, 313, 383, 430, 565);

-- find city id (2)
SELECT sakila.city.city_id FROM sakila.city
where sakila.city.country_id = 20;

-- find canada (1)
SELECT sakila.country.country_id FROM sakila.country
where sakila.country.country = 'Canada';

-- Parts combined
select sakila.customer.last_name, sakila.customer.first_name, sakila.customer.email
from sakila.customer
right join sakila.address
on sakila.customer.address_id = sakila.address.address_id
where sakila.address.address_id IN (SELECT sakila.address.address_id FROM sakila.address
where sakila.address.city_id IN(SELECT sakila.city.city_id FROM sakila.city
where sakila.city.country_id =(SELECT sakila.country.country_id FROM sakila.country
where sakila.country.country = 'Canada')))
Order by sakila.customer.last_name;

-- Tried compressing wheres to Joins
select sakila.customer.last_name, sakila.customer.first_name, sakila.customer.email
from sakila.customer c
right join sakila.address a on (c.address_id = a.address)
join sakila.city s on (a.city_id = s.city_id)
join sakila.country k on (s.country_id = k.country_id
where k.country_id = 'Canada')
order by sakila.customer.last_name;


-- 7d
-- Individual Parts

SELECT * FROM sakila.film;
select sakila.film.title FROM sakila.film WHERE sakila.film.film_id IN (5, 31, 43, 50, 53, 63)

select film_id from sakila.film_category
where category_id = (SELECT category_id FROM sakila.category
Where sakila.category.name = 'Family'))
Group by f.film_id;

-- find family category id(1)
SELECT category_id FROM sakila.category
Where sakila.category.name = 'Family';

-- Part combined
select sakila.film.title FROM sakila.film WHERE sakila.film.film_id IN (
select film_id from sakila.film_category
where category_id = (SELECT category_id FROM sakila.category
Where sakila.category.name = 'Family'))
order by sakila.film.title;


SELECT * FROM sakila.payment;

-- 7e
-- individual parts

SELECT sakila.film.title, count(sakila.film.film_id) as 'Count_of_Rented' FROM sakila.film
join sakila.inventory on sakila.film.film_id = sakila.inventory.film_id
WHERE sakila.film.film_id IN (1, 1, 1, 2, 2)
GROUP BY title

-- find rental id
SELECT sakila.inventory.inventory_id FROM sakila.inventory
join sakila.rental on sakila.rental.inventory_id = sakila.inventory.inventory_id

GROUP BY title ORDER BY Count_of_Rented;

-- combined parts
SELECT sakila.film.title, count(sakila.film.film_id) as 'Count_of_Rented' FROM sakila.film
join sakila.inventory on sakila.film.film_id = sakila.inventory.film_id
WHERE sakila.film.film_id IN (SELECT sakila.inventory.inventory_id FROM sakila.inventory
join sakila.rental on sakila.rental.inventory_id = sakila.inventory.inventory_id)
GROUP BY title ORDER BY Count_of_Rented DESC;