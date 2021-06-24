import {MigrationInterface, QueryRunner, QueryRunnerAlreadyReleasedError, Table, TableForeignKey} from "typeorm";

export class CreateCompliments1624495499150 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "compliments",
                columns: [
                    {   name: "id", type: "uuid", isPrimary: true}, //PK
                    {   name: "user_sender", type: "uuid"},         //Foreign Key
                    {   name: "user_receiver", type: "uuid"},       //Foreign Key 
                    {   name: "tag_id", type: "uuid"},              //Foreign Key
                    {   name: "message", type: "varchar"},
                    {   name: "created_at", type: "timestamp", default: "now()"}
                ],
                foreignKeys: [
                    {
                        name: "FKUserSenderCompliments",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_sender"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: "FKUserReceiverCompliments",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_receiver"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: "FKTagCompliments",
                        referencedTableName: "tags",
                        referencedColumnNames: ["id"],
                        columnNames: ["tag_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("compliments");
    }

}

// await queryRunner.createForeignKey(
//     "compliments",
//     new TableForeignKey({
//         name: "FKUserSenderCompliments",
//         referencedTableName: "users",
//         referencedColumnNames: ["id"],
//         columnNames: ["user_sender"],
//         onDelete: "SET NULL",
//         onUpdate: "SET NULL"
//     })
// )