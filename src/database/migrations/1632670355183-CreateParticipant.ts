import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateParticipant1632670355183 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name:"participants",
        columns: [
          {
            name: 'userId',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'groupId',
            type: 'int',
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
        ]
      })
    )
    await queryRunner.createForeignKey("participants", new TableForeignKey({
      columnNames: ["userId"],
      referencedColumnNames: ["id"],
      referencedTableName: "users",
      onDelete: "CASCADE"
    }));
    await queryRunner.createForeignKey("participants", new TableForeignKey({
      columnNames: ["groupId"],
      referencedColumnNames: ["id"],
      referencedTableName: "groups",
      onDelete: "CASCADE"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("participants");
    const foreignKeyGroup = table.foreignKeys.find(fk => fk.columnNames.indexOf("groupId") !== -1);
    await queryRunner.dropForeignKey("participants", foreignKeyGroup);
    await queryRunner.dropColumn("participants", "groupId");
    const foreignKeyUser = table.foreignKeys.find(fk => fk.columnNames.indexOf("userId") !== -1);
    await queryRunner.dropForeignKey("participants", foreignKeyUser);
    await queryRunner.dropColumn("participants", "userId");
    await queryRunner.dropTable("participants");
  }

}
