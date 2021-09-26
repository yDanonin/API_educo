import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreatePost1632678976826 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name:"posts",
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
            },
            {
              name: 'text',
              type: 'text',
            },
            {
              name: 'imageId',
              type: 'int',
              isNullable: true,
            },
            {
              name: 'userId',
              type: 'varchar',
            },
            {
              name: 'groupId',
              type: 'int',
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
    await queryRunner.createForeignKey("posts", new TableForeignKey({
      columnNames: ["imageId"],
      referencedColumnNames: ["id"],
      referencedTableName: "images",
      onDelete: "CASCADE"
    }));
    await queryRunner.createForeignKey("posts", new TableForeignKey({
      columnNames: ["userId"],
      referencedColumnNames: ["id"],
      referencedTableName: "users",
      onDelete: "CASCADE"
    }))
    await queryRunner.createForeignKey("posts", new TableForeignKey({
      columnNames: ["groupId"],
      referencedColumnNames: ["id"],
      referencedTableName: "groups",
      onDelete: "CASCADE"
    }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      const table = await queryRunner.getTable("posts");
      const foreignKeyImage = table.foreignKeys.find(fk => fk.columnNames.indexOf("imageId") !== -1);
      await queryRunner.dropForeignKey("posts", foreignKeyImage);
      await queryRunner.dropColumn("posts", "imageId");
      const foreignKeyUser = table.foreignKeys.find(fk => fk.columnNames.indexOf("userId") !== -1);
      await queryRunner.dropForeignKey("posts", foreignKeyUser);
      await queryRunner.dropColumn("posts", "userId");
      const foreignKeyGroup = table.foreignKeys.find(fk => fk.columnNames.indexOf("groupId") !== -1);
      await queryRunner.dropForeignKey("posts", foreignKeyGroup);
      await queryRunner.dropColumn("posts", "groupId");
      await queryRunner.dropTable("posts");
    }

}
