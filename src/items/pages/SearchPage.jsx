import { useLocation } from "react-router-dom";
import { useProductStore } from "../store/products.store";
import { useEffect } from "react";

export const SearchPage = () => {
  const { search, minPrice, maxPrice } = useLocation()
  const { products, fetchSearchProducts } = useProductStore()

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const query = queryParams.get("query") || "";
  const min = queryParams.get("min") || 1;
  const max = queryParams.get("max") || 9999999999;


  useEffect(() => {
    fetchSearchProducts({ query, min, max });
  }, [query, min, max, fetchSearchProducts]);


console.log(products);

  return (
    <div>
      <h1>SearchPage</h1>
      <h3>Query: {search}</h3>
    </div>
  )
}

export default SearchPage;
