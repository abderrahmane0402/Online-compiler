-- database name : IDE
-- password : pfeTeam

create table file(
    file_id serial primary key,
    email varchar(255),
    filename  varchar(255),
    content text
);
create table users(
    username char(255),
    email varchar(255) PRIMARY KEY,
    password varchar(255)
)
alter table file add CONSTRAINT FOREIGN KEY email REFERENCES users(email)