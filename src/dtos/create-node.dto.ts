import { NodeType } from "../typeorm/entities/node.entity";

export class CreateNodeDto {
  name: string;
  type: NodeType;
}
