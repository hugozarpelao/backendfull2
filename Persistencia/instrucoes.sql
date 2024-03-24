CREATE TABLE grupo(
    grupo_codigo INT NOT NULL AUTO_INCREMENT,
    grupo_descricao VARCHAR(100) NOT NULL,
    CONSTRAINT pk_grupo PRIMARY KEY(grupo_codigo)
);

CREATE TABLE carro(
    car_codigo INT NOT NULL AUTO_INCREMENT,
    car_descricao VARCHAR(100) NOT NULL,
    car_precoAluguel DECIMAL(10,2) NOT NULL DEFAULT 0,
    grupo_codigo INT NOT NULL,
    CONSTRAINT pk_carro PRIMARY KEY(car_codigo)
);