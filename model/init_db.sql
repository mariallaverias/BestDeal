SET foreign_key_checks = 0;
DROP TABLE IF EXISTS productcategories;
DROP TABLE IF EXISTS productitems;
DROP TABLE IF EXISTS grocerylists;
DROP TABLE IF EXISTS list;
DROP TABLE IF EXISTS shops;
DROP TABLE IF EXISTS shops_productItems;
DROP TABLE IF EXISTS products_list;
SET foreign_key_checks = 1;
 
CREATE TABLE productcategories (
	id INT NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE productitems (
	id INT NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	brand varchar(255) NOT NULL,
	packageQuantity INT NOT NULL,
	fk_productCategoryId INT NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE list (
	id INT NOT NULL AUTO_INCREMENT,
	listName varchar(255),
	products VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE shops (
	shopId INT NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	PRIMARY KEY (shopId)
);

CREATE TABLE shops_productItems (
	id INT NOT NULL AUTO_INCREMENT,
	fk_shopID INT NOT NULL,
	fk_productId INT NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE products_list (
	fk_listId INT NOT NULL,
	fk_prodId INT NOT NULL
);

ALTER TABLE productitems ADD CONSTRAINT productitems_fk0 FOREIGN KEY (fk_productCategoryId) REFERENCES productcategories(id);

ALTER TABLE shops_productItems ADD CONSTRAINT shops_productItems_fk0 FOREIGN KEY (fk_shopID) REFERENCES shops(shopId);

ALTER TABLE shops_productItems ADD CONSTRAINT shops_productItems_fk1 FOREIGN KEY (fk_productId) REFERENCES productitems(id);

ALTER TABLE products_list ADD CONSTRAINT products_list_fk0 FOREIGN KEY (fk_listId) REFERENCES list(id);

ALTER TABLE products_list ADD CONSTRAINT products_list_fk1 FOREIGN KEY (fk_prodId) REFERENCES productitems(id);




















 
INSERT INTO productcategories(name)
VALUES ("Aceite, especias y salsas"),
("Arroz, legumbres y pasta"),
("Cacao,café e infusiones"),
("Huevos, leche y mantequilla"),
("Fruta y verdura"),
("Limpieza y hogar");
 
INSERT INTO shops(name)
VALUES ("Superdona"),
("Corte Escocés"),
("Anacard");
 
 
INSERT  INTO productitems(name, brand, packageQuantity, fk_productCategoryId)
VALUES ("Aceite de Oliva","Hojiblanca","300","1"),
("Pimienta","Pepita peppers","100","1"),
("Salsa picante","Tabasco","57","1"),
("Mayonesa","Hellmans","475","1"),
("Mostaza antigua","Monsieur Bleh","200","1"),
("Arroz Largo","Sos","1000","2"),
("Pasta","De Cecco","500","2"),
("Habichuelas","Pimentel","500","2"),
("Lentejas","Pimentel","500","2"),
("Café","Santo Domingo","500","3"),
("Te Jengibre","Darjeeling","30","3"),
("Chocolate amargo en polvo","Valor","200","3"),
("Leche entera","Pascual","1000","4"),
("Yogur","La Fageda","720","4"),
("Huevos","Piopio","6","4"),
("Mantequilla","Cadi","250","4"),
("Plátano macho","Doole","1000","5"),
("Tomates pera","Molins","1000","5"),
("Lechuga cogollos","Molins","1","5"),
("Uva","Pepita","500","5"),
("Detergente","Ariel","1430","6"),
("Lavavajillas","Fairy","1000","6"),
("Quitamanchas","Sanitol","450","6"),
("Fregasuelos","Mistolin","1500","6");
 
 
INSERT  INTO shops_productitems(fk_productId,price,fk_shopID)
VALUES ("1",4.85,"1"),
("2",1.25,"1"),
("3",2.79,"1"),
("4",2.22,"1"),
("5",2.00,"1"),
("6",1.00,"1"),
("7",1.35,"1"),
("8",1.45,"1"),
("9",1.00,"1"),
("10",2.00,"1"),
("11",1.20,"1"),
("12",2.50,"1"),
("13",0.97,"1"),
("14",1.75,"1"),
("15",2.65,"1"),
("16",2.85,"1"),
("17",2.95,"1"),
("18",3.00,"1"),
("19",1.00,"1"),
("20",2.45,"1"),
("21",6.95,"1"),
("22",2.22,"1"),
("23",4.95,"1"),
("24",1.95,"1"),
("1",4.85,"2"),
("2",1.35,"2"),
("3",2.79,"2"),
("4",2.80,"2"),
("5",1.95,"2"),
("6",1.00,"2"),
("7",1.00,"2"),
("8",1.45,"2"),
("9",0.90,"2"),
("10",2.00,"2"),
("11",1.00,"2"),
("12",2.40,"2"),
("13",0.95,"2"),
("14",1.90,"2"),
("15",2.65,"2"),
("16",2.85,"2"),
("17",2.95,"2"),
("18",3.00,"2"),
("19",1.19,"2"),
("20",2.30,"2"),
("21",6.35,"2"),
("22",2.95,"2"),
("23",4.85,"2"),
("24",1.85,"2"),
("1",4.55,"3"),
("2",1.15,"3"),
("3",2.79,"3"),
("4",2.80,"3"),
("5",1.95,"3"),
("6",1.00,"3"),
("7",1.35,"3"),
("8",1.45,"3"),
("9",0.95,"3"),
("10",2.00,"3"),
("11",1.19,"3"),
("12",2.00,"3"),
("13",0.89,"3"),
("14",1.90,"3"),
("15",2.22,"3"),
("16",2.56,"3"),
("17",2.65,"3"),
("18",2.80,"3"),
("19",1.19,"3"),
("20",2.30,"3"),
("21",6.99,"3"),
("22",3.80,"3"),
("23",5.65,"3"),
("24",1.75,"3");
