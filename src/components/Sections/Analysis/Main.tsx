import React, { useState } from "react";
import { useArticles } from "@/hooks/useArticles";
import YearChart from "@/components/Sections/Analysis/Charts/Year";
import CountryChart from "@/components/Sections/Analysis/Charts/Country";
import RelavanceChart from "@/components/Sections/Analysis/Charts/relavanceChart"
import Likelihood from "@/components/Sections/Analysis/Charts/Likelihood"


const ArticlesList: React.FC = () => {
  const [page] = useState<number>(1);
  const filters = { limit: 1000 };
  const { articles, loading, error } = useArticles({ page, filters });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  

  return (
    <div className="p-2 ">
      <YearChart articles={articles} />
      <CountryChart articles={articles} />
      <RelavanceChart articles={articles}/>
      <Likelihood articles={articles}/>
    </div>
  );
};

export default ArticlesList;
