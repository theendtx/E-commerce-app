import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProduct } from "../shared/api/productApi";

function ProductDetailsPage() {
  const { id } = useParams();

  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    async function loadProduct() {
      const data = await getProduct(id!);

      setProduct(data);
    }

    loadProduct();
  }, [id]);

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <img
        src={product.image}
        alt={product.title}
        width="200"
      />

      <h2>{product.title}</h2>

      <p>{product.description}</p>

      <h3>${product.price}</h3>
    </>
  );
}

export default ProductDetailsPage;