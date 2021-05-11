use admindb;
create table computer(
computerID int not null,
computerName varchar(20),
computerIP varchar(30),
computer_status varchar(20),
primary key (computerID)
); 
alter table users
add status_user varchar(20);
alter table computer
add status_user varchar(20);
alter table computer
alter status_user set default 'inactive';
select * from computer;
select * from users where status_user="active";