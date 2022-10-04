/*
  Warnings:

  - You are about to drop the column `expiration` on the `workout` table. All the data in the column will be lost.
  - You are about to drop the column `valid` on the `workout` table. All the data in the column will be lost.
  - Added the required column `date` to the `workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `workout` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_workout" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" REAL NOT NULL,
    "date" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_workout" ("createdAt", "id", "updatedAt", "userId") SELECT "createdAt", "id", "updatedAt", "userId" FROM "workout";
DROP TABLE "workout";
ALTER TABLE "new_workout" RENAME TO "workout";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
