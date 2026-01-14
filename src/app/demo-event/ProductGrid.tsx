'use client';

import '../css/demo-events.css';

type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  qty?: number;
};

type Props = {
  products: Product[];
  selected: Product[];
  onToggle: (product: Product) => void;
  onQtyChange: (id: number, change: number) => void;
};

export default function ProductGrid({
  products,
  selected,
  onToggle,
  onQtyChange,
}: Props) {
  const selectedItem = (id: number) =>
    selected.find((p) => p.id === id);

  return (
    <div className="grid">
      {products.map((product) => {
        const isActive = selectedItem(product.id);

        return (
          <div
            key={product.id}
            className={`card ${isActive ? 'active' : ''}`}
            onClick={() => onToggle(product)}
          >
            <img src={product.image} alt={product.name} />

            <div className="cardBody">
              <h4>{product.name}</h4>
              <p>{product.description}</p>

              {/* ---------- QUANTITY CONTROLS ---------- */}
              {isActive && (
                <div className="qty">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQtyChange(product.id, -1);
                    }}
                  >
                    −
                  </button>

                  <span>{isActive.qty ?? 1}</span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQtyChange(product.id, 1);
                    }}
                  >
                    +
                  </button>
                </div>
              )}

              <span className="selectBadge">
                {isActive ? 'Selected ✓' : 'Click to select'}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
