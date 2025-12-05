-- CreateTable
CREATE TABLE "articles" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100),
    "content" TEXT,
    "summary" TEXT,
    "createdat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "id" SERIAL NOT NULL,
    "articlesId" INTEGER NOT NULL,
    "questionText" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "optionA" TEXT NOT NULL,
    "optionB" TEXT NOT NULL,
    "optionC" TEXT NOT NULL,
    "optionD" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_articlesId_fkey" FOREIGN KEY ("articlesId") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
