import ProductCard from "./ProductCard";

type Props = {
    products: any[];
    addToCart?: (product: any) => void;
};

function ProductGrid({ products, addToCart }: Props) {
  const handleAdd = addToCart ?? (() => {});

  return (
    <>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addToCart={handleAdd}
        />
      ))}
    </>
  );
}

export default ProductGrid;