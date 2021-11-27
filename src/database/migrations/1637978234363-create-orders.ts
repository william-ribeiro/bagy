import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createOrders1637978234363 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'customer_id',
            type: 'integer',
          },
          {
            name: 'installments',
            type: 'integer',
          },
          {
            name: 'total',
            type: 'decimal(12,2)',
          },
          {
            name: 'status',
            type: 'varchar(30)',
          },
        ],
        foreignKeys: [
          {
            name: 'fk_order_customer',
            referencedTableName: 'customers',
            referencedColumnNames: ['id'],
            columnNames: ['customer_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders');
  }
}
