create schema cccat9;

create table cccat9.product(
    id_product integer primary key,
    description text,
    price numeric
);

insert into cccat9.product values (1, 'A', 1000);
insert into cccat9.product values (2, 'B', 5000);
insert into cccat9.product values (3, 'C', 30);
