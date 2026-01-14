import jsPDF from 'jspdf';

/* ---------- TYPES ---------- */
type Event = {
  name: string;
  date: string;
  notes: string;
};

type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  qty?: number;
  category?: string;
};

/* ---------- IMAGE LOADER ---------- */
const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () =>
      reject(new Error(`Failed to load image: ${url}`));
  });
};

/* ---------- PDF GENERATOR ---------- */
export const generateEventPDF = async (
  event: Event,
  products: Product[],
  onProgress?: (value: number) => void
): Promise<Blob> => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  let y = 20;

  /* ---------- HEADER ---------- */
  onProgress?.(10);

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(18);
  pdf.text('Event Product List', 14, y);

  y += 10;
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Event Name: ${event.name}`, 14, y);
  y += 6;
  pdf.text(`Event Date: ${event.date}`, 14, y);
  y += 6;

  if (event.notes) {
    pdf.text(`Notes: ${event.notes}`, 14, y, { maxWidth: 180 });
    y += 8;
  }

  /* ---------- SUMMARY ---------- */
  onProgress?.(25);

  const totalQty = products.reduce(
    (sum, p) => sum + (p.qty || 1),
    0
  );

  pdf.setFont('helvetica', 'bold');
  pdf.text(`Total Products: ${products.length}`, 14, y);
  y += 6;
  pdf.text(`Total Quantity: ${totalQty}`, 14, y);

  y += 8;
  pdf.line(14, y, 196, y);
  y += 10;

  /* ---------- GROUP BY CATEGORY ---------- */
  onProgress?.(40);

  const grouped = products.reduce<Record<string, Product[]>>(
    (acc, product) => {
      const category = product.category || 'Others';
      acc[category] = acc[category] || [];
      acc[category].push(product);
      return acc;
    },
    {}
  );

  const categories = Object.keys(grouped);
  let completed = 0;

  /* ---------- RENDER PRODUCTS ---------- */
  for (const category of categories) {
    if (y > 260) {
      pdf.addPage();
      y = 20;
    }

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text(category, 14, y);
    y += 8;

    for (const product of grouped[category]) {
      if (y > 260) {
        pdf.addPage();
        y = 20;
      }

      try {
        const img = await loadImage(product.image);
        pdf.addImage(img, 'JPEG', 14, y, 36, 28);
      } catch {
        pdf.rect(14, y, 36, 28); // fallback box
      }

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.text(product.name, 56, y + 6);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.text(`Quantity: ${product.qty || 1}`, 56, y + 14);

      pdf.text(
        product.description,
        56,
        y + 22,
        { maxWidth: 130 }
      );

      y += 38;

      completed++;
      const percent =
        40 + Math.floor((completed / products.length) * 50);
      onProgress?.(percent);
    }

    y += 4;
  }

  /* ---------- FINALIZE ---------- */
  onProgress?.(95);

  const blob = pdf.output('blob');

  onProgress?.(100);
  return blob;
};
