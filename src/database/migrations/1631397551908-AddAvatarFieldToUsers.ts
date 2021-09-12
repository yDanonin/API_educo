import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddAvatarFieldToUsers1631397551908 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('users', new TableColumn({
        name: 'avatar',
        type: 'int',
        isNullable: true,
      }))
      await queryRunner.createForeignKey("users", new TableForeignKey({
        columnNames: ["avatar"],
        referencedColumnNames: ["id"],
        referencedTableName: "images",
        onDelete: "CASCADE"
    }));
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("users");
    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("avatar") !== -1);
    await queryRunner.dropForeignKey("users", foreignKey);
    await queryRunner.dropColumn("users", "avatar");
    }

}
