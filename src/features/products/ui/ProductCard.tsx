type Props = {
    product: any;
};

function ProductCard({ product }: Props) {
    return(
        <div>
            <img src={product.image} alt={product.name} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
        </div>
    );
}

export default ProductCard;