"use client";
import ArticleGenerator from "@/components/ArticleGenerator";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [employee, setEmployee] = useState<any[]>([]);

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/articles");
        setEmployee(res.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    getEmployee();
  }, []);

  return (
    <>
      <div>
        <ArticleGenerator />
      </div>
      <div className="flex gap-5">
        {employee.map((e, i) => {
          return (
            <div key={i}>
              <h1>{e.title}</h1>
              <p>{e.content}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
