import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateAnswer1635805051566 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'answer',
          columns: [
            {
              name: 'answerId',
              type: 'int',
              isPrimary: true,
            },
            {
              name: 'postId',
              type: 'int',
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
      await queryRunner.createForeignKey("answer", new TableForeignKey({
        columnNames: ["answerId"],
        referencedColumnNames: ["id"],
        referencedTableName: "posts",
        onDelete: "CASCADE"
      }));
      await queryRunner.createForeignKey("answer", new TableForeignKey({
        columnNames: ["postId"],
        referencedColumnNames: ["id"],
        referencedTableName: "posts",
        onDelete: "CASCADE"
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      const table = await queryRunner.getTable("answer");
      const foreignKeyAnswer = table.foreignKeys.find(fk => fk.columnNames.indexOf("answerId") !== -1);
      await queryRunner.dropForeignKey("answer", foreignKeyAnswer);
      await queryRunner.dropColumn("answer", "answerId");
      const foreignKeyPost = table.foreignKeys.find(fk => fk.columnNames.indexOf("postId") !== -1);
      await queryRunner.dropForeignKey("answer", foreignKeyPost);
      await queryRunner.dropColumn("answer", "postId");
      await queryRunner.dropTable("answer");
    }

}
