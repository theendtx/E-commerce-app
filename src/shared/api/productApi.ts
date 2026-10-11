export async function getProducts() {
  const response = await fetch(
    "https://fakestoreapi.com/products"
  );

  if (!response.ok) {
    throw new Error("Failed to load products");
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Invalid products response");
  }

  return data;
}

export async function getProduct(id: string) {
  const response = await fetch(
    `https://fakestoreapi.com/products/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to load product");
  }

  const data = await response.json();

  if (!data || typeof data.id !== "number") {
    throw new Error("Invalid product response");
  }

  return data;
}
