drop schema if exists public cascade;
create schema public;

create table persona(
    id serial primary key,
    paterno varchar default '',
    materno varchar default '',
    nombres varchar default '',
    fechanacimiento date default now(),
    direccion varchar default '',
    telefono integer default 7777777
);

create table estudiante(
    id serial primary key,
    persona_id integer,
    planestudio varchar default '',
    foreign key (persona_id) references persona(id)
);
