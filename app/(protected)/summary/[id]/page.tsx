import SummarizedContent from "@/components/SummarizedContent";

import prisma from "@/lib/prisma";

interface SummaryPageProps {
  params: {
    id: string;
  };
}
export default async function SummaryPage({ params }: SummaryPageProps) {
  const articleId = parseInt(params.id);

  if (isNaN(articleId)) {
    return <div className="p-5">Error</div>;
  }

  const article = await prisma.articles.findUnique({
    where: { id: articleId },
  });

  if (!article) {
    return <div className="p-5">Article not found</div>;
  }

  const initialContent = article.content || "";
  const articleTitle = article.title || "No Title";
  return (
    <div>
      <SummarizedContent
        initialContent={article.content}
        articleTitle={article.title}
      />
    </div>
  );
}
