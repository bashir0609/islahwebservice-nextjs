import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// Lazy initialization to avoid connection errors during build
let dbInstance: ReturnType<typeof drizzle> | null = null;
let buildTimeFallback = false;

function createMockDb() {
  // Mock database that returns empty arrays for select queries
  // This allows builds to succeed without DATABASE_URL
  const emptyArray = Promise.resolve([]);
  const mockQuery = {
    from: () => mockQuery,
    where: () => mockQuery,
    orderBy: () => mockQuery,
    limit: () => emptyArray,
    then: (resolve: (v: unknown[]) => void) => resolve([]),
  };
  // Cast through unknown to satisfy TypeScript
  return {
    select: () => mockQuery,
    insert: () => ({ values: () => Promise.resolve({}) }),
    update: () => ({ set: () => ({ where: () => Promise.resolve({}) }) }),
    delete: () => ({ where: () => Promise.resolve({}) }),
  } as unknown as ReturnType<typeof drizzle>;
}

export function getDb() {
  if (!dbInstance) {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      // During build without DATABASE_URL, use mock database
      // This allows static generation to succeed (returning empty dynamic content)
      if (process.env.NEXT_PHASE === "phase-production-build" || process.env.VERCEL) {
        buildTimeFallback = true;
        console.warn("[db] DATABASE_URL not set during build; using mock database. Dynamic routes will not be statically generated.");
        dbInstance = createMockDb();
        return dbInstance;
      }
      throw new Error("DATABASE_URL environment variable is not set");
    }
    const pool = new Pool({ connectionString: databaseUrl });
    dbInstance = drizzle(pool, { schema });
  }
  return dbInstance;
}

// Export a proxy that initializes on first use
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(target, prop, receiver) {
    const instance = getDb();
    return Reflect.get(instance, prop, receiver);
  }
});

export function isBuildTimeFallback(): boolean {
  return buildTimeFallback;
}