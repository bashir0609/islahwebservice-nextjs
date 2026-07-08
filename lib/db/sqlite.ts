import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./sqlite-schema";

let sqliteDbInstance: ReturnType<typeof drizzle> | null = null;

export function getSqliteDb() {
  if (!sqliteDbInstance) {
    const sqlite = new Database("local.db");
    sqliteDbInstance = drizzle(sqlite, { schema });
  }
  return sqliteDbInstance;
}

export const sqlDb = new Proxy({} as ReturnType<typeof drizzle>, {
  get(target, prop, receiver) {
    const instance = getSqliteDb();
    return Reflect.get(instance, prop, receiver);
  }
});