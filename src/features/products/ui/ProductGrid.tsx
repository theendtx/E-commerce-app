import ProductCard from "./ProductCard";

type Props = {
    products: any[];
};

function ProductGrid({ products }: Props) {
  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
}

export default ProductGrid;