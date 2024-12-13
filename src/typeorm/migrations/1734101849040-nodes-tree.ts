import { MigrationInterface, QueryRunner } from "typeorm";

export class NodesTree1734101849040 implements MigrationInterface {
  name = "NodesTree1734101849040";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."node_entity_type_enum" AS ENUM('0', '1')`);
    await queryRunner.query(`CREATE TABLE "node_entity"
                             (
                                 "id"       uuid                             NOT NULL DEFAULT uuid_generate_v4(),
                                 "type"     "public"."node_entity_type_enum" NOT NULL DEFAULT '0',
                                 "name"     character varying                NOT NULL,
                                 "parentId" uuid,
                                 CONSTRAINT "PK_8f5e75ca1d9eed7bab422f1f547" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`CREATE TABLE "node_entity_closure"
                             (
                                 "id_ancestor"   uuid NOT NULL,
                                 "id_descendant" uuid NOT NULL,
                                 CONSTRAINT "PK_66bf0d02c1eb654e4241e84aae1" PRIMARY KEY ("id_ancestor", "id_descendant")
                             )`);
    await queryRunner.query(`CREATE INDEX "IDX_38d16cc49dc5e889833a8ed933" ON "node_entity_closure" ("id_ancestor") `);
    await queryRunner.query(
      `CREATE INDEX "IDX_14f95bff7f940966a8e2bf1f16" ON "node_entity_closure" ("id_descendant") `
    );
    await queryRunner.query(`ALTER TABLE "node_entity"
        ADD CONSTRAINT "FK_392289c02032c903a1d44c172db" FOREIGN KEY ("parentId") REFERENCES "node_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "node_entity_closure"
        ADD CONSTRAINT "FK_38d16cc49dc5e889833a8ed9337" FOREIGN KEY ("id_ancestor") REFERENCES "node_entity" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "node_entity_closure"
        ADD CONSTRAINT "FK_14f95bff7f940966a8e2bf1f164" FOREIGN KEY ("id_descendant") REFERENCES "node_entity" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "node_entity_closure" DROP CONSTRAINT "FK_14f95bff7f940966a8e2bf1f164"`);
    await queryRunner.query(`ALTER TABLE "node_entity_closure" DROP CONSTRAINT "FK_38d16cc49dc5e889833a8ed9337"`);
    await queryRunner.query(`ALTER TABLE "node_entity" DROP CONSTRAINT "FK_392289c02032c903a1d44c172db"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_14f95bff7f940966a8e2bf1f16"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_38d16cc49dc5e889833a8ed933"`);
    await queryRunner.query(`DROP TABLE "node_entity_closure"`);
    await queryRunner.query(`DROP TABLE "node_entity"`);
    await queryRunner.query(`DROP TYPE "public"."node_entity_type_enum"`);
  }
}
