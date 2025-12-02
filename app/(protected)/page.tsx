"use client";
import ArticleGenerator from "@/components/ArticleGenerator";
import { useEffect } from "react";
import axios from "axios";
import { useSidebar } from "@/components/ui/sidebar";

export default function Home() {
  const { setArticles, articles, setIsLoaded } = useSidebar();

  useEffect(() => {
    const getArticle = async () => {
      try {
        const res = await axios.get("/api/article");
        setArticles(res.data);
      } catch (error) {
        console.log("error fetching articles: ", error);
      } finally {
        setIsLoaded(true);
      }
    };
    getArticle();
  }, [setArticles, setIsLoaded]);

  return (
    <>
      <div>
        <ArticleGenerator />
      </div>
      {/* <div className="flex gap-5">
        {articles.map((e: any, i: number) => {
          return (
            <div key={i}>
              <h1>{e.title}</h1>
              <p>{e.content}</p>
            </div>
          );
        })}
      </div> */}
    </>
  );
}
