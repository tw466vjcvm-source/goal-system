import type { ScientificArticle } from "@/types/goal-system";

type ScientificArticlesSectionProps = {
  scientificArticles: ScientificArticle[];
};

export function ScientificArticlesSection({
  scientificArticles,
}: ScientificArticlesSectionProps) {
  return (
    <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
      <h2 className="text-3xl font-bold mb-6">Evidencia Científica 📚</h2>

      <div className="space-y-4">
        {scientificArticles.map((article, index) => (
          <div
            key={index}
            className="bg-zinc-800 rounded-2xl p-5 border border-zinc-700"
          >
            <h3 className="text-xl font-semibold mb-2">{article.title}</h3>

            <p className="text-zinc-400">Fuente: {article.source}</p>
          </div>
        ))}
      </div>
    </div>
  );
}