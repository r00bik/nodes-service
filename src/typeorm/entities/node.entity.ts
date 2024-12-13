import { Column, Entity, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from "typeorm";

export enum NodeType {
  "FOLDER",
  "DOCUMENT",
}

@Entity()
@Tree("closure-table")
export class NodeEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "enum", default: NodeType.FOLDER, enum: NodeType })
  type: NodeType;

  @Column("varchar")
  name: string;

  @TreeChildren()
  children: NodeEntity[];

  @TreeParent()
  parent: NodeEntity;
}
