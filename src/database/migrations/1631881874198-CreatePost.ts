import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreatePost1631881874198 implements MigrationInterface {

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
              name: 'userId',
              type: 'varchar',
            },
            {
              name: 'imageId',
              type: 'int',
              isNullable: true,
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
  }));
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("posts");
    const foreignKeyUser = table.foreignKeys.find(fk => fk.columnNames.indexOf("userId") !== -1);
    await queryRunner.dropForeignKey("posts", foreignKeyUser);
    await queryRunner.dropColumn("posts", "userId");
    const foreignKeyImage = table.foreignKeys.find(fk => fk.columnNames.indexOf("imageId") !== -1);
    await queryRunner.dropForeignKey("posts", foreignKeyImage);
    await queryRunner.dropColumn("posts", "imageId");
    await queryRunner.dropTable("posts");
    }

}
