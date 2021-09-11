import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export default class images1630420604558 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
          name: 'images',
          columns: [
              {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true
              },
              {
                name: 'userId',
                type: 'varchar',
              },
              {
                name: 'nome',
                type: 'varchar',
              },
              {
                name: 'local',
                type: 'varchar',
              },
              {
                name: 'tipo',
                type: 'varchar',
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
          ],
      }),
  );
  await queryRunner.createForeignKey("images", new TableForeignKey({
    columnNames: ["userId"],
    referencedColumnNames: ["id"],
    referencedTableName: "users",
    onDelete: "CASCADE"
}));
}


  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("images");
    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("userId") !== -1);
    await queryRunner.dropForeignKey("images", foreignKey);
    await queryRunner.dropColumn("images", "userId");
    await queryRunner.dropTable('images');
  }

}

