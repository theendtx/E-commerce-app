import { Link } from "react-router-dom";

type Props = {
    product: any;
    addToCart: (product: any) => void;
};

function ProductCard({ product, addToCart }: Props) {
    return(
        <Link
  to={`/product/${product.id}`}
>
  <div>
    <img
      src={product.image}
      alt={product.title}
      width="150"
    />

    <h3>{product.title}</h3>

    <p>${product.price}</p>
    <button
  onClick={() => addToCart(product)}
>
  Add To Cart
</button>
  </div>
</Link>
    );
}

export default ProductCard;