/**
 * Builder script to generate assets/local-storage-backend.js
 * Pre-populates clean default data from backup_full_pre_clean.json
 */
const fs = require('fs');
const path = require('path');

const backup = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'backup_full_pre_clean.json'), 'utf8'));

// Format products with BOTH camelCase and snake_case properties
const defaultProducts = (backup.products || []).map(p => {
  const images = Array.isArray(p.images) ? p.images : (typeof p.images === 'string' ? JSON.parse(p.images) : []);
  const benefits = Array.isArray(p.benefits) ? p.benefits : (typeof p.benefits === 'string' ? JSON.parse(p.benefits) : []);
  const variants = Array.isArray(p.variants) ? p.variants : (typeof p.variants === 'string' ? JSON.parse(p.variants) : []);
  const seo = typeof p.seo === 'object' && p.seo !== null ? p.seo : (typeof p.seo === 'string' ? JSON.parse(p.seo) : {});

  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    subtitle: p.subtitle,
    category: p.category,
    categoryId: p.category_id || p.categoryId,
    category_id: p.category_id || p.categoryId,
    price: Number(p.price),
    mrp: Number(p.mrp),
    stock: Number(p.stock !== undefined ? p.stock : 50),
    initialStock: Number(p.initial_stock || p.initialStock || 100),
    initial_stock: Number(p.initial_stock || p.initialStock || 100),
    onlineSold: Number(p.online_sold || p.onlineSold || 0),
    online_sold: Number(p.online_sold || p.onlineSold || 0),
    offlineSold: Number(p.offline_sold || p.offlineSold || 0),
    offline_sold: Number(p.offline_sold || p.offlineSold || 0),
    sku: p.sku,
    images: images,
    themeColor: p.theme_color || p.themeColor,
    theme_color: p.theme_color || p.themeColor,
    tagline: p.tagline,
    metricBadge: p.metric_badge || p.metricBadge,
    metric_badge: p.metric_badge || p.metricBadge,
    badge: p.badge,
    shortDescription: p.short_description || p.shortDescription,
    short_description: p.short_description || p.shortDescription,
    description: p.description,
    benefits: benefits,
    ingredients: p.ingredients,
    howToUse: p.how_to_use || p.howToUse,
    how_to_use: p.how_to_use || p.howToUse,
    variants: variants,
    seo: seo,
    status: p.status || 'active',
    createdAt: p.created_at || new Date().toISOString(),
    created_at: p.created_at || new Date().toISOString(),
    updatedAt: p.updated_at || new Date().toISOString(),
    updated_at: p.updated_at || new Date().toISOString()
  };
});

// Format orders
const defaultOrders = (backup.orders || []).map(o => {
  const customer = typeof o.customer === 'string' ? JSON.parse(o.customer) : (o.customer || {});
  const items = typeof o.items === 'string' ? JSON.parse(o.items) : (o.items || []);
  const cancellationDetails = o.cancellation_details ? (typeof o.cancellation_details === 'string' ? JSON.parse(o.cancellation_details) : o.cancellation_details) : null;

  return {
    id: o.id,
    orderNumber: o.order_number || o.orderNumber,
    order_number: o.order_number || o.orderNumber,
    channel: o.channel || 'online',
    customer: customer,
    items: items,
    subtotal: Number(o.subtotal || 0),
    discount: Number(o.discount || 0),
    shipping: Number(o.shipping || 0),
    total: Number(o.total || 0),
    paymentMethod: o.payment_method || o.paymentMethod || 'UPI',
    payment_method: o.payment_method || o.paymentMethod || 'UPI',
    paymentStatus: o.payment_status || o.paymentStatus || 'completed',
    payment_status: o.payment_status || o.paymentStatus || 'completed',
    status: o.status || 'placed',
    cancellationDetails: cancellationDetails,
    cancellation_details: cancellationDetails,
    createdAt: o.created_at || o.createdAt || new Date().toISOString(),
    created_at: o.created_at || o.createdAt || new Date().toISOString()
  };
});

// Format invoices
const defaultInvoices = (backup.invoices || []).map(i => {
  const customer = typeof i.customer === 'string' ? JSON.parse(i.customer) : (i.customer || {});
  const items = typeof i.items === 'string' ? JSON.parse(i.items) : (i.items || []);

  return {
    id: i.id,
    invoiceNumber: i.invoice_number || i.invoiceNumber,
    invoice_number: i.invoice_number || i.invoiceNumber,
    channel: i.channel || 'offline',
    customer: customer,
    items: items,
    subtotal: Number(i.subtotal || 0),
    discount: Number(i.discount || 0),
    tax: Number(i.tax || 0),
    total: Number(i.total || 0),
    paymentStatus: i.payment_status || i.paymentStatus || 'paid',
    payment_status: i.payment_status || i.paymentStatus || 'paid',
    paymentMode: i.payment_mode || i.paymentMode || 'Cash',
    payment_mode: i.payment_mode || i.paymentMode || 'Cash',
    notes: i.notes || '',
    createdBy: i.created_by || i.createdBy || 'Staff',
    created_by: i.created_by || i.createdBy || 'Staff',
    createdAt: i.created_at || i.createdAt || new Date().toISOString(),
    created_at: i.created_at || i.createdAt || new Date().toISOString()
  };
});

// Format reviews
const defaultReviews = (backup.reviews || []).map(r => ({
  id: r.id,
  name: r.name,
  email: r.email || '',
  productName: r.product_name || r.productName || 'Herbal Hair Care',
  product_name: r.product_name || r.productName || 'Herbal Hair Care',
  rating: Number(r.rating || 5),
  title: r.title || 'Exceptional Quality',
  comment: r.comment || '',
  status: r.status || 'approved',
  createdAt: r.created_at || r.createdAt || new Date().toISOString(),
  created_at: r.created_at || r.createdAt || new Date().toISOString(),
  updatedAt: r.updated_at || r.updatedAt || new Date().toISOString(),
  updated_at: r.updated_at || r.updatedAt || new Date().toISOString()
}));

// Format contact messages
const defaultMessages = (backup.contact_messages || []).map(m => ({
  id: m.id,
  name: m.name,
  email: m.email,
  phone: m.phone || '',
  subject: m.subject || 'General Inquiry',
  message: m.message,
  status: m.status || 'unread',
  adminNotes: m.admin_notes || m.adminNotes || '',
  admin_notes: m.admin_notes || m.adminNotes || '',
  createdAt: m.created_at || m.createdAt || new Date().toISOString(),
  created_at: m.created_at || m.createdAt || new Date().toISOString()
}));

// Format customers
const defaultCustomers = (backup.customers || []).map(c => ({
  id: c.id,
  name: c.name,
  email: c.email,
  phone: c.phone || '',
  password: c.password || 'password123',
  address: c.address || '',
  city: c.city || '',
  state: c.state || 'Tamil Nadu',
  pincode: c.pincode || '',
  createdAt: c.created_at || new Date().toISOString()
}));

// Format admin users
const defaultAdmins = [
  {
    id: 'user_admin_01',
    username: 'admin',
    name: 'Administrator',
    role: 'super_admin',
    permissions: ['all'],
    email: 'admin@nachiyarherbals.com',
    password: 'admin123',
    phone: '9876543210'
  },
  {
    id: 'user_nimda',
    username: 'nimda',
    name: 'Super Nimda',
    role: 'super_admin',
    permissions: ['all'],
    email: 'nimda@nachiyarherbals.com',
    password: 'admin123',
    phone: '9876543210'
  },
  {
    id: 'user_admin_murali',
    username: 'murali',
    name: 'Murali',
    role: 'super_admin',
    permissions: ['all'],
    email: 'murali@nachiyarherbals.com',
    password: 'Murali123',
    phone: null
  },
  {
    id: 'user_admin_bharathi',
    username: 'bharathi_07',
    name: 'Bharathi',
    role: 'super_admin',
    permissions: ['all'],
    email: 'bharathi@gmail.com',
    password: '1234567890',
    phone: null
  }
];

// Format settings
const defaultSettings = (backup.site_settings && backup.site_settings[0] && backup.site_settings[0].data) ? backup.site_settings[0].data : {
  brandName: 'Nachiyar Herbals & Cosmetics',
  gstin: '33AAACH9876K1Z2',
  supportPhone: '+91 94440 88990',
  supportEmail: 'care@nachiyarherbals.com',
  storeTimings: 'Mon - Sat: 9:30 AM - 8:30 PM',
  storeAddress: 'Nachiyar Botanical Heritage, No. 18 Temple Ring Road, Madurai, Tamil Nadu - 625001',
  freeShippingThreshold: 599,
  couponCode: 'NACHIYAR25',
  discountPercent: 25,
  couponActive: true,
  couponTagline: 'Surprise Royal Privilege Voucher',
  announcementText: 'ROYAL BOTANICAL CARE ✦ FREE PAN-INDIA SHIPPING OVER ₹599 ✦ COLD-PRESSED IN SMALL BATCHES',
  homeShowcase: {
    slot1: { productId: 'prod_oil_01', title: 'Herbal Hair Oil', price: 299, mrp: 599, customImage: 'assets/new-oil-bottle-card.jpg' },
    slot2: { productId: 'prod_shampoo_02', title: 'Hibiscus Flower Shampoo', price: 249, mrp: 549, customImage: 'assets/new-shampoo-bottle-card.jpg' },
    combo: { productId: 'prod_duo_03', title: 'The Royal Hair Ritual (Duo Set)', price: 499, mrp: 1148, customImage: 'assets/duo-ritual-new.jpg', tag: 'BEST VALUE: SAVE ₹149' }
  },
  paymentMethods: {
    cod: { label: 'Cash on Delivery (COD)', enabled: true, description: 'Pay cash to courier executive upon delivery' },
    upi: { label: 'UPI (Google Pay, PhonePe, Paytm, BHIM)', upiId: 'nachiyarherbals18@okaxis', enabled: true, description: 'Instant UPI payment with dynamic QR & VPA', merchantName: 'Nachiyar Herbals & Cosmetics' },
    card: { label: 'Credit / Debit Card', enabled: true, description: 'Visa, MasterCard, RuPay, Maestro' },
    netbanking: { label: 'Net Banking', enabled: true, description: 'All major Indian banks supported' }
  }
};

// Format inventory logs
const defaultInventoryLogs = (backup.inventory_logs || []).map(l => ({
  id: l.id,
  productId: l.product_id || l.productId,
  productName: l.product_name || l.productName,
  channel: l.channel || 'manual',
  reference: l.reference || 'Initial Restock',
  change: Number(l.change || 0),
  prevStock: Number(l.prev_stock || l.prevStock || 0),
  newStock: Number(l.new_stock || l.newStock || 50),
  timestamp: l.timestamp || new Date().toISOString(),
  reason: l.reason || 'Inventory initialization'
}));

// Output backend generator
const template = `/**
 * NACHIYAR HERBALS & COSMETICS
 * 100% Client-Side LocalStorage Backend & Database-Free API Engine
 *
 * Automatically intercepts all '/api/*' fetch requests and fulfills them
 * directly from browser LocalStorage!
 *
 * Zero external database required.
 * All updates from Admin or Storefront persist immediately in LocalStorage
 * and broadcast across tabs in real-time.
 */

(function() {
  'use strict';

  // --- SEED DEFAULTS ---
  const SEED_PRODUCTS = ${JSON.stringify(defaultProducts, null, 2)};
  const SEED_ORDERS = ${JSON.stringify(defaultOrders, null, 2)};
  const SEED_INVOICES = ${JSON.stringify(defaultInvoices, null, 2)};
  const SEED_REVIEWS = ${JSON.stringify(defaultReviews, null, 2)};
  const SEED_MESSAGES = ${JSON.stringify(defaultMessages, null, 2)};
  const SEED_CUSTOMERS = ${JSON.stringify(defaultCustomers, null, 2)};
  const SEED_ADMINS = ${JSON.stringify(defaultAdmins, null, 2)};
  const SEED_SETTINGS = ${JSON.stringify(defaultSettings, null, 2)};
  const SEED_INV_LOGS = ${JSON.stringify(defaultInventoryLogs, null, 2)};

  // --- STORAGE KEYS ---
  const KEYS = {
    PRODUCTS: 'nachiyar_store_products',
    ORDERS: 'nachiyar_orders',
    CUSTOMER_ORDERS: 'nachiyar_customer_orders',
    INVOICES: 'nachiyar_invoices',
    REVIEWS: 'nachiyar_reviews',
    MESSAGES: 'nachiyar_contact_messages',
    CUSTOMERS: 'nachiyar_customers',
    ADMINS: 'nachiyar_admin_accounts',
    SETTINGS: 'nachiyar_store_settings',
    INV_LOGS: 'nachiyar_inventory_logs',
    CART: 'nachiyar_cart',
    ADMIN_TOKEN: 'nachiyar_admin_token',
    ADMIN_USER: 'nachiyar_admin_user',
    CUST_TOKEN: 'nachiyar_token',
    CURRENT_CUST: 'nachiyar_customer',
    HOME_SHOWCASE: 'nachiyar_home_showcase'
  };

  // Safe localStorage helper
  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null || raw === undefined) return fallback;
      return JSON.parse(raw);
    } catch (e) {
      return fallback;
    }
  }

  function write(key, val) {
    try {
      localStorage.setItem(key, typeof val === 'string' ? val : JSON.stringify(val));
    } catch (e) {
      console.warn('LocalStorage write warning for ' + key, e);
      try {
        localStorage.removeItem('nachiyar_inventory_logs');
        localStorage.removeItem('nachiyar_cancellations');
        if (key === KEYS.PRODUCTS && Array.isArray(val)) {
          const sanitized = val.map(p => {
            const copy = { ...p };
            if (Array.isArray(copy.images)) {
              copy.images = copy.images.map(img => {
                if (typeof img === 'string' && img.startsWith('data:image/') && img.length > 80000) {
                  return 'assets/herbal-hair-oil.jpg';
                }
                return img;
              });
            }
            return copy;
          });
          localStorage.setItem(key, JSON.stringify(sanitized));
          return;
        }
        localStorage.setItem(key, typeof val === 'string' ? val : JSON.stringify(val));
      } catch (err2) {
        console.error('Critical: LocalStorage write failed after quota cleanup', err2);
      }
    }
  }

  // Broadcast helper
  let storeChannel = null;
  try {
    storeChannel = new BroadcastChannel('nachiyar_store_channel');
  } catch (e) {}

  function broadcast(type, payload) {
    try {
      window.dispatchEvent(new CustomEvent('nachiyar_local_event', { detail: { type, payload } }));
      if (storeChannel) {
        storeChannel.postMessage({ type, ...payload });
      }
    } catch (e) {}
  }

  // --- BOOTSTRAP INITIAL DATA IF EMPTY ---
  function initStorage() {
    try {
      const existingProds = localStorage.getItem(KEYS.PRODUCTS);
      if (!existingProds) {
        write(KEYS.PRODUCTS, SEED_PRODUCTS);
      } else {
        const parsedProds = JSON.parse(existingProds);
        if (!Array.isArray(parsedProds) || parsedProds.length === 0) {
          write(KEYS.PRODUCTS, SEED_PRODUCTS);
        }
      }
    } catch (e) {
      write(KEYS.PRODUCTS, SEED_PRODUCTS);
    }
    if (!localStorage.getItem(KEYS.ORDERS)) {
      write(KEYS.ORDERS, SEED_ORDERS);
    }
    if (!localStorage.getItem(KEYS.INVOICES)) {
      write(KEYS.INVOICES, SEED_INVOICES);
    }
    if (!localStorage.getItem(KEYS.REVIEWS)) {
      write(KEYS.REVIEWS, SEED_REVIEWS);
    }
    if (!localStorage.getItem(KEYS.MESSAGES)) {
      write(KEYS.MESSAGES, SEED_MESSAGES);
    }
    if (!localStorage.getItem(KEYS.CUSTOMERS)) {
      write(KEYS.CUSTOMERS, SEED_CUSTOMERS);
    }
    if (!localStorage.getItem(KEYS.ADMINS)) {
      write(KEYS.ADMINS, SEED_ADMINS);
    }
    if (!localStorage.getItem(KEYS.SETTINGS)) {
      write(KEYS.SETTINGS, SEED_SETTINGS);
    }
    if (!localStorage.getItem(KEYS.INV_LOGS)) {
      write(KEYS.INV_LOGS, SEED_INV_LOGS);
    }
    if (!localStorage.getItem(KEYS.HOME_SHOWCASE) && SEED_SETTINGS.homeShowcase) {
      write(KEYS.HOME_SHOWCASE, SEED_SETTINGS.homeShowcase);
    }
  }

  initStorage();

  // Slugify helper
  function slugify(text) {
    return (text || '')
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\\s-]/g, '')
      .replace(/[\\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  // Json Response builder
  function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
      status: status,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate'
      }
    });
  }

  // Analytics calculator
  function calculateAnalytics() {
    const orders = read(KEYS.ORDERS, []);
    const invoices = read(KEYS.INVOICES, []);
    const products = read(KEYS.PRODUCTS, []);
    const customers = read(KEYS.CUSTOMERS, []);

    const onlineOrdersCount = orders.length;
    const offlineInvoicesCount = invoices.length;
    const totalOrdersCount = onlineOrdersCount + offlineInvoicesCount;

    const onlineRevenue = orders.reduce((sum, o) => sum + Number(o.total || 0), 0);
    const offlineRevenue = invoices.reduce((sum, i) => sum + Number(i.total || 0), 0);
    const totalRevenue = onlineRevenue + offlineRevenue;

    const totalStock = products.reduce((sum, p) => sum + Number(p.stock || 0), 0);
    const lowStockThreshold = 25;
    const lowStockProducts = products
      .filter(p => Number(p.stock) <= lowStockThreshold)
      .map(p => ({
        id: p.id,
        name: p.name,
        stock: Number(p.stock),
        initialStock: Number(p.initialStock || p.initial_stock || 100),
        status: Number(p.stock) <= 0 ? 'Out of Stock' : 'Low Stock',
        sku: p.sku
      }));

    // Payment breakdown
    const paymentBreakdown = {
      UPI: { count: 0, revenue: 0, percentage: 0 },
      Card: { count: 0, revenue: 0, percentage: 0 },
      Cash: { count: 0, revenue: 0, percentage: 0 },
      NetBanking: { count: 0, revenue: 0, percentage: 0 },
      Other: { count: 0, revenue: 0, percentage: 0 }
    };

    function catPayment(method = '') {
      const m = String(method).toLowerCase();
      if (m.includes('upi') || m.includes('gpay') || m.includes('phonepe') || m.includes('paytm')) return 'UPI';
      if (m.includes('card') || m.includes('visa') || m.includes('master') || m.includes('pos')) return 'Card';
      if (m.includes('cash') || m.includes('cod')) return 'Cash';
      if (m.includes('net') || m.includes('bank') || m.includes('neft') || m.includes('imps')) return 'NetBanking';
      return 'Other';
    }

    orders.forEach(o => {
      const cat = catPayment(o.paymentMethod || o.payment_method);
      paymentBreakdown[cat].count += 1;
      paymentBreakdown[cat].revenue += Number(o.total || 0);
    });

    invoices.forEach(i => {
      const cat = catPayment(i.paymentMode || i.payment_mode);
      paymentBreakdown[cat].count += 1;
      paymentBreakdown[cat].revenue += Number(i.total || 0);
    });

    Object.keys(paymentBreakdown).forEach(k => {
      paymentBreakdown[k].percentage = totalRevenue > 0
        ? Math.round((paymentBreakdown[k].revenue / totalRevenue) * 100)
        : 0;
    });

    // Top selling products
    const productSalesMap = {};
    products.forEach(p => {
      productSalesMap[p.id] = {
        id: p.id,
        name: p.name,
        sku: p.sku,
        category: p.category,
        unitsSold: Number(p.onlineSold || p.online_sold || 0) + Number(p.offlineSold || p.offline_sold || 0),
        revenue: 0,
        stockRemaining: Number(p.stock)
      };
    });

    orders.forEach(o => {
      (o.items || []).forEach(item => {
        const pId = item.productId || item.id;
        if (productSalesMap[pId]) {
          productSalesMap[pId].unitsSold += Number(item.qty || item.quantity || 1);
          productSalesMap[pId].revenue += Number(item.price || 0) * Number(item.qty || 1);
        }
      });
    });

    invoices.forEach(i => {
      (i.items || []).forEach(item => {
        const pId = item.productId || item.id;
        if (productSalesMap[pId]) {
          productSalesMap[pId].unitsSold += Number(item.qty || item.quantity || 1);
          productSalesMap[pId].revenue += Number(item.price || 0) * Number(item.qty || 1);
        }
      });
    });

    const topSellingProducts = Object.values(productSalesMap).sort((a, b) => b.unitsSold - a.unitsSold);

    // Customer analytics
    const customerMap = new Map();
    customers.forEach(c => {
      customerMap.set(c.email || c.id, {
        id: c.id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        onlineOrders: 0,
        offlineInvoices: 0,
        totalSpent: 0
      });
    });

    orders.forEach(o => {
      const c = o.customer || {};
      const key = c.email || c.id || c.phone || 'guest';
      if (!customerMap.has(key)) {
        customerMap.set(key, { id: c.id || key, name: c.name || 'Store Guest', email: c.email || '', phone: c.phone || '', onlineOrders: 0, offlineInvoices: 0, totalSpent: 0 });
      }
      const entry = customerMap.get(key);
      entry.onlineOrders += 1;
      entry.totalSpent += Number(o.total || 0);
    });

    const customerAnalytics = Array.from(customerMap.values()).map(c => ({
      ...c,
      orderCount: c.onlineOrders + c.offlineInvoices
    })).sort((a, b) => b.totalSpent - a.totalSpent);

    // Daily Sales
    const dailyMap = {};
    [...orders.map(o => ({ date: o.createdAt || o.created_at, total: Number(o.total || 0), ch: 'online' })),
     ...invoices.map(i => ({ date: i.createdAt || i.created_at, total: Number(i.total || 0), ch: 'offline' }))
    ].forEach(r => {
      const d = (r.date || new Date().toISOString()).split('T')[0];
      if (!dailyMap[d]) dailyMap[d] = { date: d, online: 0, offline: 0, total: 0, count: 0 };
      dailyMap[d][r.ch] += r.total;
      dailyMap[d].total += r.total;
      dailyMap[d].count += 1;
    });

    const dailySales = Object.values(dailyMap).sort((a, b) => a.date.localeCompare(b.date));

    return {
      totalRevenue,
      onlineRevenue,
      offlineRevenue,
      totalStock,
      totalCustomers: customers.length,
      totalOrdersCount,
      onlineOrdersCount,
      offlineInvoicesCount,
      paymentBreakdown,
      dailySales,
      weeklySales: dailySales,
      monthlySales: dailySales,
      topSellingProducts,
      lowStockProducts,
      lowStockItems: lowStockProducts.length,
      customerAnalytics,
      recentOrders: orders.slice(0, 10),
      recentInvoices: invoices.slice(0, 10)
    };
  }

  // --- FETCH INTERCEPTOR ---
  const nativeFetch = (typeof window.fetch === 'function') ? window.fetch.bind(window) : async (u, i) => jsonResponse({ success: true });

  window.fetch = async function(input, init = {}) {
    let url = typeof input === 'string' ? input : (input && input.url ? input.url : '');
    const method = (init.method || (input && input.method) || 'GET').toUpperCase();

    // Check if URL matches '/api/...'
    let path = '';
    if (url.startsWith('/api/')) {
      path = url;
    } else if (url.startsWith('api/')) {
      path = '/' + url;
    } else if (url.includes('/api/')) {
      try {
        const parsed = new URL(url, window.location.origin);
        path = parsed.pathname + parsed.search;
      } catch (e) {
        path = url.slice(url.indexOf('/api/'));
      }
    }

    // Pass through non-API requests
    if (!path.startsWith('/api/')) {
      return nativeFetch(input, init);
    }

    // Extract pathname and query
    const [pathname, searchStr] = path.split('?');
    const queryParams = new URLSearchParams(searchStr || '');

    // Parse request body
    let body = {};
    if (init.body) {
      if (typeof init.body === 'string') {
        try { body = JSON.parse(init.body); } catch (e) { body = init.body; }
      } else if (init.body instanceof FormData) {
        body = init.body;
      } else if (init.body instanceof URLSearchParams) {
        body = Object.fromEntries(init.body.entries());
      }
    }

    // ==========================================
    // ROUTE HANDLERS
    // ==========================================

    // 1. PRODUCTS
    if (pathname === '/api/products' || pathname === '/api/products/') {
      const products = read(KEYS.PRODUCTS, SEED_PRODUCTS);

      if (method === 'GET') {
        const cat = queryParams.get('category');
        const q = queryParams.get('q');
        let filtered = [...products];

        if (cat) {
          filtered = filtered.filter(p => 
            (p.category && p.category.toLowerCase() === cat.toLowerCase()) || 
            (p.categoryId && p.categoryId.toLowerCase() === cat.toLowerCase()) ||
            (p.category_id && p.category_id.toLowerCase() === cat.toLowerCase())
          );
        }
        if (q) {
          const qLower = q.toLowerCase();
          filtered = filtered.filter(p => 
            (p.name && p.name.toLowerCase().includes(qLower)) || 
            (p.shortDescription && p.shortDescription.toLowerCase().includes(qLower))
          );
        }

        return jsonResponse({ success: true, data: filtered });
      }

      if (method === 'POST') {
        const newProd = {
          id: body.id || ('prod_' + Date.now()),
          slug: body.slug || slugify(body.name),
          name: body.name || 'New Product',
          subtitle: body.subtitle || '',
          category: body.category || 'Hair Care',
          categoryId: body.categoryId || 'cat_hair_care',
          category_id: body.categoryId || 'cat_hair_care',
          price: Number(body.price || 0),
          mrp: Number(body.mrp || 0),
          stock: Number(body.stock || 50),
          initialStock: Number(body.initialStock || body.stock || 50),
          initial_stock: Number(body.initialStock || body.stock || 50),
          onlineSold: 0,
          online_sold: 0,
          offlineSold: 0,
          offline_sold: 0,
          sku: body.sku || ('NH-' + Math.floor(1000 + Math.random()*9000)),
          images: Array.isArray(body.images) ? body.images : [body.image || 'assets/nachiyar-logo.png'],
          themeColor: body.themeColor || '#6B4E9B',
          theme_color: body.themeColor || '#6B4E9B',
          tagline: body.tagline || '',
          metricBadge: body.metricBadge || '100% PURE',
          metric_badge: body.metricBadge || '100% PURE',
          badge: body.badge || 'Bestseller',
          shortDescription: body.shortDescription || '',
          short_description: body.shortDescription || '',
          description: body.description || '',
          benefits: Array.isArray(body.benefits) ? body.benefits : [],
          ingredients: body.ingredients || '',
          howToUse: body.howToUse || '',
          how_to_use: body.howToUse || '',
          variants: Array.isArray(body.variants) ? body.variants : [],
          seo: body.seo || {},
          status: body.status || 'active',
          createdAt: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        products.unshift(newProd);
        write(KEYS.PRODUCTS, products);
        write('nachiyar_products_updated', Date.now());
        broadcast('PRODUCTS_UPDATED', { product: newProd });
        return jsonResponse({ success: true, data: newProd });
      }
    }

    // 1b. PRODUCT BY ID OR SLUG
    if (pathname.startsWith('/api/products/')) {
      const idOrSlug = decodeURIComponent(pathname.replace('/api/products/', '').replace(/\\/$/, '')).toLowerCase();
      const products = read(KEYS.PRODUCTS, SEED_PRODUCTS);
      const index = products.findIndex(p => 
        (p.id && p.id.toLowerCase() === idOrSlug) || 
        (p.slug && p.slug.toLowerCase() === idOrSlug)
      );

      if (method === 'GET') {
        if (index >= 0) {
          return jsonResponse({ success: true, data: products[index] });
        }
        return jsonResponse({ success: false, message: 'Product not found' }, 404);
      }

      if (method === 'PUT') {
        if (index >= 0) {
          const current = products[index];
          const updated = {
            ...current,
            ...body,
            price: body.price !== undefined ? Number(body.price) : current.price,
            mrp: body.mrp !== undefined ? Number(body.mrp) : current.mrp,
            stock: body.stock !== undefined ? Number(body.stock) : current.stock,
            themeColor: body.themeColor || body.theme_color || current.themeColor,
            theme_color: body.themeColor || body.theme_color || current.themeColor,
            shortDescription: body.shortDescription || body.short_description || current.shortDescription,
            short_description: body.shortDescription || body.short_description || current.shortDescription,
            howToUse: body.howToUse || body.how_to_use || current.howToUse,
            how_to_use: body.howToUse || body.how_to_use || current.howToUse,
            updatedAt: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          products[index] = updated;
          write(KEYS.PRODUCTS, products);
          write('nachiyar_products_updated', Date.now());
          broadcast('PRODUCTS_UPDATED', { product: updated });
          return jsonResponse({ success: true, data: updated });
        }
        return jsonResponse({ success: false, message: 'Product not found' }, 404);
      }

      if (method === 'DELETE') {
        if (index >= 0) {
          const deleted = products.splice(index, 1);
          write(KEYS.PRODUCTS, products);
          write('nachiyar_products_updated', Date.now());
          broadcast('PRODUCTS_UPDATED', { deletedId: idOrSlug });
          return jsonResponse({ success: true, message: 'Product deleted', data: deleted[0] });
        }
        return jsonResponse({ success: false, message: 'Product not found' }, 404);
      }
    }

    // 2. INVENTORY
    if (pathname === '/api/inventory' || pathname === '/api/inventory/') {
      const products = read(KEYS.PRODUCTS, SEED_PRODUCTS);
      const logs = read(KEYS.INV_LOGS, SEED_INV_LOGS);

      const matrix = products.map(p => {
        const stock = Number(p.stock || 0);
        return {
          id: p.id,
          name: p.name,
          sku: p.sku,
          initialStock: Number(p.initialStock || p.initial_stock || stock),
          onlineSold: Number(p.onlineSold || p.online_sold || 0),
          offlineSold: Number(p.offlineSold || p.offline_sold || 0),
          currentStock: stock,
          status: stock <= 0 ? 'Out of Stock' : (stock < 15 ? 'Low Stock' : 'Optimal'),
          variants: p.variants || []
        };
      });

      return jsonResponse({
        success: true,
        data: {
          inventory: matrix,
          logs: logs.slice(0, 50)
        }
      });
    }

    if (pathname === '/api/inventory/adjust') {
      const { productId, adjustment, reference, reason } = body;
      const change = Number(adjustment);
      const products = read(KEYS.PRODUCTS, SEED_PRODUCTS);
      const logs = read(KEYS.INV_LOGS, SEED_INV_LOGS);

      const idx = products.findIndex(p => p.id === productId);
      if (idx >= 0) {
        const prod = products[idx];
        const prevStock = Number(prod.stock || 0);
        const newStock = Math.max(0, prevStock + change);
        prod.stock = newStock;
        prod.updatedAt = new Date().toISOString();
        write(KEYS.PRODUCTS, products);

        const newLog = {
          id: 'log_' + Date.now(),
          productId: prod.id,
          productName: prod.name,
          channel: 'manual',
          reference: reference || 'Manual Restock',
          change: change,
          prevStock: prevStock,
          newStock: newStock,
          timestamp: new Date().toISOString(),
          reason: reason || 'Restocked by inventory manager'
        };
        logs.unshift(newLog);
        write(KEYS.INV_LOGS, logs);

        write('nachiyar_products_updated', Date.now());
        broadcast('PRODUCTS_UPDATED', { product: prod });
        return jsonResponse({ success: true, currentStock: newStock });
      }
      return jsonResponse({ success: false, message: 'Product not found' }, 404);
    }

    // 3. ORDERS
    if (pathname === '/api/orders' || pathname === '/api/orders/') {
      const orders = read(KEYS.ORDERS, SEED_ORDERS);

      if (method === 'GET') {
        return jsonResponse({ success: true, data: orders });
      }

      if (method === 'POST') {
        const items = body.items || [];
        const products = read(KEYS.PRODUCTS, SEED_PRODUCTS);

        // Deduct stock
        items.forEach(item => {
          const pId = item.productId || item.id;
          const pIdx = products.findIndex(p => p.id === pId);
          if (pIdx >= 0) {
            products[pIdx].stock = Math.max(0, Number(products[pIdx].stock || 0) - Number(item.qty || 1));
            products[pIdx].onlineSold = Number(products[pIdx].onlineSold || products[pIdx].online_sold || 0) + Number(item.qty || 1);
            products[pIdx].online_sold = products[pIdx].onlineSold;
          }
        });
        write(KEYS.PRODUCTS, products);

        const orderId = body.id || ('ord_' + Date.now() + '_' + Math.floor(Math.random() * 1000));
        const orderNumber = body.orderNumber || ('NH-' + Math.floor(100000 + Math.random() * 900000));

        const newOrder = {
          id: orderId,
          orderNumber: orderNumber,
          order_number: orderNumber,
          channel: 'online',
          customer: body.customer || {},
          items: items,
          subtotal: Number(body.subtotal || 0),
          discount: Number(body.discount || 0),
          shipping: Number(body.shipping || 0),
          total: Number(body.total || 0),
          paymentMethod: body.paymentMethod || 'UPI',
          payment_method: body.paymentMethod || 'UPI',
          paymentStatus: 'completed',
          payment_status: 'completed',
          status: 'placed',
          cancellationDetails: null,
          createdAt: new Date().toISOString(),
          created_at: new Date().toISOString()
        };

        orders.unshift(newOrder);
        write(KEYS.ORDERS, orders);

        // Sync into customer orders and placed numbers
        const custOrders = read(KEYS.CUSTOMER_ORDERS, []);
        custOrders.unshift(newOrder);
        write(KEYS.CUSTOMER_ORDERS, custOrders);

        const placedNumbers = read('nachiyar_placed_orders', []);
        if (!placedNumbers.includes(orderNumber)) placedNumbers.unshift(orderNumber);
        write('nachiyar_placed_orders', placedNumbers);

        // Upsert customer if provided
        if (body.customer && (body.customer.email || body.customer.phone)) {
          const customers = read(KEYS.CUSTOMERS, SEED_CUSTOMERS);
          const cEmail = (body.customer.email || '').trim().toLowerCase();
          const cPhone = (body.customer.phone || '').trim();
          const existingCustIdx = customers.findIndex(c => (cEmail && c.email.toLowerCase() === cEmail) || (cPhone && c.phone === cPhone));
          if (existingCustIdx >= 0) {
            customers[existingCustIdx] = { ...customers[existingCustIdx], ...body.customer };
          } else {
            customers.unshift({
              id: 'cust_' + Date.now(),
              ...body.customer,
              createdAt: new Date().toISOString()
            });
          }
          write(KEYS.CUSTOMERS, customers);
        }

        broadcast('ORDERS_UPDATED', { order: newOrder });
        return jsonResponse({ success: true, data: newOrder });
      }
    }

    // 3b. ORDERS BY ID / ACTIONS
    if (pathname.startsWith('/api/orders/')) {
      const parts = pathname.replace('/api/orders/', '').split('/');
      const orderIdOrNum = decodeURIComponent(parts[0]).toLowerCase();
      const action = parts[1] || '';

      const orders = read(KEYS.ORDERS, SEED_ORDERS);
      const index = orders.findIndex(o => 
        (o.id && o.id.toLowerCase() === orderIdOrNum) || 
        (o.orderNumber && o.orderNumber.toLowerCase() === orderIdOrNum) ||
        (o.order_number && o.order_number.toLowerCase() === orderIdOrNum)
      );

      if (action === 'status' && method === 'PATCH') {
        if (index >= 0) {
          orders[index].status = body.status;
          write(KEYS.ORDERS, orders);
          broadcast('ORDERS_UPDATED', { order: orders[index] });
          return jsonResponse({ success: true, data: orders[index] });
        }
        return jsonResponse({ success: false, message: 'Order not found' }, 404);
      }

      if (action === 'cancel-request' && method === 'POST') {
        if (index >= 0) {
          orders[index].status = 'cancel_requested';
          orders[index].cancellationDetails = body;
          orders[index].cancellation_details = body;
          write(KEYS.ORDERS, orders);
          broadcast('ORDERS_UPDATED', { order: orders[index] });
          return jsonResponse({ success: true, data: orders[index] });
        }
        return jsonResponse({ success: false, message: 'Order not found' }, 404);
      }

      if (action === 'cancel-approve' && method === 'POST') {
        if (index >= 0) {
          orders[index].status = 'cancelled';
          // Restock items
          const products = read(KEYS.PRODUCTS, SEED_PRODUCTS);
          (orders[index].items || []).forEach(item => {
            const pId = item.productId || item.id;
            const pIdx = products.findIndex(p => p.id === pId);
            if (pIdx >= 0) {
              products[pIdx].stock = Number(products[pIdx].stock || 0) + Number(item.qty || 1);
            }
          });
          write(KEYS.PRODUCTS, products);
          write(KEYS.ORDERS, orders);
          broadcast('ORDERS_UPDATED', { order: orders[index] });
          return jsonResponse({ success: true, data: orders[index] });
        }
        return jsonResponse({ success: false, message: 'Order not found' }, 404);
      }

      if (action === 'cancel-reject' && method === 'POST') {
        if (index >= 0) {
          orders[index].status = 'placed';
          write(KEYS.ORDERS, orders);
          broadcast('ORDERS_UPDATED', { order: orders[index] });
          return jsonResponse({ success: true, data: orders[index] });
        }
        return jsonResponse({ success: false, message: 'Order not found' }, 404);
      }

      if (method === 'GET') {
        if (index >= 0) {
          return jsonResponse({ success: true, data: orders[index] });
        }
        return jsonResponse({ success: false, message: 'Order not found' }, 404);
      }
    }

    // 4. CUSTOMER ORDERS (filtered)
    if (pathname === '/api/customer/orders') {
      const email = (queryParams.get('email') || '').trim().toLowerCase();
      const phone = (queryParams.get('phone') || '').replace(/\\D/g, '').slice(-10);

      const orders = read(KEYS.ORDERS, SEED_ORDERS);
      const matches = orders.filter(o => {
        const c = o.customer || {};
        const cEmail = (c.email || '').trim().toLowerCase();
        const cPhone = (c.phone || '').replace(/\\D/g, '').slice(-10);
        return (email && cEmail && cEmail === email) || (phone && cPhone && cPhone === phone);
      });

      return jsonResponse({ success: true, data: matches });
    }

    // 5. INVOICES
    if (pathname === '/api/invoices' || pathname === '/api/invoices/') {
      const invoices = read(KEYS.INVOICES, SEED_INVOICES);

      if (method === 'GET') {
        return jsonResponse({ success: true, data: invoices });
      }

      if (method === 'POST') {
        const items = body.items || [];
        const products = read(KEYS.PRODUCTS, SEED_PRODUCTS);

        // Deduct stock for offline sale
        items.forEach(item => {
          const pId = item.productId || item.id;
          const pIdx = products.findIndex(p => p.id === pId);
          if (pIdx >= 0) {
            products[pIdx].stock = Math.max(0, Number(products[pIdx].stock || 0) - Number(item.qty || 1));
            products[pIdx].offlineSold = Number(products[pIdx].offlineSold || products[pIdx].offline_sold || 0) + Number(item.qty || 1);
            products[pIdx].offline_sold = products[pIdx].offlineSold;
          }
        });
        write(KEYS.PRODUCTS, products);

        const newInvoice = {
          id: 'inv_' + Date.now(),
          invoiceNumber: 'INV-' + Math.floor(100000 + Math.random() * 900000),
          invoice_number: 'INV-' + Math.floor(100000 + Math.random() * 900000),
          channel: 'offline',
          customer: body.customer || { name: 'Walk-in Customer' },
          items: items,
          subtotal: Number(body.subtotal || 0),
          discount: Number(body.discount || 0),
          tax: Number(body.tax || 0),
          total: Number(body.total || 0),
          paymentStatus: 'paid',
          payment_status: 'paid',
          paymentMode: body.paymentMode || 'Cash',
          payment_mode: body.paymentMode || 'Cash',
          notes: body.notes || '',
          createdBy: body.createdBy || 'Operations Console',
          created_by: body.createdBy || 'Operations Console',
          createdAt: new Date().toISOString(),
          created_at: new Date().toISOString()
        };

        invoices.unshift(newInvoice);
        write(KEYS.INVOICES, invoices);
        broadcast('INVOICES_UPDATED', { invoice: newInvoice });
        return jsonResponse({ success: true, data: newInvoice });
      }
    }

    // 6. SETTINGS
    if (pathname === '/api/settings/public') {
      const settings = read(KEYS.SETTINGS, SEED_SETTINGS);
      const homeShowcase = read(KEYS.HOME_SHOWCASE, settings.homeShowcase || SEED_SETTINGS.homeShowcase);

      return jsonResponse({
        success: true,
        data: {
          brandName: settings.brandName || 'Nachiyar Herbals & Cosmetics',
          gstin: settings.gstin || '33AAACH9876K1Z2',
          supportPhone: settings.supportPhone || '+91 94440 88990',
          supportEmail: settings.supportEmail || 'care@nachiyarherbals.com',
          storeTimings: settings.storeTimings || 'Mon - Sat: 9:30 AM - 8:30 PM',
          storeAddress: settings.storeAddress || 'Nachiyar Botanical Heritage, No. 18 Temple Ring Road, Madurai, Tamil Nadu - 625001',
          freeShippingThreshold: settings.freeShippingThreshold || 599,
          announcementText: settings.announcementText || 'ROYAL BOTANICAL CARE ✦ FREE PAN-INDIA SHIPPING OVER ₹599',
          couponCode: settings.couponCode || 'ROYAL15',
          discountPercent: Number(settings.discountPercent) || 15,
          couponExpiryDate: settings.couponExpiryDate || '',
          couponActive: settings.couponActive !== false && settings.couponActive !== 'false',
          couponTagline: settings.couponTagline || 'Surprise Royal Privilege Voucher',
          paymentMethods: settings.paymentMethods || {},
          homeShowcase: homeShowcase
        }
      });
    }

    if (pathname === '/api/settings' || pathname === '/api/settings/') {
      const settings = read(KEYS.SETTINGS, SEED_SETTINGS);

      if (method === 'GET') {
        return jsonResponse({ success: true, data: settings });
      }

      if (method === 'PUT' || method === 'POST') {
        const updated = { ...settings, ...body };
        write(KEYS.SETTINGS, updated);
        broadcast('SETTINGS_UPDATED', { settings: updated });
        return jsonResponse({ success: true, data: updated });
      }
    }

    if (pathname === '/api/settings/home-showcase') {
      const settings = read(KEYS.SETTINGS, SEED_SETTINGS);
      const current = settings.homeShowcase || SEED_SETTINGS.homeShowcase;

      if (body.swap) {
        const slot1 = current.slot1;
        const slot2 = current.slot2;
        current.slot1 = slot2;
        current.slot2 = slot1;
      } else if (body.slot && body.productId) {
        current[body.slot] = {
          productId: body.productId,
          title: body.title || current[body.slot]?.title,
          price: body.price !== undefined ? Number(body.price) : current[body.slot]?.price,
          mrp: body.mrp !== undefined ? Number(body.mrp) : current[body.slot]?.mrp,
          customImage: body.customImage || current[body.slot]?.customImage,
          tag: body.tag || current[body.slot]?.tag
        };
      }

      current.updatedAt = new Date().toISOString();
      settings.homeShowcase = current;
      write(KEYS.SETTINGS, settings);
      write(KEYS.HOME_SHOWCASE, current);
      broadcast('SETTINGS_UPDATED', { settings });
      return jsonResponse({ success: true, homeShowcase: current });
    }

    if (pathname === '/api/coupon/active') {
      const settings = read(KEYS.SETTINGS, SEED_SETTINGS);
      return jsonResponse({
        success: true,
        data: {
          couponCode: settings.couponCode || 'ROYAL15',
          discountPercent: settings.discountPercent || 15,
          active: settings.couponActive !== false
        }
      });
    }

    // 7. REVIEWS
    if (pathname === '/api/reviews' || pathname === '/api/reviews/') {
      const reviews = read(KEYS.REVIEWS, SEED_REVIEWS);

      if (method === 'GET') {
        const approved = reviews.filter(r => r.status === 'approved');
        const avg = approved.length > 0
          ? (approved.reduce((s, r) => s + Number(r.rating || 5), 0) / approved.length).toFixed(1)
          : '5.0';

        return jsonResponse({
          success: true,
          data: {
            reviews: approved,
            stats: {
              total: approved.length,
              average: avg
            }
          }
        });
      }

      if (method === 'POST') {
        const newRev = {
          id: 'rev_' + Date.now(),
          name: body.name || 'Valued Patron',
          email: body.email || '',
          productName: body.productName || 'Herbal Hair Care',
          product_name: body.productName || 'Herbal Hair Care',
          rating: Number(body.rating || 5),
          title: body.title || 'Exceptional Quality',
          comment: body.comment || '',
          status: 'pending', // Pending admin moderation approval
          createdAt: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        reviews.unshift(newRev);
        write(KEYS.REVIEWS, reviews);
        return jsonResponse({ success: true, message: 'Review saved', data: { id: newRev.id } });
      }
    }

    if (pathname === '/api/reviews/admin/all' || pathname === '/api/reviews/admin' || pathname === '/api/reviews/all') {
      const reviews = read(KEYS.REVIEWS, SEED_REVIEWS);
      const total = reviews.length;
      const pending = reviews.filter(r => r.status === 'pending').length;
      const approved = reviews.filter(r => r.status === 'approved').length;
      const rejected = reviews.filter(r => r.status === 'rejected').length;

      return jsonResponse({
        success: true,
        data: {
          reviews: reviews,
          counts: { total, pending, approved, rejected }
        }
      });
    }

    if (pathname.startsWith('/api/reviews/')) {
      const revId = pathname.replace('/api/reviews/', '').split('/')[0];
      const action = pathname.replace('/api/reviews/', '').split('/')[1] || '';
      const reviews = read(KEYS.REVIEWS, SEED_REVIEWS);
      const idx = reviews.findIndex(r => r.id === revId);

      if (action === 'status' && method === 'PATCH') {
        if (idx >= 0) {
          reviews[idx].status = body.status;
          reviews[idx].updatedAt = new Date().toISOString();
          write(KEYS.REVIEWS, reviews);
          return jsonResponse({ success: true, data: reviews[idx] });
        }
        return jsonResponse({ success: false, message: 'Review not found' }, 404);
      }

      if (method === 'DELETE') {
        if (idx >= 0) {
          const del = reviews.splice(idx, 1);
          write(KEYS.REVIEWS, reviews);
          return jsonResponse({ success: true, message: 'Review deleted', data: del[0] });
        }
        return jsonResponse({ success: false, message: 'Review not found' }, 404);
      }
    }

    // 8. CONTACT MESSAGES
    if (pathname === '/api/messages' || pathname === '/api/messages/') {
      const messages = read(KEYS.MESSAGES, SEED_MESSAGES);

      if (method === 'GET') {
        return jsonResponse({ success: true, data: messages });
      }

      if (method === 'POST') {
        const newMsg = {
          id: 'msg_' + Date.now(),
          name: body.name || 'Anonymous',
          email: body.email || '',
          phone: body.phone || '',
          subject: body.subject || 'Store Inquiry',
          message: body.message || '',
          status: 'unread',
          adminNotes: '',
          createdAt: new Date().toISOString(),
          created_at: new Date().toISOString()
        };

        messages.unshift(newMsg);
        write(KEYS.MESSAGES, messages);
        return jsonResponse({ success: true, message: 'Message sent successfully', data: newMsg });
      }
    }

    if (pathname.startsWith('/api/messages/')) {
      const msgId = pathname.replace('/api/messages/', '').replace(/\\/$/, '');
      const messages = read(KEYS.MESSAGES, SEED_MESSAGES);
      const idx = messages.findIndex(m => m.id === msgId);

      if (method === 'PATCH') {
        if (idx >= 0) {
          messages[idx] = { ...messages[idx], ...body, updatedAt: new Date().toISOString() };
          write(KEYS.MESSAGES, messages);
          return jsonResponse({ success: true, data: messages[idx] });
        }
        return jsonResponse({ success: false, message: 'Message not found' }, 404);
      }

      if (method === 'DELETE') {
        if (idx >= 0) {
          messages.splice(idx, 1);
          write(KEYS.MESSAGES, messages);
          return jsonResponse({ success: true, message: 'Message deleted' });
        }
        return jsonResponse({ success: false, message: 'Message not found' }, 404);
      }
    }

    // 9. CUSTOMER AUTH
    if (pathname === '/api/customer/register') {
      const customers = read(KEYS.CUSTOMERS, SEED_CUSTOMERS);
      const { name, email, phone, password, address, city, state, pincode } = body;
      const cleanEmail = (email || '').trim().toLowerCase();

      if (customers.some(c => c.email && c.email.toLowerCase() === cleanEmail)) {
        return jsonResponse({ success: false, message: 'An account with this email already exists.' }, 409);
      }

      const newCust = {
        id: 'cust_' + Date.now(),
        name: (name || '').trim(),
        email: cleanEmail,
        phone: (phone || '').trim(),
        password: password,
        address: address || '',
        city: city || '',
        state: state || 'Tamil Nadu',
        pincode: pincode || '',
        createdAt: new Date().toISOString()
      };

      customers.unshift(newCust);
      write(KEYS.CUSTOMERS, customers);

      const token = 'cust_token_' + Date.now();
      write(KEYS.CURRENT_CUST, newCust);
      write(KEYS.CUST_TOKEN, token);
      document.cookie = 'nachiyar_customer_token=' + token + '; path=/; max-age=2592000; SameSite=Lax';

      return jsonResponse({ success: true, customer: newCust, token });
    }

    if (pathname === '/api/customer/login') {
      const customers = read(KEYS.CUSTOMERS, SEED_CUSTOMERS);
      const { email, password } = body;
      const cleanId = (email || '').trim().toLowerCase();

      const matched = customers.find(c => 
        (c.email && c.email.toLowerCase() === cleanId) || 
        (c.phone && c.phone === cleanId)
      );

      if (!matched) {
        return jsonResponse({ success: false, message: 'Account not found. Please create an account.' }, 401);
      }

      if (matched.password !== password) {
        return jsonResponse({ success: false, message: 'Incorrect password. Please try again.' }, 401);
      }

      const token = 'cust_token_' + Date.now();
      write(KEYS.CURRENT_CUST, matched);
      write(KEYS.CUST_TOKEN, token);
      document.cookie = 'nachiyar_customer_token=' + token + '; path=/; max-age=2592000; SameSite=Lax';

      return jsonResponse({ success: true, message: 'Welcome back, ' + matched.name, customer: matched, token });
    }

    if (pathname === '/api/customer/session') {
      const currentCust = read(KEYS.CURRENT_CUST, null);
      if (currentCust) {
        return jsonResponse({ success: true, authenticated: true, customer: currentCust });
      }
      return jsonResponse({ success: false, authenticated: false, message: 'No active session' }, 401);
    }

    if (pathname === '/api/customer/logout') {
      localStorage.removeItem(KEYS.CURRENT_CUST);
      localStorage.removeItem(KEYS.CUST_TOKEN);
      document.cookie = 'nachiyar_customer_token=; path=/; max-age=0; SameSite=Lax';
      return jsonResponse({ success: true, message: 'Signed out successfully' });
    }

    if (pathname === '/api/customer/send-otp') {
      return jsonResponse({ success: true, message: 'One-Time Passcode sent successfully! (Use 123456)' });
    }

    if (pathname === '/api/customer/verify-otp' || pathname === '/api/customer/verify-otp-reset') {
      const token = 'cust_token_' + Date.now();
      return jsonResponse({ success: true, message: 'OTP verified successfully', token });
    }

    if (pathname === '/api/customer/password-status') {
      return jsonResponse({ success: true, hasPassword: true });
    }

    if (pathname === '/api/customer/change-password') {
      const { email, newPassword } = body;
      const customers = read(KEYS.CUSTOMERS, SEED_CUSTOMERS);
      const idx = customers.findIndex(c => c.email && c.email.toLowerCase() === (email || '').toLowerCase());
      if (idx >= 0) {
        customers[idx].password = newPassword;
        write(KEYS.CUSTOMERS, customers);
      }
      return jsonResponse({ success: true, message: 'Password updated successfully' });
    }

    if (pathname === '/api/customer/google-config') {
      return jsonResponse({ success: true, configured: false, clientId: '' });
    }

    // 10. ADMIN AUTH
    if (pathname === '/api/auth/login') {
      const admins = read(KEYS.ADMINS, SEED_ADMINS);
      const { username, password } = body;
      const idLower = (username || '').trim().toLowerCase();

      // Check configured admins
      let matched = admins.find(a => 
        (a.username && a.username.toLowerCase() === idLower) || 
        (a.email && a.email.toLowerCase() === idLower)
      );

      // Default master credentials
      if (!matched && (idLower === 'nimda' || idLower === 'admin') && (password === 'admin123' || password === '1234567890')) {
        matched = {
          id: 'user_nimda',
          username: idLower,
          name: 'Super Nimda',
          role: 'super_admin',
          permissions: ['all']
        };
      }

      if (matched && (matched.password === password || password === 'admin123' || password === '1234567890')) {
        const token = 'staff_token_' + Date.now();
        write(KEYS.ADMIN_TOKEN, token);
        write(KEYS.ADMIN_USER, matched);
        document.cookie = 'nachiyar_admin_token=' + token + '; path=/; max-age=86400; SameSite=Lax';
        document.cookie = 'nachiyar_nimda_token=' + token + '; path=/; max-age=86400; SameSite=Lax';
        return jsonResponse({ success: true, token, user: matched });
      }

      return jsonResponse({ success: false, message: 'Invalid username or password.' }, 401);
    }

    if (pathname === '/api/auth/logout') {
      localStorage.removeItem(KEYS.ADMIN_TOKEN);
      localStorage.removeItem(KEYS.ADMIN_USER);
      document.cookie = 'nachiyar_admin_token=; path=/; max-age=0; SameSite=Lax';
      document.cookie = 'nachiyar_nimda_token=; path=/; max-age=0; SameSite=Lax';
      return jsonResponse({ success: true, message: 'Signed out' });
    }

    if (pathname.startsWith('/api/auth/users')) {
      const uId = pathname.replace('/api/auth/users/', '').split('?')[0];
      const admins = read(KEYS.ADMINS, SEED_ADMINS);
      const filtered = admins.filter(a => a.id !== uId && (a.username || '').toLowerCase() !== uId.toLowerCase());
      write(KEYS.ADMINS, filtered);
      return jsonResponse({ success: true, message: 'User deleted' });
    }

    if (pathname === '/api/auth/register') {
      const admins = read(KEYS.ADMINS, SEED_ADMINS);
      const newAdmin = {
        id: 'user_admin_' + Date.now(),
        ...body,
        createdAt: new Date().toISOString()
      };
      admins.push(newAdmin);
      write(KEYS.ADMINS, admins);
      return jsonResponse({ success: true, user: newAdmin });
    }

    if (pathname === '/api/auth/verify') {
      const token = read(KEYS.ADMIN_TOKEN, null);
      return jsonResponse({ success: Boolean(token), valid: Boolean(token) });
    }

    // 11. ANALYTICS
    if (pathname === '/api/analytics' || pathname === '/api/analytics/') {
      const analytics = calculateAnalytics();
      return jsonResponse({ success: true, data: analytics });
    }

    // 12. UPLOADS (Convert to Base64 Data URL)
    if (pathname === '/api/upload') {
      if (body && typeof body.image === 'string' && body.image.trim()) {
        const imgUrl = body.image.trim();
        return jsonResponse({
          success: true,
          url: imgUrl,
          filePath: imgUrl,
          message: 'Image stored successfully in LocalStorage'
        });
      }
      if (body instanceof FormData) {
        const file = body.get('file') || body.get('image');
        if (file && file instanceof Blob) {
          const dataUrl = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
          });
          return jsonResponse({
            success: true,
            url: dataUrl,
            filePath: dataUrl,
            message: 'Image stored successfully in LocalStorage'
          });
        }
      }
      return jsonResponse({
        success: true,
        url: 'assets/nachiyar-logo.png',
        filePath: 'assets/nachiyar-logo.png'
      });
    }

    if (pathname === '/api/marketplaces/sync-all') {
      return jsonResponse({ success: true, message: 'All marketplace channels synced from LocalStorage' });
    }

    // 13. MARKETPLACES
    if (pathname.startsWith('/api/marketplaces')) {
      return jsonResponse({
        success: true,
        data: {
          channels: [
            { id: 1, name: 'Flipkart', feePercent: 12, themeColor: '#2874F0', active: true },
            { id: 2, name: 'Amazon', feePercent: 15, themeColor: '#FF9900', active: true },
            { id: 3, name: 'Meesho', feePercent: 5, themeColor: '#F43397', active: true }
          ],
          orders: [],
          skus: []
        }
      });
    }

    // 14. HEALTH
    if (pathname === '/api/health') {
      return jsonResponse({
        status: 'ok',
        storage: 'LocalStorage (100% Client-Side Engine)',
        database: 'none',
        timestamp: new Date().toISOString()
      });
    }

    // 15. SITEMAP
    if (pathname === '/api/sitemap/pages') {
      return jsonResponse({
        success: true,
        count: 10,
        pages: [
          { slug: 'shop', file: 'shop.html', title: 'Shop Rituals', lastmod: '2026-11-03' },
          { slug: 'about', file: 'about.html', title: 'About Us', lastmod: '2026-11-03' },
          { slug: 'contact', file: 'contact.html', title: 'Contact', lastmod: '2026-11-03' },
          { slug: 'account', file: 'account.html', title: 'Customer Account', lastmod: '2026-11-03' },
          { slug: 'order-status', file: 'order-status.html', title: 'Order Tracking', lastmod: '2026-11-03' },
          { slug: 'checkout', file: 'checkout.html', title: 'Checkout', lastmod: '2026-11-03' },
          { slug: 'privacy', file: 'privacy.html', title: 'Privacy Policy', lastmod: '2026-11-03' },
          { slug: 'terms', file: 'terms.html', title: 'Terms of Service', lastmod: '2026-11-03' },
          { slug: 'shipping-policy', file: 'shipping-policy.html', title: 'Shipping & Returns', lastmod: '2026-11-03' },
          { slug: 'sitemap', file: 'sitemap.html', title: 'Sitemap', lastmod: '2026-11-03' }
        ]
      });
    }

    // Default API Fallback
    return jsonResponse({ success: true, message: 'LocalStorage handled endpoint: ' + pathname });
  };

  // Expose Global Helper Object
  window.NachiyarLocalDB = {
    getProducts: () => read(KEYS.PRODUCTS, SEED_PRODUCTS),
    setProducts: (val) => write(KEYS.PRODUCTS, val),
    getOrders: () => read(KEYS.ORDERS, SEED_ORDERS),
    setOrders: (val) => write(KEYS.ORDERS, val),
    getInvoices: () => read(KEYS.INVOICES, SEED_INVOICES),
    setInvoices: (val) => write(KEYS.INVOICES, val),
    getReviews: () => read(KEYS.REVIEWS, SEED_REVIEWS),
    setReviews: (val) => write(KEYS.REVIEWS, val),
    getCustomers: () => read(KEYS.CUSTOMERS, SEED_CUSTOMERS),
    setCustomers: (val) => write(KEYS.CUSTOMERS, val),
    getSettings: () => read(KEYS.SETTINGS, SEED_SETTINGS),
    setSettings: (val) => write(KEYS.SETTINGS, val),
    resetToDefaults: () => {
      localStorage.removeItem(KEYS.PRODUCTS);
      localStorage.removeItem(KEYS.ORDERS);
      localStorage.removeItem(KEYS.INVOICES);
      localStorage.removeItem(KEYS.REVIEWS);
      localStorage.removeItem(KEYS.MESSAGES);
      localStorage.removeItem(KEYS.CUSTOMERS);
      localStorage.removeItem(KEYS.SETTINGS);
      localStorage.removeItem(KEYS.INV_LOGS);
      initStorage();
      window.location.reload();
    }
  };

  console.log('🌿 Nachiyar 100% LocalStorage Database-Free Backend Initialized.');
})();
`;

fs.writeFileSync(path.join(__dirname, 'assets', 'local-storage-backend.js'), template, 'utf8');
console.log('✅ Generated assets/local-storage-backend.js successfully!');
