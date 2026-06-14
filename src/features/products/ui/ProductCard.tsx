type Props = {
    product: any;
};

function ProductCard({ product }: Props) {
    return(
        <a href={`/product/${product.id}`}>
  <div>
    <img
      src={product.image}
      alt={product.title}
      width="150"
    />

    <h3>{product.title}</h3>

    <p>${product.price}</p>
  </div>
</a>
    );
}

export default ProductCard;