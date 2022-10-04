-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_workout" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT,
    "description" TEXT,
    "duration" REAL,
    "date" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_workout" ("createdAt", "date", "description", "duration", "id", "name", "type", "updatedAt", "userId") SELECT "createdAt", "date", "description", "duration", "id", "name", "type", "updatedAt", "userId" FROM "workout";
DROP TABLE "workout";
ALTER TABLE "new_workout" RENAME TO "workout";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
