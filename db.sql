drop database if exists my_db;

create database my_db;

use my_db;

create table Users (
    email varchar(255),
    pass varchar(255)
);

insert into Users (email, pass)
values ('test@gmail.com', 'testpwd');

insert into Users (email, pass)
values ('test2@gmail.com', 'test2pwd');