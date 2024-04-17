import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
       try {
         const response = await fetch(url);
         if (!response.ok) {
           throw new Error("Network response was not ok");
         }
         const jsonData = await response.json();
         setData(jsonData?.colors);
         setLoading(false);
       } catch (error) {
         setError(error);
         setLoading(false);
       }
    };
    fetchData();
  }, []);


  return { data, loading, error };
};

export default useFetch;


