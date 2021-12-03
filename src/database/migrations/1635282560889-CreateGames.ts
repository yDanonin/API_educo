import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export default class CreateGames1635282560889 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
            name: 'games',
            columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true
                },
                {
                  name: 'creatorId',
                  type: 'varchar',
                },
                {
                  name: 'apkName',
                  type: 'varchar',
                  isNullable: true,
                },
                {
                  name: 'keyWords',
                  type: 'varchar'
                },
                {
                  name: 'type',
                  type: 'varchar',
                },
                {
                  name: 'description',
                  type: 'varchar',
                },
                {
                  name: 'local',
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
                }
            ],
        }),
    );
    await queryRunner.createForeignKey("games", new TableForeignKey({
      columnNames: ["creatorId"],
      referencedColumnNames: ["id"],
      referencedTableName: "users",
      onDelete: "CASCADE"
    }));
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
      const table = await queryRunner.getTable("games");
      const foreignKeyCreator = table.foreignKeys.find(fk => fk.columnNames.indexOf("creatorId") !== -1);
      await queryRunner.dropForeignKey("games", foreignKeyCreator);
      await queryRunner.dropColumn("games", "creatorId");
      await queryRunner.dropTable('games');
    }

}
