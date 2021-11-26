import { MigrationInterface, QueryRunner } from 'typeorm';

export default class createTables1637891276049 implements MigrationInterface {
  name = 'createTables1637891276049';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "products" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime(\'now\')), "updated_at" datetime NOT NULL DEFAULT (datetime(\'now\')), "name" varchar NOT NULL, "image_url" varchar NOT NULL, "description" varchar NOT NULL, "weight" decimal NOT NULL, "price" integer NOT NULL, "stock" integer NOT NULL, "orderProductId" integer, CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"))',
    );
    await queryRunner.query(
      'CREATE TABLE "orders_products" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime(\'now\')), "updated_at" datetime NOT NULL DEFAULT (datetime(\'now\')), "order_id" integer NOT NULL, "product_id" integer NOT NULL, "quantity" integer NOT NULL, "price" decimal NOT NULL)',
    );
    await queryRunner.query(
      'CREATE TABLE "orders" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime(\'now\')), "updated_at" datetime NOT NULL DEFAULT (datetime(\'now\')), "customer_id" integer NOT NULL, "installments" integer NOT NULL, "total" decimal NOT NULL, "status" varchar NOT NULL)',
    );
    await queryRunner.query(
      'CREATE TABLE "customers" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime(\'now\')), "updated_at" datetime NOT NULL DEFAULT (datetime(\'now\')), "name" varchar NOT NULL, "email" varchar NOT NULL, "cpf" varchar NOT NULL, "birth_date" varchar, "street" varchar, "street_number" varchar, "district" varchar, "city" varchar, "zip_code" varchar, "state" varchar, "country" varchar, CONSTRAINT "UQ_8536b8b85c06969f84f0c098b03" UNIQUE ("email"), CONSTRAINT "UQ_413de651cfd9c576b99cec83fd3" UNIQUE ("cpf"))',
    );
    await queryRunner.query(
      'CREATE TABLE "temporary_products" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime(\'now\')), "updated_at" datetime NOT NULL DEFAULT (datetime(\'now\')), "name" varchar NOT NULL, "image_url" varchar NOT NULL, "description" varchar NOT NULL, "weight" decimal NOT NULL, "price" integer NOT NULL, "stock" integer NOT NULL, "orderProductId" integer, CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "FK_058e046d073cc80a61f1d9f0733" FOREIGN KEY ("orderProductId") REFERENCES "orders_products" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)',
    );
    await queryRunner.query(
      'INSERT INTO "temporary_products"("id", "created_at", "updated_at", "name", "image_url", "description", "weight", "price", "stock", "orderProductId") SELECT "id", "created_at", "updated_at", "name", "image_url", "description", "weight", "price", "stock", "orderProductId" FROM "products"',
    );

    await queryRunner.query('DROP TABLE "products"');
    await queryRunner.query('ALTER TABLE "temporary_products" RENAME TO "products"');
    await queryRunner.query(
      'CREATE TABLE "temporary_orders_products" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime(\'now\')), "updated_at" datetime NOT NULL DEFAULT (datetime(\'now\')), "order_id" integer NOT NULL, "product_id" integer NOT NULL, "quantity" integer NOT NULL, "price" decimal NOT NULL, CONSTRAINT "FK_266b0df20b9e4423bc9da1bbdc1" FOREIGN KEY ("order_id") REFERENCES "orders" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)',
    );
    await queryRunner.query(
      'INSERT INTO "temporary_orders_products"("id", "created_at", "updated_at", "order_id", "product_id", "quantity", "price") SELECT "id", "created_at", "updated_at", "order_id", "product_id", "quantity", "price" FROM "orders_products"',
    );

    await queryRunner.query('DROP TABLE "orders_products"');
    await queryRunner.query('ALTER TABLE "temporary_orders_products" RENAME TO "orders_products"');
    await queryRunner.query(
      'CREATE TABLE "temporary_orders" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime(\'now\')), "updated_at" datetime NOT NULL DEFAULT (datetime(\'now\')), "customer_id" integer NOT NULL, "installments" integer NOT NULL, "total" decimal NOT NULL, "status" varchar NOT NULL, CONSTRAINT "FK_772d0ce0473ac2ccfa26060dbe9" FOREIGN KEY ("customer_id") REFERENCES "customers" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)',
    );
    await queryRunner.query(
      'INSERT INTO "temporary_orders"("id", "created_at", "updated_at", "customer_id", "installments", "total", "status") SELECT "id", "created_at", "updated_at", "customer_id", "installments", "total", "status" FROM "orders"',
    );

    await queryRunner.query('DROP TABLE "orders"');
    await queryRunner.query('ALTER TABLE "temporary_orders" RENAME TO "orders"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "orders" RENAME TO "temporary_orders"');
    await queryRunner.query(
      'CREATE TABLE "orders" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime(\'now\')), "updated_at" datetime NOT NULL DEFAULT (datetime(\'now\')), "customer_id" integer NOT NULL, "installments" integer NOT NULL, "total" decimal NOT NULL, "status" varchar NOT NULL)',
    );
    await queryRunner.query(
      'INSERT INTO "orders"("id", "created_at", "updated_at", "customer_id", "installments", "total", "status") SELECT "id", "created_at", "updated_at", "customer_id", "installments", "total", "status" FROM "temporary_orders"',
    );

    await queryRunner.query('DROP TABLE "temporary_orders"');
    await queryRunner.query('ALTER TABLE "orders_products" RENAME TO "temporary_orders_products"');
    await queryRunner.query(
      'CREATE TABLE "orders_products" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime(\'now\')), "updated_at" datetime NOT NULL DEFAULT (datetime(\'now\')), "order_id" integer NOT NULL, "product_id" integer NOT NULL, "quantity" integer NOT NULL, "price" decimal NOT NULL)',
    );
    await queryRunner.query(
      'INSERT INTO "orders_products"("id", "created_at", "updated_at", "order_id", "product_id", "quantity", "price") SELECT "id", "created_at", "updated_at", "order_id", "product_id", "quantity", "price" FROM "temporary_orders_products"',
    );

    await queryRunner.query('DROP TABLE "temporary_orders_products"');
    await queryRunner.query('ALTER TABLE "products" RENAME TO "temporary_products"');
    await queryRunner.query(
      'CREATE TABLE "products" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime(\'now\')), "updated_at" datetime NOT NULL DEFAULT (datetime(\'now\')), "name" varchar NOT NULL, "image_url" varchar NOT NULL, "description" varchar NOT NULL, "weight" decimal NOT NULL, "price" integer NOT NULL, "stock" integer NOT NULL, "orderProductId" integer, CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"))',
    );
    await queryRunner.query(
      'INSERT INTO "products"("id", "created_at", "updated_at", "name", "image_url", "description", "weight", "price", "stock", "orderProductId") SELECT "id", "created_at", "updated_at", "name", "image_url", "description", "weight", "price", "stock", "orderProductId" FROM "temporary_products"',
    );

    await queryRunner.query('DROP TABLE "temporary_products"');
    await queryRunner.query('DROP TABLE "customers"');
    await queryRunner.query('DROP TABLE "orders"');
    await queryRunner.query('DROP TABLE "orders_products"');
    await queryRunner.query('DROP TABLE "products"');
  }
}
