/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import '../css/demo-events.css'

type Props = {
    products: any[];
    onDownload: () => void;
};

export default function SelectedPanel({ products, onDownload }: Props) {
    if (products.length === 0) return null;

    return (
        <div className="selectedPanel">
            <div className="panelHeader">
                <strong>{products.length} Selected</strong>
                <button onClick={onDownload}>Download PDF</button>
            </div>

            <div className="previewList">
                {products.map((p) => (
                    <img
                        key={p.id}
                        src={p.image}
                        alt={p.name}
                        title={p.name}
                    />
                ))}
            </div>
        </div>
    );
}
