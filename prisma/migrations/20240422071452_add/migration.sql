/*
  Warnings:

  - Added the required column `example_sentence_kana` to the `Word` table without a default value. This is not possible if the table is not empty.
  - Added the required column `example_sentence_romaji` to the `Word` table without a default value. This is not possible if the table is not empty.
  - Added the required column `example_sentence_translation` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Word" ADD COLUMN     "example_sentence_kana" TEXT NOT NULL,
ADD COLUMN     "example_sentence_romaji" TEXT NOT NULL,
ADD COLUMN     "example_sentence_translation" TEXT NOT NULL;
