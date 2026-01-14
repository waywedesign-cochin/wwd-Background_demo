export const products = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  description: 'High quality event item',
  image: `https://picsum.photos/300/200?random=${i + 1}`,
  category: i % 3 === 0 ? 'Decor' : i % 3 === 1 ? 'Furniture' : 'Lighting',
}));
