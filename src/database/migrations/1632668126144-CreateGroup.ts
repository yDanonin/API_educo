import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateGroup1632668126144 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name:"groups",
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
            },
            {
              name: 'imageId',
              type: 'int',
              isNullable: true,
            },
            {
              name: 'creator',
              type: 'varchar',
            },
            {
              name: 'description',
              type: 'text',
            },
            {
              name: 'name',
              type: 'varchar',
            },
            {
              name: 'isPrivate',
              type: 'boolean'
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

          ]
        })
      )
      await queryRunner.createForeignKey("groups", new TableForeignKey({
        columnNames: ["imageId"],
        referencedColumnNames: ["id"],
        referencedTableName: "images",
        onDelete: "CASCADE"
      }));
      await queryRunner.createForeignKey("groups", new TableForeignKey({
        columnNames: ["creator"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE"
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      const table = await queryRunner.getTable("groups");
      const foreignKeyImage = table.foreignKeys.find(fk => fk.columnNames.indexOf("imageId") !== -1);
      await queryRunner.dropForeignKey("groups", foreignKeyImage);
      await queryRunner.dropColumn("groups", "imageId");
      const foreignKeyCreator = table.foreignKeys.find(fk => fk.columnNames.indexOf("creator") !== -1);
      await queryRunner.dropForeignKey("groups", foreignKeyCreator);
      await queryRunner.dropColumn("groups", "creator");
      await queryRunner.dropTable("groups");
    }

}
