import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getProduct } from "../shared/api/productApi";
import Header from "../shared/ui/Header";
import type { Product } from "../shared/types/Product";

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function loadProduct() {
      const data = await getProduct(id!);

      setProduct(data);
    }

    loadProduct();
  }, [id]);

  if (!product) {
    return <h2 className="status-message">Loading...</h2>;
  }

  return (
    <>
    <Header />
    <main className="page-shell">
      <Link className="text-link" to="/">
        Back to shop
      </Link>

      <section className="product-details">
        <img src={product.image} alt={product.title} />

        <div>
          <p className="eyebrow">{product.category}</p>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <h2>${product.price.toFixed(2)}</h2>
        </div>
      </section>
    </main>
    </>
  );
}

export default ProductDetailsPage;
