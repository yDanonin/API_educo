import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateFollowers1638488771855 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'followers',
        columns: [
          {
            name: 'follower',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'followed',
            type: 'varchar',
            isPrimary: true
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
    await queryRunner.createForeignKey("followers", new TableForeignKey({
      columnNames: ["follower"],
      referencedColumnNames: ["id"],
      referencedTableName: "users",
      onDelete: "CASCADE"
    }));
    await queryRunner.createForeignKey("followers", new TableForeignKey({
      columnNames: ["followed"],
      referencedColumnNames: ["id"],
      referencedTableName: "users",
      onDelete: "CASCADE"
    }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      const table = await queryRunner.getTable("followers");
      const foreignKeyFollower = table.foreignKeys.find(fk => fk.columnNames.indexOf("follower") !== -1);
      await queryRunner.dropForeignKey("followers", foreignKeyFollower);
      await queryRunner.dropColumn("followers", "follower");
      const foreignKeyFollowed = table.foreignKeys.find(fk => fk.columnNames.indexOf("followed") !== -1);
      await queryRunner.dropForeignKey("followers", foreignKeyFollowed);
      await queryRunner.dropColumn("followers", "followed");
      await queryRunner.dropTable("followers");
    }

}
