/**
 * ForgeAdmin — Firestore Seed Data
 * Run this ONCE to populate your Firestore database with demo data.
 * Navigate to /pages/seed.html and click "Seed Database".
 */

import { db, auth } from './firebase-config.js';
import {
  collection, addDoc, serverTimestamp, Timestamp, setDoc, doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export async function seedDatabase(onProgress) {
  const log = (msg) => { console.log(msg); onProgress?.(msg); };

  // ── Categories ───────────────────────────────────────────
  log('Creating categories...');
  const cats = {};
  const categoryData = [
    { name: 'Electronics',  description: 'Laptops, smartphones, and high-tech gadgets.', icon: 'fa-laptop',    status: 'active',   sortOrder: 0 },
    { name: 'Audio',        description: 'Headphones, earbuds, and speakers.',           icon: 'fa-headphones', status: 'active',   sortOrder: 1 },
    { name: 'Accessories',  description: 'Keyboards, mice, and peripherals.',            icon: 'fa-keyboard',  status: 'active',   sortOrder: 2 },
    { name: 'Apparel',      description: 'Modern clothing, footwear, accessories.',      icon: 'fa-shirt',     status: 'active',   sortOrder: 3 },
    { name: 'Home & Living',description: 'Furniture, decor, and household essentials.',  icon: 'fa-couch',     status: 'hidden',   sortOrder: 4 },
  ];
  for (const cat of categoryData) {
    const ref = await addDoc(collection(db, 'categories'), { ...cat, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
    cats[cat.name] = ref.id;
  }
  log('✅ Categories created');

  // ── Products ─────────────────────────────────────────────
  log('Creating products...');
  const prods = {};
  const productData = [
    { name: 'ForgeBook Pro 15"',         sku: 'FB-P-2025',  price: 1499, stock: 45,  status: 'active',      icon: 'fa-laptop',         categoryId: cats['Electronics'],  categoryName: 'Electronics'  },
    { name: 'ForgeWatch Series 7',       sku: 'FB-W-9912',  price: 399,  stock: 124, status: 'active',      icon: 'fa-clock',          categoryId: cats['Electronics'],  categoryName: 'Electronics'  },
    { name: 'Noise Cancelling Pods',     sku: 'NC-P-022',   price: 249,  stock: 120, status: 'active',      icon: 'fa-headphones',     categoryId: cats['Audio'],        categoryName: 'Audio'        },
    { name: 'Mechanical Keyboard G Pro', sku: 'FB-K-0021',  price: 159,  stock: 8,   status: 'active',      icon: 'fa-keyboard',       categoryId: cats['Accessories'],  categoryName: 'Accessories'  },
    { name: 'Mechanical Keyboard',       sku: 'MK-BL-01',   price: 129,  stock: 0,   status: 'out_of_stock',icon: 'fa-keyboard',       categoryId: cats['Accessories'],  categoryName: 'Accessories'  },
    { name: 'Ergonomic Mouse Pad',       sku: 'FB-M-4452',  price: 29,   stock: 0,   status: 'out_of_stock',icon: 'fa-computer-mouse', categoryId: cats['Accessories'],  categoryName: 'Accessories'  },
  ];
  for (const prod of productData) {
    const ref = await addDoc(collection(db, 'products'), {
      ...prod, description: `Premium ${prod.name} for professionals and enthusiasts.`,
      createdAt: serverTimestamp(), updatedAt: serverTimestamp()
    });
    prods[prod.name] = ref.id;
  }
  log('✅ Products created');

  // ── Customers ─────────────────────────────────────────────
  log('Creating customers...');
  const custs = {};
  const customerData = [
    { name: 'Sarah Jenkins',  email: 'sarah@example.com',     phone: '(555) 123-4567', location: 'Detroit, MI',   totalSpent: 3240.50, orderCount: 12 },
    { name: 'Marcus Wright',  email: 'm.wright@example.com',  phone: '(555) 987-6543', location: 'Austin, TX',    totalSpent: 1890.20, orderCount: 7  },
    { name: 'Elena Gomez',    email: 'elena.g@example.com',   phone: '(555) 456-7890', location: 'Miami, FL',     totalSpent: 4105.75, orderCount: 18 },
    { name: 'James Carter',   email: 'j.carter@example.com',  phone: '(555) 321-6789', location: 'Chicago, IL',   totalSpent: 756.00,  orderCount: 3  },
    { name: 'Priya Sharma',   email: 'priya.s@example.com',   phone: '(555) 654-3210', location: 'New York, NY',  totalSpent: 2290.40, orderCount: 9  },
    { name: 'Robert Brown',   email: 'robert.b@example.com',  phone: '(555) 789-0123', location: 'Seattle, WA',   totalSpent: 1120.80, orderCount: 5  },
  ];
  for (const cust of customerData) {
    const ref = await addDoc(collection(db, 'customers'), {
      ...cust, isActive: true, createdAt: serverTimestamp(), updatedAt: serverTimestamp()
    });
    custs[cust.name] = ref.id;
  }
  log('✅ Customers created');

  // ── Orders ───────────────────────────────────────────────
  log('Creating orders...');
  const thirtyDaysAgo = new Date(); thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const tenDaysAgo    = new Date(); tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
  const fiveDaysAgo   = new Date(); fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

  const orderData = [
    {
      orderNumber: '#ORD-9932', customerName: 'Sarah Jenkins', customerEmail: 'sarah@example.com',
      customerId: custs['Sarah Jenkins'], status: 'shipped', orderedAt: Timestamp.fromDate(thirtyDaysAgo),
      subtotal: 1499, discount: 0, total: 1499,
      items: [{ productId: prods['ForgeBook Pro 15"'], name: 'ForgeBook Pro 15"', quantity: 1, unitPrice: 1499, totalPrice: 1499, categoryName: 'Electronics' }]
    },
    {
      orderNumber: '#ORD-9931', customerName: 'Marcus Wright', customerEmail: 'm.wright@example.com',
      customerId: custs['Marcus Wright'], status: 'processing', orderedAt: Timestamp.fromDate(tenDaysAgo),
      subtotal: 498, discount: 0, total: 498,
      items: [{ productId: prods['Noise Cancelling Pods'], name: 'Noise Cancelling Pods', quantity: 2, unitPrice: 249, totalPrice: 498, categoryName: 'Audio' }]
    },
    {
      orderNumber: '#ORD-9930', customerName: 'Elena Gomez', customerEmail: 'elena.g@example.com',
      customerId: custs['Elena Gomez'], status: 'completed', orderedAt: Timestamp.fromDate(fiveDaysAgo),
      subtotal: 158, discount: 10, total: 148,
      items: [{ productId: prods['Mechanical Keyboard G Pro'], name: 'Mechanical Keyboard G Pro', quantity: 1, unitPrice: 159, totalPrice: 159, categoryName: 'Accessories' }]
    },
    {
      orderNumber: '#ORD-9929', customerName: 'James Carter', customerEmail: 'j.carter@example.com',
      customerId: custs['James Carter'], status: 'pending', orderedAt: Timestamp.fromDate(new Date()),
      subtotal: 399, discount: 0, total: 399,
      items: [{ productId: prods['ForgeWatch Series 7'], name: 'ForgeWatch Series 7', quantity: 1, unitPrice: 399, totalPrice: 399, categoryName: 'Electronics' }]
    },
  ];
  for (const order of orderData) {
    await addDoc(collection(db, 'orders'), { ...order, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  }
  log('✅ Orders created');

  // ── Reviews ──────────────────────────────────────────────
  log('Creating reviews...');
  const reviewData = [
    {
      customerName: 'Sarah Jenkins', customerId: custs['Sarah Jenkins'],
      productName: 'ForgeBook Pro 15"', productId: prods['ForgeBook Pro 15"'],
      rating: 5, content: 'This laptop is absolutely incredible. The screen is gorgeous and it handles all my development tasks with ease. Highly recommend!',
      moderationStatus: 'pending', createdAt: serverTimestamp(), updatedAt: serverTimestamp()
    },
    {
      customerName: 'Robert Brown', customerId: custs['Robert Brown'],
      productName: 'Noise Cancelling Pods', productId: prods['Noise Cancelling Pods'],
      rating: 3, content: 'The sound quality is great but they keep slipping out of my ears while running. Shipping was fast though.',
      moderationStatus: 'rejected', createdAt: serverTimestamp(), updatedAt: serverTimestamp()
    },
    {
      customerName: 'Elena Gomez', customerId: custs['Elena Gomez'],
      productName: 'Mechanical Keyboard G Pro', productId: prods['Mechanical Keyboard G Pro'],
      rating: 4, content: 'Excellent typing experience. The tactile feedback is perfect for long coding sessions. Only wish it had RGB.',
      moderationStatus: 'approved', createdAt: serverTimestamp(), updatedAt: serverTimestamp()
    },
  ];
  for (const review of reviewData) {
    await addDoc(collection(db, 'reviews'), review);
  }
  log('✅ Reviews created');

  // ── Promotions ───────────────────────────────────────────
  log('Creating promotions...');
  const promotionData = [
    { code: 'FORGE25',   discountType: 'percentage', discountValue: 25, expiryDate: '2025-12-31', maxUsage: 500,  currentUsage: 142, status: 'active' },
    { code: 'WELCOME10', discountType: 'flat',        discountValue: 10, expiryDate: null,         maxUsage: null, currentUsage: 2105, status: 'active' },
    { code: 'SUMMER50',  discountType: 'percentage', discountValue: 50, expiryDate: '2025-08-31', maxUsage: 100,  currentUsage: 88, status: 'inactive' },
  ];
  for (const promo of promotionData) {
    await addDoc(collection(db, 'promotions'), { ...promo, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  }
  log('✅ Promotions created');

  // ── Staff ────────────────────────────────────────────────
  log('Creating staff...');
  const staffData = [
    { name: 'John Doe',    email: 'admin@forgecart.com',  role: 'super_admin', onlineStatus: 'online'  },
    { name: 'Alice Smith', email: 'alice@forgecart.com',  role: 'editor',      onlineStatus: 'offline' },
    { name: 'Tom Lee',     email: 'tom@forgecart.com',    role: 'admin',       onlineStatus: 'offline' },
  ];
  for (const member of staffData) {
    await addDoc(collection(db, 'staff'), { ...member, joinedAt: serverTimestamp(), createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  }
  log('✅ Staff created');

  log('🎉 Database seeded successfully! You can now use ForgeAdmin with real data.');
}
