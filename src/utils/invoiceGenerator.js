import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Convert image URL to base64
const getBase64ImageFromURL = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
            const MAX = 250;
            let w = img.width;
            let h = img.height;
            if (w > MAX) { h *= MAX / w; w = MAX; }
            if (h > MAX) { w *= MAX / h; h = MAX; }
            const canvas = document.createElement('canvas');
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, w, h);
            
            // Make white background transparent
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                // If pixel is very close to white (R,G,B > 240)
                if (data[i] > 240 && data[i + 1] > 240 && data[i + 2] > 240) {
                    data[i + 3] = 0; // Alpha = 0 (Transparent)
                }
            }
            ctx.putImageData(imageData, 0, 0);
            
            const dataURL = canvas.toDataURL('image/png');
            resolve(dataURL);
        };
        img.onerror = error => reject(error);
        img.src = url;
    });
};

export const generateInvoice = async (order) => {
    const doc = new jsPDF();
    
    // Add Logo
    try {
        const logoBase64 = await getBase64ImageFromURL('https://ik.imagekit.io/gokulgorakhpur/Gokul/newlogo.jpeg');
        doc.addImage(logoBase64, 'PNG', 14, 12, 32, 32);
    } catch (e) {
        console.warn("Failed to load logo", e);
    }
    
    // Title & Header Info
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(39, 49, 138); // #27318a
    doc.text('NEHA ENTERPRISES', 52, 22);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text('GST No.: 09CJBPJ5715R1ZN', 52, 28);
    
    // Address (Cleaned up, no labels)
    doc.setFontSize(8);
    doc.setTextColor(80, 80, 80);
    doc.text('Shop No 03, Sanjay Tripathi C/o Om Prakash Tripathi', 52, 33);
    doc.text('Near Bhathat Bazar, Piprapati, Katrari Police Station', 52, 37);
    doc.text('Bhathat, Gorakhpur, Uttar Pradesh - 273306', 52, 41);
    doc.setFont('helvetica', 'bold');
    doc.text('Phone: +91 8000668955 | Email: gokulgorakhpur26@gmail.com', 52, 45);
    
    // Invoice Title right aligned
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(39, 49, 138);
    doc.text('INVOICE', 196, 22, { align: 'right' });
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(50, 50, 50);
    doc.text(`Order No: ${order.id || order.orderId || 'N/A'}`, 196, 32, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    const displayDate = order.date ? new Date(order.date).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB');
    doc.text(`Date: ${displayDate}`, 196, 38, { align: 'right' });
    
    // Draw line
    doc.setLineWidth(0.5);
    doc.setDrawColor(200, 200, 200);
    doc.line(14, 52, 196, 52);
    
    // Bill To & Ship To Background boxes
    doc.setFillColor(248, 250, 252); // slate-50
    doc.roundedRect(14, 59, 85, 35, 3, 3, 'F');
    doc.roundedRect(105, 59, 91, 35, 3, 3, 'F');

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(39, 49, 138);
    doc.text('Bill To:', 18, 66);
    doc.text('Ship To:', 109, 66);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    
    const formatAddress = (addr) => {
        if (!addr) return ['N/A'];
        const name = addr.fullName || order.customer || '';
        const phone = addr.mobile || order.mobile || '';
        const line1 = [addr.street, addr.locality].filter(Boolean).join(', ');
        const line2 = [addr.city, addr.state].filter(Boolean).join(', ') + (addr.pincode ? ` - ${addr.pincode}` : '');
        return [name, phone, line1, line2].filter(Boolean);
    };
    
    const billToLines = formatAddress(order.address);
    doc.text(billToLines, 18, 72);
    
    const shipToLines = formatAddress(order.shippingAddress || order.address);
    doc.text(shipToLines, 109, 72);
    
    // Items Table
    const tableColumn = ["Item Description", "Unit", "Quantity", "Price", "Total"];
    const tableRows = [];
    
    (order.items || []).forEach(item => {
        const itemData = [
            item.name,
            item.selectedUnit || item.unit || 'Pc',
            item.quantity,
            `Rs. ${(item.price || 0).toLocaleString('en-IN')}`,
            `Rs. ${((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}`
        ];
        tableRows.push(itemData);
    });
    
    autoTable(doc, {
        startY: 102,
        head: [tableColumn],
        body: tableRows,
        theme: 'grid',
        headStyles: { fillColor: [39, 49, 138], textColor: [255, 255, 255] },
        styles: { fontSize: 9, cellPadding: 4 },
        columnStyles: {
            3: { halign: 'right' },
            4: { halign: 'right' }
        },
        margin: { top: 10 }
    });
    
    // Totals
    const finalY = doc.lastAutoTable.finalY || 115;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    
    // Subtotal
    let currentY = finalY + 10;
    const subtotal = order.subtotal || ((order.grandTotal + (order.adminDiscount || 0)) - (order.tax || 0) - (order.shippingFee || 0));

    doc.text('Subtotal:', 140, currentY);
    doc.text(`Rs. ${subtotal.toLocaleString('en-IN')}`, 190, currentY, { align: 'right' });
    
    // Tax
    if (order.tax && order.tax > 0) {
        currentY += 7;
        doc.text('Tax (GST):', 140, currentY);
        doc.text(`Rs. ${order.tax.toLocaleString('en-IN')}`, 190, currentY, { align: 'right' });
    }
    
    // Delivery
    const shipping = order.shippingFee || 0;
    if (shipping > 0) {
        currentY += 7;
        doc.text('Delivery Fee:', 140, currentY);
        doc.text(`Rs. ${shipping.toLocaleString('en-IN')}`, 190, currentY, { align: 'right' });
    }

    // Admin Discount
    if (order.adminDiscount > 0) {
        currentY += 7;
        doc.setTextColor(22, 163, 74); // emerald-600
        doc.text('Admin Discount:', 140, currentY);
        doc.text(`- Rs. ${order.adminDiscount.toLocaleString('en-IN')}`, 190, currentY, { align: 'right' });
        doc.setTextColor(0, 0, 0); // Reset color
    }
    
    // Grand Total
    currentY += 10;
    doc.setFontSize(12);
    doc.setTextColor(39, 49, 138);
    doc.text('Grand Total:', 140, currentY);
    doc.text(`Rs. ${(order.grandTotal || order.amount || 0).toLocaleString('en-IN')}`, 190, currentY, { align: 'right' });
    
    // Footer
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(150, 150, 150);
    doc.text('Thank you for shopping with Neha Enterprises!', 105, 280, null, null, 'center');
    
    doc.save(`Invoice_${order.id || order.orderId || 'Download'}.pdf`);
};
