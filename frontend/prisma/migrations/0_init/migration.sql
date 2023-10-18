-- CreateTable
CREATE TABLE "charParse_charword" (
    "id" BIGSERIAL NOT NULL,
    "traditional" TEXT NOT NULL,
    "simplified" TEXT NOT NULL,
    "english" TEXT NOT NULL,
    "pinyin" TEXT NOT NULL,

    CONSTRAINT "charParse_charword_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "charParse_charword_traditional_simplified_e_2c515d57_uniq" ON "charParse_charword"("traditional", "simplified", "english", "pinyin");

