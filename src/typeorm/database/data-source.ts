import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import * as path from "node:path";
import * as process from "node:process";

const entitiesPath = path.resolve(process.cwd(), "./src/typeorm", "./entities/*.entity{.js,.ts}");
const migrationsPath = path.resolve(process.cwd(), "./src/typeorm", "./migrations/*{.js,.ts}");

export const dataSourceOptions: PostgresConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "admin",
  password: "admin",
  database: "whitebox",
  entities: [entitiesPath],
  migrations: [migrationsPath],
  migrationsTableName: "migration_table",
};

export default new DataSource(dataSourceOptions);
