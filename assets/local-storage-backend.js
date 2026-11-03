/**
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
  const SEED_PRODUCTS = [
  {
    "id": "prod_oil_01",
    "slug": "herbal-hair-oil",
    "name": "Herbal Hair Oil",
    "subtitle": "Lavender Glass Dropper Bottle • 100% Cold-Pressed",
    "category": "Hair Care",
    "categoryId": "cat_hair_care",
    "category_id": "cat_hair_care",
    "price": 299,
    "mrp": 699,
    "stock": 61,
    "initialStock": 100,
    "initial_stock": 100,
    "onlineSold": 26,
    "online_sold": 26,
    "offlineSold": 14,
    "offline_sold": 14,
    "sku": "NH-OIL-200ML",
    "images": [
      "assets/new-oil-bottle-card.jpg"
    ],
    "themeColor": "#6b4e9b",
    "theme_color": "#6b4e9b",
    "tagline": "Cold-Pressed • 18 Rare Herbs • Root Activating",
    "metricBadge": "100% PURE",
    "metric_badge": "100% PURE",
    "badge": "Bestseller",
    "shortDescription": "Traditional 21-day solar-infused oil in pure lavender essence to stimulate roots and banish hair fall.",
    "short_description": "Traditional 21-day solar-infused oil in pure lavender essence to stimulate roots and banish hair fall.",
    "description": "Crafted in small batches according to classical Ayurvedic texts. Nachiyar Herbal Hair Oil features deep-steeped cold-pressed oils enriched with Bhringraj, Amla, Brahmi, and delicate lavender blossom essence. Calms scalp inflammation, repairs dry split ends, and delivers noticeable root strength within two weeks of regular application.",
    "benefits": [
      "Clinically proven hair fall reduction in 14 days",
      "Soothes irritated, dry scalp with calming lavender aromatherapy",
      "Deeply bioavailable: absorbs without heavy mineral grease",
      "Encourages dense follicle growth and strand thickness"
    ],
    "ingredients": "Cold-Pressed Black Sesame Oil, Virgin Coconut Oil, Pure French Lavender Oil (Lavandula Angustifolia), Bhringraj, Amla, Brahmi, Hibiscus Blossom, Fenugreek, Rosemary, Indian Nardostachys (Jatamansi).",
    "howToUse": "Dispense 1-2 droppers directly across scalp partings. Gently massage using circular fingertip motions for 5-10 minutes. Leave on for a minimum of 1 hour or overnight before cleansing.",
    "how_to_use": "Dispense 1-2 droppers directly across scalp partings. Gently massage using circular fingertip motions for 5-10 minutes. Leave on for a minimum of 1 hour or overnight before cleansing.",
    "variants": [
      {
        "id": "v_oil_100",
        "mrp": 399,
        "sku": "NH-OIL-100",
        "name": "100ml Travel Edition",
        "price": 349,
        "stock": 45
      },
      {
        "id": "v_oil_200",
        "mrp": 699,
        "sku": "NH-OIL-200",
        "name": "200ml Glass Dropper Bottle",
        "price": 299,
        "stock": 85
      },
      {
        "id": "v_oil_500",
        "mrp": 1399,
        "sku": "NH-OIL-500",
        "name": "500ml Luxury Value Refill",
        "price": 1199,
        "stock": 25
      }
    ],
    "seo": {
      "slug": "herbal-hair-oil",
      "keywords": "herbal hair oil, lavender hair oil, nachiyar herbals, cold pressed hair oil, ayurvedic scalp care, bhringraj oil",
      "metaTitle": "Nachiyar Herbal Hair Oil | 100% Cold-Pressed Lavender Ayurvedic Elixir",
      "metaDescription": "Discover Nachiyar Herbal Hair Oil in its signature lavender bottle. 18 rare Ayurvedic herbs infused over 21 days for follicle strength, shine, and hair fall prevention."
    },
    "status": "active",
    "createdAt": "2026-10-08T06:21:02.241Z",
    "created_at": "2026-10-08T06:21:02.241Z",
    "updatedAt": "2026-10-16T12:23:45.798Z",
    "updated_at": "2026-10-16T12:23:45.798Z"
  },
  {
    "id": "prod_shampoo_02",
    "slug": "hibiscus-flower-shampoo",
    "name": "Hibiscus Flower Shampoo",
    "subtitle": "Crimson Botanical Pump Bottle • Sulfate-Free pH 5.5",
    "category": "Scalp & Cleansing",
    "categoryId": "cat_scalp",
    "category_id": "cat_scalp",
    "price": 249,
    "mrp": 649,
    "stock": 67,
    "initialStock": 90,
    "initial_stock": 90,
    "onlineSold": 8,
    "online_sold": 8,
    "offlineSold": 15,
    "offline_sold": 15,
    "sku": "NH-SHAMP-250ML",
    "images": [
      "assets/new-shampoo-bottle-card.jpg"
    ],
    "themeColor": "#822234",
    "theme_color": "#822234",
    "tagline": "Sulfate-Free • Fresh Petal Infusion • pH 5.5",
    "metricBadge": "pH 5.5 BALANCED",
    "metric_badge": "pH 5.5 BALANCED",
    "badge": "Customer Favorite",
    "shortDescription": "Petal-rich lather that cleanses without stripping natural moisture, restoring scalp microbiome balance.",
    "short_description": "Petal-rich lather that cleanses without stripping natural moisture, restoring scalp microbiome balance.",
    "description": "Formulated with handpicked South Indian hibiscus blossoms and gentle plant-derived saponins. Gently cleanses without stripping natural oils, enhancing softness, promoting follicle vitality, and restoring hair's natural radiant shine.",
    "benefits": [
      "0% Sulfates, Silicones, Parabens, or Synthetic Dyes",
      "pH 5.5 balanced to protect the delicate scalp acid mantle",
      "Natural hibiscus mucilage locks in moisture and mirrors conditioning shine",
      "Safe for color-treated, chemically straightened, or sensitive hair"
    ],
    "ingredients": "Aqua, Fresh Hibiscus Rosa-Sinensis Flower Extract, Decyl Glucoside (Coconut derived), Shikakai Extract, Reetha (Soapnut), Aloe Vera Leaf Juice, Vegetable Glycerin, Vitamin E, Sweet Orange Peel Oil.",
    "howToUse": "Pump 2-3 pumps into wet palms and work into a rich lather. Massage thoroughly into damp scalp and lengths. Rinse with cool water. Pair with Nachiyar Herbal Hair Oil for maximum results.",
    "how_to_use": "Pump 2-3 pumps into wet palms and work into a rich lather. Massage thoroughly into damp scalp and lengths. Rinse with cool water. Pair with Nachiyar Herbal Hair Oil for maximum results.",
    "variants": [
      {
        "id": "v_shamp_250",
        "mrp": 649,
        "sku": "NH-SHAMP-250",
        "name": "250ml Botanical Pump Bottle",
        "price": 249,
        "stock": 68
      },
      {
        "id": "v_shamp_500",
        "mrp": 1099,
        "sku": "NH-SHAMP-500",
        "name": "500ml Family Pump Bottle",
        "price": 949,
        "stock": 30
      }
    ],
    "seo": {
      "slug": "hibiscus-flower-shampoo",
      "keywords": "hibiscus shampoo, sulfate free shampoo, nachiyar herbals, natural hair cleanser, ayurvedic shampoo, ph balanced shampoo",
      "metaTitle": "Nachiyar Hibiscus Flower Shampoo | Sulfate-Free Scalp Cleanser pH 5.5",
      "metaDescription": "Infused with fresh hibiscus petals, Nachiyar's gentle sulfate-free shampoo restores natural shine, calms the scalp, and strengthens roots."
    },
    "status": "active",
    "createdAt": "2026-10-08T06:21:02.255Z",
    "created_at": "2026-10-08T06:21:02.255Z",
    "updatedAt": "2026-10-13T11:00:06.475Z",
    "updated_at": "2026-10-13T11:00:06.475Z"
  },
  {
    "id": "prod_duo_03",
    "slug": "royal-hair-ritual-duo",
    "name": "The Royal Hair Ritual (Duo Set)",
    "subtitle": "Oil (200ml) + Shampoo (250ml) + Silk Travel Pouch",
    "category": "Ritual Sets",
    "categoryId": "cat_sets",
    "category_id": "cat_sets",
    "price": 499,
    "mrp": 1148,
    "stock": 42,
    "initialStock": 55,
    "initial_stock": 55,
    "onlineSold": 7,
    "online_sold": 7,
    "offlineSold": 6,
    "offline_sold": 6,
    "sku": "NH-DUO-SET",
    "images": [
      "assets/duo-ritual-new.jpg"
    ],
    "themeColor": "#271434",
    "theme_color": "#271434",
    "tagline": "Complete 2-Step Routine • Save 15%",
    "metricBadge": "15% OFF",
    "metric_badge": "15% OFF",
    "badge": "Royal Special Value",
    "shortDescription": "The ultimate Ayurvedic duo: Pre-wash deep oil nourishment + restorative gentle petal cleansing.",
    "short_description": "The ultimate Ayurvedic duo: Pre-wash deep oil nourishment + restorative gentle petal cleansing.",
    "description": "Experience complete follicular revitalisation. Step 1: Pre-wash deep scalp nourishment with the Lavender Herbal Hair Oil. Step 2: Gentle balancing wash with the Hibiscus Flower Shampoo. Includes a complimentary gold silk travel pouch and free Pan-India Express Delivery.",
    "benefits": [
      "Comprehensive 2-step solution: nourishment + gentle cleansing",
      "Saves 15% compared to purchasing individual bottles",
      "Includes limited-edition gold silk storage pouch",
      "Complimentary Pan-India Express Delivery on all orders"
    ],
    "ingredients": "Includes full formulation of Herbal Hair Oil (200ml) and Hibiscus Flower Shampoo (250ml).",
    "howToUse": "Apply Herbal Hair Oil 2-3 hours before bath. Cleanse gently using Hibiscus Flower Shampoo. Repeat ritual 2-3 times weekly.",
    "how_to_use": "Apply Herbal Hair Oil 2-3 hours before bath. Cleanse gently using Hibiscus Flower Shampoo. Repeat ritual 2-3 times weekly.",
    "variants": [
      {
        "id": "v_duo_standard",
        "mrp": 1148,
        "sku": "NH-DUO-STD",
        "name": "Full Ritual Duo (200ml Oil + 250ml Shampoo)",
        "price": 499,
        "stock": 42
      }
    ],
    "seo": {
      "slug": "royal-hair-ritual-duo",
      "keywords": "hair care routine combo, nachiyar hair care duo, hair oil and shampoo set, ayurvedic hair set",
      "metaTitle": "The Royal Hair Ritual Duo | Nachiyar Herbal Oil & Hibiscus Shampoo",
      "metaDescription": "Get the complete 2-step Ayurvedic hair ritual by Nachiyar Herbals. 15% off combo pack with free shipping and silk travel pouch."
    },
    "status": "active",
    "createdAt": "2026-10-08T06:21:02.257Z",
    "created_at": "2026-10-08T06:21:02.257Z",
    "updatedAt": "2026-10-13T11:52:03.975Z",
    "updated_at": "2026-10-13T11:52:03.975Z"
  }
];
  const SEED_ORDERS = [
  {
    "id": "ord_1001",
    "orderNumber": "NH-ON-1001",
    "order_number": "NH-ON-1001",
    "channel": "online",
    "customer": {
      "city": "Chennai",
      "name": "Pooja Madhavan",
      "email": "pooja.m@example.com",
      "phone": "+91 98401 23456",
      "state": "Tamil Nadu",
      "address": "42, Besant Avenue, Adyar",
      "pincode": "600020"
    },
    "items": [
      {
        "img": "assets/herbal-hair-oil.jpg",
        "qty": 1,
        "name": "Herbal Hair Oil",
        "size": "200ml Glass Dropper Bottle",
        "price": 599,
        "productId": "prod_oil_01"
      },
      {
        "img": "assets/hibiscus-shampoo.jpg",
        "qty": 1,
        "name": "Hibiscus Flower Shampoo",
        "size": "250ml Botanical Pump Bottle",
        "price": 549,
        "productId": "prod_shampoo_02"
      }
    ],
    "subtotal": 1148,
    "discount": 149,
    "shipping": 0,
    "total": 999,
    "paymentMethod": "UPI (GPay)",
    "payment_method": "UPI (GPay)",
    "paymentStatus": "paid",
    "payment_status": "paid",
    "status": "shipped",
    "cancellationDetails": null,
    "cancellation_details": null,
    "createdAt": "2026-10-06T14:32:00.000Z",
    "created_at": "2026-10-06T14:32:00.000Z"
  },
  {
    "id": "ord_1002",
    "orderNumber": "NH-ON-1002",
    "order_number": "NH-ON-1002",
    "channel": "online",
    "customer": {
      "city": "Mumbai",
      "name": "Ananya Sharma",
      "email": "ananya.s@example.com",
      "phone": "+91 98200 98765",
      "state": "Maharashtra",
      "address": "Flat 804, Oberoi Springs, Andheri West",
      "pincode": "400053"
    },
    "items": [
      {
        "img": "assets/duo-ritual.jpg",
        "qty": 1,
        "name": "The Royal Hair Ritual (Duo Set)",
        "size": "Full Ritual Duo",
        "price": 999,
        "productId": "prod_duo_03"
      }
    ],
    "subtotal": 999,
    "discount": 0,
    "shipping": 0,
    "total": 999,
    "paymentMethod": "Credit Card",
    "payment_method": "Credit Card",
    "paymentStatus": "paid",
    "payment_status": "paid",
    "status": "processing",
    "cancellationDetails": null,
    "cancellation_details": null,
    "createdAt": "2026-10-07T11:15:00.000Z",
    "created_at": "2026-10-07T11:15:00.000Z"
  },
  {
    "id": "ord_1791387291524",
    "orderNumber": "NH-ON-1003",
    "order_number": "NH-ON-1003",
    "channel": "online",
    "customer": {
      "name": "Test Online Customer",
      "email": "test@nachiyar.com",
      "phone": "9888888888",
      "address": "12 Temple St"
    },
    "items": [
      {
        "img": "assets/herbal-hair-oil.jpg",
        "qty": 3,
        "name": "Herbal Hair Oil",
        "price": 599,
        "productId": "prod_oil_01"
      }
    ],
    "subtotal": 1797,
    "discount": 0,
    "shipping": 0,
    "total": 1797,
    "paymentMethod": "UPI / Online Payment",
    "payment_method": "UPI / Online Payment",
    "paymentStatus": "paid",
    "payment_status": "paid",
    "status": "placed",
    "cancellationDetails": null,
    "cancellation_details": null,
    "createdAt": "2026-10-07T15:34:51.524Z",
    "created_at": "2026-10-07T15:34:51.524Z"
  },
  {
    "id": "ord_1791457173717",
    "orderNumber": "NH-ON-1004",
    "order_number": "NH-ON-1004",
    "channel": "online",
    "customer": {
      "city": "Madurai",
      "name": "Bharathi p",
      "email": "mv80567135@gmail.com",
      "phone": "+918056713589",
      "state": "Tamil Nadu",
      "address": "78,Ramakrishna colony, kaithari nagar,madurai - 625005",
      "pincode": "625005"
    },
    "items": [
      {
        "img": "assets/herbal-hair-oil.jpg",
        "qty": 1,
        "name": "Herbal Hair Oil",
        "size": "200ml",
        "price": 599,
        "productId": "prod_oil_01"
      }
    ],
    "subtotal": 599,
    "discount": 0,
    "shipping": 0,
    "total": 599,
    "paymentMethod": "UPI / Online Payment",
    "payment_method": "UPI / Online Payment",
    "paymentStatus": "paid",
    "payment_status": "paid",
    "status": "placed",
    "cancellationDetails": null,
    "cancellation_details": null,
    "createdAt": "2026-10-08T10:59:33.685Z",
    "created_at": "2026-10-08T10:59:33.685Z"
  },
  {
    "id": "ord_sample_02",
    "orderNumber": "NH-ON-0984",
    "order_number": "NH-ON-0984",
    "channel": "online",
    "customer": {
      "city": "Chennai",
      "name": "Pooja Madhavan",
      "email": "pooja.m@example.com",
      "phone": "+91 98401 23456",
      "state": "Tamil Nadu",
      "address": "42, Besant Avenue, Adyar",
      "pincode": "600020"
    },
    "items": [
      {
        "img": "assets/hero-bottle-oil-transparent.png",
        "qty": 2,
        "name": "Herbal Hair Oil",
        "size": "200ml Glass Dropper Bottle",
        "price": 599,
        "productId": "prod_oil_01"
      }
    ],
    "subtotal": 1198,
    "discount": 199,
    "shipping": 0,
    "total": 999,
    "paymentMethod": "UPI / Google Pay",
    "payment_method": "UPI / Google Pay",
    "paymentStatus": "paid",
    "payment_status": "paid",
    "status": "delivered",
    "cancellationDetails": null,
    "cancellation_details": null,
    "createdAt": "2026-09-18T10:14:00.000Z",
    "created_at": "2026-09-18T10:14:00.000Z"
  },
  {
    "id": "ord_sample_03",
    "orderNumber": "NH-ON-0952",
    "order_number": "NH-ON-0952",
    "channel": "online",
    "customer": {
      "city": "Chennai",
      "name": "Pooja Madhavan",
      "email": "pooja.m@example.com",
      "phone": "+91 98401 23456",
      "state": "Tamil Nadu",
      "address": "42, Besant Avenue, Adyar",
      "pincode": "600020"
    },
    "items": [
      {
        "img": "assets/hero-bottle-shampoo-transparent.png",
        "qty": 1,
        "name": "Hibiscus Flower Shampoo",
        "size": "250ml Botanical Pump Bottle",
        "price": 549,
        "productId": "prod_shampoo_02"
      },
      {
        "img": "assets/duo-ritual-new.jpg",
        "qty": 1,
        "name": "The Royal Hair Ritual (Duo Set)",
        "size": "Full Ritual Duo",
        "price": 999,
        "productId": "prod_duo_03"
      }
    ],
    "subtotal": 1548,
    "discount": 200,
    "shipping": 0,
    "total": 1348,
    "paymentMethod": "Credit Card / Visa",
    "payment_method": "Credit Card / Visa",
    "paymentStatus": "paid",
    "payment_status": "paid",
    "status": "delivered",
    "cancellationDetails": null,
    "cancellation_details": null,
    "createdAt": "2026-08-04T16:20:00.000Z",
    "created_at": "2026-08-04T16:20:00.000Z"
  },
  {
    "id": "ord_sample_04",
    "orderNumber": "NH-ON-1005",
    "order_number": "NH-ON-1005",
    "channel": "online",
    "customer": {
      "city": "Chennai",
      "name": "Pooja Madhavan",
      "email": "pooja.m@example.com",
      "phone": "+91 98401 23456",
      "state": "Tamil Nadu",
      "address": "42, Besant Avenue, Adyar",
      "pincode": "600020"
    },
    "items": [
      {
        "img": "assets/duo-ritual-new.jpg",
        "qty": 1,
        "name": "The Royal Hair Ritual (Duo Set)",
        "size": "Full Ritual Duo Set (Oil + Shampoo)",
        "price": 999,
        "productId": "prod_duo_03"
      }
    ],
    "subtotal": 999,
    "discount": 0,
    "shipping": 0,
    "total": 999,
    "paymentMethod": "UPI / PhonePe",
    "payment_method": "UPI / PhonePe",
    "paymentStatus": "paid",
    "payment_status": "paid",
    "status": "processing",
    "cancellationDetails": null,
    "cancellation_details": null,
    "createdAt": "2026-10-08T09:30:00.000Z",
    "created_at": "2026-10-08T09:30:00.000Z"
  },
  {
    "id": "ord_1791463836940",
    "orderNumber": "NH-ON-1008",
    "order_number": "NH-ON-1008",
    "channel": "online",
    "customer": {
      "city": "Madurai",
      "name": "Muralitharan T S",
      "email": "muraliii@gmail.com",
      "phone": "+918056713589",
      "state": "TamilNadu",
      "address": "Madurai , Tamil Nadu",
      "pincode": "625005"
    },
    "items": [
      {
        "img": "assets/herbal-hair-oil.jpg",
        "qty": 1,
        "name": "Herbal Hair Oil",
        "size": "200ml",
        "price": 599,
        "productId": "prod_oil_01"
      },
      {
        "img": "assets/new-oil-bottle-card.jpg",
        "qty": 1,
        "name": "Herbal Hair Oil",
        "size": "100ml Travel Edition",
        "price": 349,
        "productId": "prod_oil_01"
      }
    ],
    "subtotal": 948,
    "discount": 0,
    "shipping": 0,
    "total": 948,
    "paymentMethod": "Cash On Delivery (COD)",
    "payment_method": "Cash On Delivery (COD)",
    "paymentStatus": "paid",
    "payment_status": "paid",
    "status": "processing",
    "cancellationDetails": null,
    "cancellation_details": null,
    "createdAt": "2026-10-08T12:50:36.922Z",
    "created_at": "2026-10-08T12:50:36.922Z"
  },
  {
    "id": "ord_1791530947072",
    "orderNumber": "NH-ON-1009",
    "order_number": "NH-ON-1009",
    "channel": "online",
    "customer": {
      "city": "madura",
      "name": "guru vishwa",
      "email": "gv@gmail.com",
      "phone": "6379554975",
      "state": "Tamil Nadu",
      "address": "villapuram",
      "pincode": "625005"
    },
    "items": [
      {
        "img": "assets/new-oil-bottle-card.jpg",
        "qty": 2,
        "name": "Herbal Hair Oil",
        "size": "200ml",
        "price": 599,
        "productId": "prod_oil_01"
      }
    ],
    "subtotal": 1198,
    "discount": 0,
    "shipping": 0,
    "total": 1198,
    "paymentMethod": "UPI / Online Payment",
    "payment_method": "UPI / Online Payment",
    "paymentStatus": "paid",
    "payment_status": "paid",
    "status": "placed",
    "cancellationDetails": null,
    "cancellation_details": null,
    "createdAt": "2026-10-09T07:29:07.056Z",
    "created_at": "2026-10-09T07:29:07.056Z"
  },
  {
    "id": "ord_1791542045345",
    "orderNumber": "NH-ON-1010",
    "order_number": "NH-ON-1010",
    "channel": "online",
    "customer": {
      "city": "Madurai",
      "name": "Smt. Meenakshi Sundaram",
      "email": "meenakshi@example.com",
      "phone": "+91 90928 55565",
      "state": "Tamil Nadu",
      "address": "Plot No-51, Thiyagi Kandhan Servai Nagar",
      "pincode": "625003"
    },
    "items": [
      {
        "qty": 1,
        "name": "Herbal Hair Oil",
        "size": "200ml",
        "price": 449,
        "productId": "prod_oil_01"
      }
    ],
    "subtotal": 449,
    "discount": 0,
    "shipping": 70,
    "total": 519,
    "paymentMethod": "Cash on Delivery (COD)",
    "payment_method": "Cash on Delivery (COD)",
    "paymentStatus": "pending",
    "payment_status": "pending",
    "status": "placed",
    "cancellationDetails": null,
    "cancellation_details": null,
    "createdAt": "2026-10-09T10:34:05.320Z",
    "created_at": "2026-10-09T10:34:05.320Z"
  },
  {
    "id": "ord_1791542311317",
    "orderNumber": "NH-ON-1011",
    "order_number": "NH-ON-1011",
    "channel": "online",
    "customer": {
      "city": "Madurai",
      "email": "test@nachiyarherbals.com",
      "phone": "9876543210",
      "state": "Tamil Nadu",
      "country": "India",
      "fullName": "Test Customer upi",
      "postalCode": "625003",
      "addressLine1": "Plot 51, Thiyagi Kandhan Servai Nagar"
    },
    "items": [
      {
        "id": "prod_oil_01",
        "name": "Nachiyar Herbal Hair Oil (200ml)",
        "image": "/images/products/hair-oil.png",
        "price": 499,
        "quantity": 1,
        "productId": "prod_oil_01"
      }
    ],
    "subtotal": 499,
    "discount": 0,
    "shipping": 50,
    "total": 549,
    "paymentMethod": "upi",
    "payment_method": "upi",
    "paymentStatus": "paid",
    "payment_status": "paid",
    "status": "placed",
    "cancellationDetails": null,
    "cancellation_details": null,
    "createdAt": "2026-10-09T10:38:31.297Z",
    "created_at": "2026-10-09T10:38:31.297Z"
  },
  {
    "id": "ord_1791542311343",
    "orderNumber": "NH-ON-1012",
    "order_number": "NH-ON-1012",
    "channel": "online",
    "customer": {
      "city": "Madurai",
      "email": "test@nachiyarherbals.com",
      "phone": "9876543210",
      "state": "Tamil Nadu",
      "country": "India",
      "fullName": "Test Customer card",
      "postalCode": "625003",
      "addressLine1": "Plot 51, Thiyagi Kandhan Servai Nagar"
    },
    "items": [
      {
        "id": "prod_oil_01",
        "name": "Nachiyar Herbal Hair Oil (200ml)",
        "image": "/images/products/hair-oil.png",
        "price": 499,
        "quantity": 1,
        "productId": "prod_oil_01"
      }
    ],
    "subtotal": 499,
    "discount": 0,
    "shipping": 50,
    "total": 549,
    "paymentMethod": "Card (Visa)",
    "payment_method": "Card (Visa)",
    "paymentStatus": "paid",
    "payment_status": "paid",
    "status": "placed",
    "cancellationDetails": null,
    "cancellation_details": null,
    "createdAt": "2026-10-09T10:38:31.341Z",
    "created_at": "2026-10-09T10:38:31.341Z"
  },
  {
    "id": "ord_1791542311358",
    "orderNumber": "NH-ON-1013",
    "order_number": "NH-ON-1013",
    "channel": "online",
    "customer": {
      "city": "Madurai",
      "email": "test@nachiyarherbals.com",
      "phone": "9876543210",
      "state": "Tamil Nadu",
      "country": "India",
      "fullName": "Test Customer netbanking",
      "postalCode": "625003",
      "addressLine1": "Plot 51, Thiyagi Kandhan Servai Nagar"
    },
    "items": [
      {
        "id": "prod_oil_01",
        "name": "Nachiyar Herbal Hair Oil (200ml)",
        "image": "/images/products/hair-oil.png",
        "price": 499,
        "quantity": 1,
        "productId": "prod_oil_01"
      }
    ],
    "subtotal": 499,
    "discount": 0,
    "shipping": 50,
    "total": 549,
    "paymentMethod": "Net Banking (HDFC Bank)",
    "payment_method": "Net Banking (HDFC Bank)",
    "paymentStatus": "paid",
    "payment_status": "paid",
    "status": "placed",
    "cancellationDetails": null,
    "cancellation_details": null,
    "createdAt": "2026-10-09T10:38:31.356Z",
    "created_at": "2026-10-09T10:38:31.356Z"
  },
  {
    "id": "ord_1791542389986",
    "orderNumber": "NH-ON-1014",
    "order_number": "NH-ON-1014",
    "channel": "online",
    "customer": {
      "city": "Madurai",
      "name": "Priya Sharma",
      "email": "priya@example.com",
      "phone": "9840123456",
      "state": "Tamil Nadu",
      "address": "14, Cross Street, KK Nagar",
      "pincode": "625020"
    },
    "items": [
      {
        "img": "/images/products/hair-oil.png",
        "qty": 1,
        "name": "Nachiyar Herbal Hair Oil (200ml)",
        "size": "200ml",
        "price": 499,
        "productId": "prod_oil_01"
      }
    ],
    "subtotal": 499,
    "discount": 0,
    "shipping": 70,
    "total": 569,
    "paymentMethod": "Cash on Delivery (COD)",
    "payment_method": "Cash on Delivery (COD)",
    "paymentStatus": "pending",
    "payment_status": "pending",
    "status": "placed",
    "cancellationDetails": null,
    "cancellation_details": null,
    "createdAt": "2026-10-09T10:39:49.967Z",
    "created_at": "2026-10-09T10:39:49.967Z"
  },
  {
    "id": "ord_1791785714749",
    "orderNumber": "NH-ON-1015",
    "order_number": "NH-ON-1015",
    "channel": "online",
    "customer": {
      "city": "Madurai",
      "name": "Muralitharan T S",
      "email": "muraliii@gmail.com",
      "phone": "+918056713589",
      "state": "TamilNadu",
      "address": "Madurai , Tamil Nadu",
      "pincode": "625005"
    },
    "items": [
      {
        "img": "assets/new-oil-bottle-card.jpg",
        "qty": 3,
        "name": "Herbal Hair Oil",
        "size": "100ml Travel Edition",
        "price": 349,
        "productId": "prod_oil_01"
      }
    ],
    "subtotal": 1047,
    "discount": 0,
    "shipping": 0,
    "total": 1047,
    "paymentMethod": "UPI (Google Pay)",
    "payment_method": "UPI (Google Pay)",
    "paymentStatus": "paid",
    "payment_status": "paid",
    "status": "placed",
    "cancellationDetails": null,
    "cancellation_details": null,
    "createdAt": "2026-10-12T06:15:14.738Z",
    "created_at": "2026-10-12T06:15:14.738Z"
  },
  {
    "id": "ord_1791787706237",
    "orderNumber": "NH-ON-1016",
    "order_number": "NH-ON-1016",
    "channel": "online",
    "customer": {
      "city": "Madurai",
      "name": "Bharathi Kumar",
      "email": "Bharathi@gmail.com",
      "phone": "0987654321",
      "state": "TamilNadu",
      "address": "Madurai , Tamil Nadu",
      "pincode": "625005"
    },
    "items": [
      {
        "img": "assets/new-oil-bottle-card.jpg",
        "qty": 2,
        "name": "Herbal Hair Oil",
        "size": "100ml Travel Edition",
        "price": 349,
        "productId": "prod_oil_01"
      }
    ],
    "subtotal": 698,
    "discount": 0,
    "shipping": 0,
    "total": 698,
    "paymentMethod": "Cash on Delivery (COD)",
    "payment_method": "Cash on Delivery (COD)",
    "paymentStatus": "pending",
    "payment_status": "pending",
    "status": "cancelled",
    "cancellationDetails": null,
    "cancellation_details": null,
    "createdAt": "2026-10-12T06:48:26.221Z",
    "created_at": "2026-10-12T06:48:26.221Z"
  },
  {
    "id": "ord_1791803556120",
    "orderNumber": "NH-ON-1018",
    "order_number": "NH-ON-1018",
    "channel": "online",
    "customer": {
      "city": "Madurai",
      "name": "Bharathi Kumar",
      "email": "Bharathi@gmail.com",
      "phone": "0987654321",
      "state": "TamilNadu",
      "address": "Madurai , Tamil Nadu",
      "pincode": "625005"
    },
    "items": [
      {
        "img": "assets/new-oil-bottle-card.jpg",
        "qty": 1,
        "name": "Herbal Hair Oil",
        "size": "100ml Travel Edition",
        "price": 349,
        "productId": "prod_oil_01"
      }
    ],
    "subtotal": 349,
    "discount": 0,
    "shipping": 70,
    "total": 419,
    "paymentMethod": "UPI (Google Pay)",
    "payment_method": "UPI (Google Pay)",
    "paymentStatus": "paid",
    "payment_status": "paid",
    "status": "cancelled",
    "cancellationDetails": null,
    "cancellation_details": null,
    "createdAt": "2026-10-12T11:12:36.108Z",
    "created_at": "2026-10-12T11:12:36.108Z"
  },
  {
    "id": "ord_1791802982105",
    "orderNumber": "NH-ON-1017",
    "order_number": "NH-ON-1017",
    "channel": "online",
    "customer": {
      "city": "Madurai",
      "name": "Muralitharan T S",
      "email": "muraliii@gmail.com",
      "phone": "+918056713589",
      "state": "TamilNadu",
      "address": "Madurai , Tamil Nadu",
      "pincode": "625005"
    },
    "items": [
      {
        "img": "assets/new-oil-bottle-card.jpg",
        "qty": 1,
        "name": "Herbal Hair Oil",
        "size": "200ml",
        "price": 599,
        "productId": "prod_oil_01"
      }
    ],
    "subtotal": 599,
    "discount": 0,
    "shipping": 0,
    "total": 599,
    "paymentMethod": "UPI (Google Pay)",
    "payment_method": "UPI (Google Pay)",
    "paymentStatus": "paid",
    "payment_status": "paid",
    "status": "shipped",
    "cancellationDetails": null,
    "cancellation_details": null,
    "createdAt": "2026-10-12T11:03:02.092Z",
    "created_at": "2026-10-12T11:03:02.092Z"
  },
  {
    "id": "ord_1791889064880",
    "orderNumber": "NH-ON-1019",
    "order_number": "NH-ON-1019",
    "channel": "online",
    "customer": {
      "city": "Madurai",
      "name": "Bharathi Kumar",
      "email": "Bharathi@gmail.com",
      "phone": "9876543456",
      "state": "TamilNadu",
      "address": "Madurai , Tamil Nadu",
      "pincode": "625005"
    },
    "items": [
      {
        "img": "assets/new-oil-bottle-card.jpg",
        "qty": 18,
        "name": "Herbal Hair Oil",
        "size": "200ml",
        "price": 299,
        "productId": "prod_oil_01"
      },
      {
        "img": "assets/new-shampoo-bottle-card.jpg",
        "qty": 9,
        "name": "Hibiscus Flower Shampoo",
        "size": "250ml",
        "price": 249,
        "productId": "prod_shampoo_02"
      },
      {
        "img": "assets/new-oil-bottle-card.jpg",
        "qty": 1,
        "name": "Herbal Hair Oil",
        "size": "200ml Glass Dropper Bottle",
        "price": 299,
        "productId": "prod_oil_01"
      },
      {
        "img": "assets/duo-ritual-new.jpg",
        "qty": 1,
        "name": "The Royal Hair Ritual (Duo Set)",
        "size": "Oil (200ml) + Shampoo (250ml) + Silk Travel Pouch",
        "price": 999,
        "productId": "prod_duo_03"
      }
    ],
    "subtotal": 8921,
    "discount": 0,
    "shipping": 0,
    "total": 8921,
    "paymentMethod": "UPI (Google Pay)",
    "payment_method": "UPI (Google Pay)",
    "paymentStatus": "refunded",
    "payment_status": "refunded",
    "status": "cancelled",
    "cancellationDetails": {
      "reason": "Order created by mistake / Placed duplicate order",
      "status": "approved",
      "comments": "",
      "refundUtr": "REF-89204467",
      "approvedAt": "2026-10-13T11:00:06.512Z",
      "refundMode": "UPI (Google Pay)",
      "refundNotes": "Full refund initiated to customer account",
      "requestedAt": "2026-10-13T10:59:54.503Z",
      "refundAmount": 8921,
      "refundPreference": "original_source"
    },
    "cancellation_details": {
      "reason": "Order created by mistake / Placed duplicate order",
      "status": "approved",
      "comments": "",
      "refundUtr": "REF-89204467",
      "approvedAt": "2026-10-13T11:00:06.512Z",
      "refundMode": "UPI (Google Pay)",
      "refundNotes": "Full refund initiated to customer account",
      "requestedAt": "2026-10-13T10:59:54.503Z",
      "refundAmount": 8921,
      "refundPreference": "original_source"
    },
    "createdAt": "2026-10-13T10:57:44.859Z",
    "created_at": "2026-10-13T10:57:44.859Z"
  },
  {
    "id": "ord_1792153425809",
    "orderNumber": "NH-ON-1020",
    "order_number": "NH-ON-1020",
    "channel": "online",
    "customer": {
      "city": "Madurai",
      "name": "Muralitharan T S",
      "email": "muraliii@gmail.com",
      "phone": "8056713589",
      "state": "TamilNadu",
      "address": "Madurai , Tamil Nadu",
      "pincode": "625005"
    },
    "items": [
      {
        "img": "assets/new-oil-bottle-card.jpg",
        "qty": 1,
        "name": "Herbal Hair Oil",
        "size": "200ml",
        "price": 299,
        "productId": "prod_oil_01"
      }
    ],
    "subtotal": 299,
    "discount": 0,
    "shipping": 70,
    "total": 369,
    "paymentMethod": "UPI (Google Pay)",
    "payment_method": "UPI (Google Pay)",
    "paymentStatus": "paid",
    "payment_status": "paid",
    "status": "placed",
    "cancellationDetails": null,
    "cancellation_details": null,
    "createdAt": "2026-10-16T12:23:45.798Z",
    "created_at": "2026-10-16T12:23:45.798Z"
  }
];
  const SEED_INVOICES = [
  {
    "id": "inv_2001",
    "invoiceNumber": "NH-INV-2026-001",
    "invoice_number": "NH-INV-2026-001",
    "channel": "offline",
    "customer": {
      "name": "Smt. Meenakshi Sundaram",
      "email": "meenakshi.s@gmail.com",
      "gstin": "",
      "phone": "+91 94440 11223",
      "address": "Store Walk-in, T. Nagar Retail Counter, Chennai"
    },
    "items": [
      {
        "qty": 2,
        "name": "Herbal Hair Oil (200ml)",
        "price": 599,
        "subtotal": 1198,
        "productId": "prod_oil_01"
      },
      {
        "qty": 1,
        "name": "Hibiscus Flower Shampoo (250ml)",
        "price": 549,
        "subtotal": 549,
        "productId": "prod_shampoo_02"
      }
    ],
    "subtotal": 1747,
    "discount": 150,
    "tax": 80,
    "total": 1677,
    "paymentStatus": "paid",
    "payment_status": "paid",
    "paymentMode": "UPI (Store QR)",
    "payment_mode": "UPI (Store QR)",
    "notes": "Direct walk-in purchase at Chennai boutique counter",
    "createdBy": "Karthik R. (Billing Manager)",
    "created_by": "Karthik R. (Billing Manager)",
    "createdAt": "2026-10-05T16:20:00.000Z",
    "created_at": "2026-10-05T16:20:00.000Z"
  },
  {
    "id": "inv_2002",
    "invoiceNumber": "NH-INV-2026-002",
    "invoice_number": "NH-INV-2026-002",
    "channel": "offline",
    "customer": {
      "name": "Dr. Radhika Krishnan",
      "email": "dr.radhika@ayurclinic.in",
      "gstin": "33AAACH1234F1Z8",
      "phone": "+91 98840 55443",
      "address": "Ayur Wellness Centre, Coimbatore"
    },
    "items": [
      {
        "qty": 5,
        "name": "Herbal Hair Oil (200ml)",
        "price": 599,
        "subtotal": 2995,
        "productId": "prod_oil_01"
      },
      {
        "qty": 5,
        "name": "Hibiscus Flower Shampoo (250ml)",
        "price": 549,
        "subtotal": 2745,
        "productId": "prod_shampoo_02"
      }
    ],
    "subtotal": 5740,
    "discount": 574,
    "tax": 258,
    "total": 5424,
    "paymentStatus": "paid",
    "payment_status": "paid",
    "paymentMode": "Card / POS Terminal",
    "payment_mode": "Card / POS Terminal",
    "notes": "B2B Clinic clinic order - Bulk discount applied",
    "createdBy": "Super Admin",
    "created_by": "Super Admin",
    "createdAt": "2026-10-07T12:00:00.000Z",
    "created_at": "2026-10-07T12:00:00.000Z"
  },
  {
    "id": "inv_1791387291515",
    "invoiceNumber": "NH-INV-2026-003",
    "invoice_number": "NH-INV-2026-003",
    "channel": "offline",
    "customer": {
      "name": "Test Walk-in",
      "phone": "9999999999"
    },
    "items": [
      {
        "qty": 2,
        "name": "Herbal Hair Oil",
        "price": 599,
        "subtotal": 1198,
        "productId": "prod_oil_01"
      }
    ],
    "subtotal": 1198,
    "discount": 0,
    "tax": 60,
    "total": 1258,
    "paymentStatus": "paid",
    "payment_status": "paid",
    "paymentMode": "Cash",
    "payment_mode": "Cash",
    "notes": "In-store retail billing",
    "createdBy": "Sales Staff",
    "created_by": "Sales Staff",
    "createdAt": "2026-10-07T15:34:51.515Z",
    "created_at": "2026-10-07T15:34:51.515Z"
  },
  {
    "id": "inv_1791791112349",
    "invoiceNumber": "NH-INV-2026-004",
    "invoice_number": "NH-INV-2026-004",
    "channel": "offline",
    "customer": {
      "name": "Dr. Meenakshi Sundaram",
      "email": "meenakshi@example.com",
      "gstin": "",
      "phone": "9840123456",
      "address": "74, West Tower Street, Madurai"
    },
    "items": [
      {
        "qty": 1,
        "name": "Herbal Hair Oil",
        "price": 599,
        "subtotal": 599,
        "productId": "prod_oil_01"
      }
    ],
    "subtotal": 599,
    "discount": 50,
    "tax": 27,
    "total": 576,
    "paymentStatus": "paid",
    "payment_status": "paid",
    "paymentMode": "UPI (Store QR - Confirmed)",
    "payment_mode": "UPI (Store QR - Confirmed)",
    "notes": "Counter POS Tax Invoice • UPI",
    "createdBy": "Super Administrator (SUPER ADMIN)",
    "created_by": "Super Administrator (SUPER ADMIN)",
    "createdAt": "2026-10-12T07:45:12.339Z",
    "created_at": "2026-10-12T07:45:12.339Z"
  },
  {
    "id": "inv_1791791184468",
    "invoiceNumber": "NH-INV-2026-005",
    "invoice_number": "NH-INV-2026-005",
    "channel": "offline",
    "customer": {
      "name": "Bharathi Kumar",
      "email": "Bharathi@gmail.com",
      "gstin": "",
      "phone": "09876543212",
      "address": "Madurai , Tamil Nadu"
    },
    "items": [
      {
        "qty": 1,
        "name": "Herbal Hair Oil",
        "price": 599,
        "subtotal": 599,
        "productId": "prod_oil_01"
      },
      {
        "qty": 1,
        "name": "Hibiscus Flower Shampoo",
        "price": 549,
        "subtotal": 549,
        "productId": "prod_shampoo_02"
      }
    ],
    "subtotal": 1148,
    "discount": 0,
    "tax": 57,
    "total": 1205,
    "paymentStatus": "paid",
    "payment_status": "paid",
    "paymentMode": "Cash Tendered ₹1210",
    "payment_mode": "Cash Tendered ₹1210",
    "notes": "Counter POS Tax Invoice • Cash Tendered ₹1210",
    "createdBy": "Super Administrator (SUPER ADMIN)",
    "created_by": "Super Administrator (SUPER ADMIN)",
    "createdAt": "2026-10-12T07:46:24.454Z",
    "created_at": "2026-10-12T07:46:24.454Z"
  }
];
  const SEED_REVIEWS = [
  {
    "id": "rev_06",
    "name": "Karthikeyan V",
    "email": "karthik.v@example.com",
    "productName": "Herbal Hair Oil",
    "product_name": "Herbal Hair Oil",
    "rating": 5,
    "title": "Scalp itching completely vanished",
    "comment": "Started using after a friend recommended it. In just five uses, dandruff flakes and dry scalp irritation completely vanished.",
    "status": "pending",
    "createdAt": "2026-10-08T11:30:53.476Z",
    "created_at": "2026-10-08T11:30:53.476Z",
    "updatedAt": "2026-10-08T13:30:53.476Z",
    "updated_at": "2026-10-08T13:30:53.476Z"
  },
  {
    "id": "rev_07",
    "name": "Divya Ramesh",
    "email": "divya.r@example.com",
    "productName": "Hibiscus Flower Shampoo",
    "product_name": "Hibiscus Flower Shampoo",
    "rating": 4,
    "title": "Very mild lather and pleasant aroma",
    "comment": "Very gentle on color-treated hair. Subtle botanical fragrance lasts throughout the day.",
    "status": "pending",
    "createdAt": "2026-10-08T08:30:53.476Z",
    "created_at": "2026-10-08T08:30:53.476Z",
    "updatedAt": "2026-10-08T13:30:53.476Z",
    "updated_at": "2026-10-08T13:30:53.476Z"
  },
  {
    "id": "rev_01",
    "name": "Pooja Madhavan",
    "email": "pooja.m@example.com",
    "productName": "Herbal Hair Oil",
    "product_name": "Herbal Hair Oil",
    "rating": 5,
    "title": "Monsoon hair fall stopped completely",
    "comment": "The authentic lavender aroma and 18-herb Ayurvedic infusion restored my hair density within 3 weeks. Absolutely crown-worthy!",
    "status": "rejected",
    "createdAt": "2026-10-05T13:30:53.476Z",
    "created_at": "2026-10-05T13:30:53.476Z",
    "updatedAt": "2026-10-09T06:58:51.339Z",
    "updated_at": "2026-10-09T06:58:51.339Z"
  },
  {
    "id": "rev_02",
    "name": "Dr. Radhika Krishnan",
    "email": "radhika.k@example.com",
    "productName": "The Royal Hair Ritual (Duo Set)",
    "product_name": "The Royal Hair Ritual (Duo Set)",
    "rating": 5,
    "title": "Dermatologist verified clean care",
    "comment": "As a clinician, I truly appreciate the pure solar steeping without sulfates or mineral oil. Noticeable improvement in strand resilience and shine.",
    "status": "rejected",
    "createdAt": "2026-10-03T13:30:53.476Z",
    "created_at": "2026-10-03T13:30:53.476Z",
    "updatedAt": "2026-10-09T06:58:52.975Z",
    "updated_at": "2026-10-09T06:58:52.975Z"
  },
  {
    "id": "rev_05",
    "name": "Kavitha Sundar",
    "email": "kavitha.test@example.com",
    "productName": "The Royal Hair Ritual (Duo Set)",
    "product_name": "The Royal Hair Ritual (Duo Set)",
    "rating": 5,
    "title": "Transformed dry frizzy hair",
    "comment": "The ritual combo worked wonders on my rough ends. Both formulations complement each other flawlessly. Will repurchase forever!",
    "status": "approved",
    "createdAt": "2026-09-26T13:30:53.476Z",
    "created_at": "2026-09-26T13:30:53.476Z",
    "updatedAt": "2026-10-09T06:59:06.475Z",
    "updated_at": "2026-10-09T06:59:06.475Z"
  },
  {
    "id": "rev_04",
    "name": "Smt. Meenakshi Sundaram",
    "email": "meenakshi@example.com",
    "productName": "Herbal Hair Oil",
    "product_name": "Herbal Hair Oil",
    "rating": 5,
    "title": "Traditional apothecary at its finest",
    "comment": "Sacred South Indian herbal wisdom in a modern glass dropper. Absorbs smoothly overnight with zero greasy residue on pillows.",
    "status": "approved",
    "createdAt": "2026-09-28T13:30:53.476Z",
    "created_at": "2026-09-28T13:30:53.476Z",
    "updatedAt": "2026-10-09T06:59:07.618Z",
    "updated_at": "2026-10-09T06:59:07.618Z"
  },
  {
    "id": "rev_03",
    "name": "Ananya Sharma",
    "email": "ananya.s@example.com",
    "productName": "Hibiscus Flower Shampoo",
    "product_name": "Hibiscus Flower Shampoo",
    "rating": 5,
    "title": "Gentle on scalp, incredible natural gloss",
    "comment": "A genuine sulfate-free cleanser that purifies without stripping moisture. The fresh hibiscus petal infusion leaves hair silky and light.",
    "status": "approved",
    "createdAt": "2026-10-01T13:30:53.476Z",
    "created_at": "2026-10-01T13:30:53.476Z",
    "updatedAt": "2026-10-09T06:59:08.685Z",
    "updated_at": "2026-10-09T06:59:08.685Z"
  },
  {
    "id": "rev_1791529220342_947",
    "name": "Bharathi",
    "email": "bharathii@gmail.com",
    "productName": "Hibiscus Flower Shampoo",
    "product_name": "Hibiscus Flower Shampoo",
    "rating": 5,
    "title": "Nachiyar Hair oil",
    "comment": "This product is very good",
    "status": "approved",
    "createdAt": "2026-10-09T07:00:20.561Z",
    "created_at": "2026-10-09T07:00:20.561Z",
    "updatedAt": "2026-10-09T07:00:33.226Z",
    "updated_at": "2026-10-09T07:00:33.226Z"
  },
  {
    "id": "rev_1791530796570_446",
    "name": "guru",
    "email": "gv@gmail.com",
    "productName": "Hibiscus Flower Shampoo",
    "product_name": "Hibiscus Flower Shampoo",
    "rating": 5,
    "title": "good",
    "comment": "rtvnievciun3f giqernvq",
    "status": "pending",
    "createdAt": "2026-10-09T07:26:36.668Z",
    "created_at": "2026-10-09T07:26:36.668Z",
    "updatedAt": "2026-10-09T07:26:36.668Z",
    "updated_at": "2026-10-09T07:26:36.668Z"
  },
  {
    "id": "rev_1791867410573_887",
    "name": "Bharathi Kumar",
    "email": "bharthikumar@gmail.com",
    "productName": "The Royal Hair Ritual (Duo Set)",
    "product_name": "The Royal Hair Ritual (Duo Set)",
    "rating": 4,
    "title": "Nachiyar herblas Sampo",
    "comment": "This sampo is very good product and perfect to daily using",
    "status": "approved",
    "createdAt": "2026-10-13T04:56:50.659Z",
    "created_at": "2026-10-13T04:56:50.659Z",
    "updatedAt": "2026-10-13T04:57:07.553Z",
    "updated_at": "2026-10-13T04:57:07.553Z"
  }
];
  const SEED_MESSAGES = [
  {
    "id": "msg_1791810786159_i8obk",
    "name": "Priya Raman",
    "email": "priya.test@example.com",
    "phone": "9876543210",
    "subject": "Hair Care Consultation",
    "message": "Hello, I have dry scalp and hair fall issues. Can you recommend the best oil or shampoo ritual for me?",
    "status": "unread",
    "adminNotes": "",
    "admin_notes": "",
    "createdAt": "2026-10-12T13:13:06.345Z",
    "created_at": "2026-10-12T13:13:06.345Z"
  },
  {
    "id": "msg_1791811357832_vivu1",
    "name": "Ananya Sharma",
    "email": "ananya@example.com",
    "phone": "9840123456",
    "subject": "Hair Care Consultation",
    "message": "Hello! I want to know if Nachiyar Hair Oil helps with hair regrowth?",
    "status": "unread",
    "adminNotes": "",
    "admin_notes": "",
    "createdAt": "2026-10-12T13:22:37.874Z",
    "created_at": "2026-10-12T13:22:37.874Z"
  },
  {
    "id": "msg_1791811782679_trnby",
    "name": "Kavitha S.",
    "email": "kavitha.s@gmail.com",
    "phone": "9443219876",
    "subject": "Wholesale & Clinic Inquiry",
    "message": "We run an Ayurvedic wellness salon in Coimbatore and want to order 50 bottles of Royal Hair Oil.",
    "status": "resolved",
    "adminNotes": "",
    "admin_notes": "",
    "createdAt": "2026-10-12T13:29:42.732Z",
    "created_at": "2026-10-12T13:29:42.732Z"
  },
  {
    "id": "msg_1792126976099_da92o",
    "name": "Murali",
    "email": "mv03092005@gmail.com",
    "phone": "87654345678",
    "subject": "Hair Care Consultation",
    "message": "hiii",
    "status": "read",
    "adminNotes": "",
    "admin_notes": "",
    "createdAt": "2026-10-16T05:02:56.170Z",
    "created_at": "2026-10-16T05:02:56.170Z"
  }
];
  const SEED_CUSTOMERS = [
  {
    "id": "cust_01",
    "name": "Pooja Madhavan",
    "email": "pooja.m@example.com",
    "phone": "+91 98401 23456",
    "password": "pooja123",
    "address": "42, Besant Avenue, Adyar",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "pincode": "600020",
    "createdAt": "2026-10-08T12:21:27.436Z"
  },
  {
    "id": "cust_02",
    "name": "Ananya Sharma",
    "email": "ananya.s@example.com",
    "phone": "+91 98200 98765",
    "password": "ananya123",
    "address": "Flat 804, Oberoi Springs, Andheri West",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400053",
    "createdAt": "2026-10-08T12:21:27.436Z"
  },
  {
    "id": "cust_1791462660594_571",
    "name": "Kavitha Sundar",
    "email": "kavitha.test@example.com",
    "phone": "+91 94440 12345",
    "password": "password123",
    "address": "15 Temple Tower, Anna Nagar",
    "city": "Madurai",
    "state": "Tamil Nadu",
    "pincode": "625020",
    "createdAt": "2026-10-08T12:31:00.595Z"
  },
  {
    "id": "cust_1791462770166_200",
    "name": "Murali",
    "email": "muralii@gmail.com",
    "phone": "9876543212",
    "password": "Murali1234",
    "address": "78,Ramakrishna colony, kaithari nagar,madurai - 625005",
    "city": "Madurai",
    "state": "Tamil Nadu",
    "pincode": "625005",
    "createdAt": "2026-10-08T12:32:50.168Z"
  },
  {
    "id": "cust_1791956996322_521",
    "name": "BharathiKumar",
    "email": "bharathi123@gmail.com",
    "phone": "7895456321",
    "password": "1234567890",
    "address": "Madurai , Tamil Nadu",
    "city": "Madurai",
    "state": "Tamil Nadu",
    "pincode": "625005",
    "createdAt": "2026-10-14T05:49:56.332Z"
  },
  {
    "id": "cust_1791965780431_863",
    "name": "user",
    "email": "user@gmail.com",
    "phone": "9876543212",
    "password": "1234567890",
    "address": "Madurai , Tamil Nadu",
    "city": "Madurai",
    "state": "Tamil Nadu",
    "pincode": "625005",
    "createdAt": "2026-10-14T08:16:20.434Z"
  },
  {
    "id": "cust_1791785650835_293",
    "name": "Bharathi",
    "email": "bharathi@gmail.com",
    "phone": "9876543212",
    "password": "Bharathi@123",
    "address": "Bharathi@123",
    "city": "Madurai",
    "state": "Tamil Nadu",
    "pincode": "625005",
    "createdAt": "2026-10-12T06:14:10.841Z"
  },
  {
    "id": "cust_g_1792067448777_37",
    "name": "Priya Google Test",
    "email": "testgoogle_1792067448772@gmail.com",
    "phone": "",
    "password": "GOOGLE_AUTH_a83fe0c1e5a92210",
    "address": "",
    "city": "",
    "state": "Tamil Nadu",
    "pincode": "",
    "createdAt": "2026-10-15T12:30:48.782Z"
  },
  {
    "id": "firebase_verified_test_123",
    "name": "Nachiyar Verified User",
    "email": "firebase_verified_user@gmail.com",
    "phone": "",
    "password": "FIREBASE_AUTH_a1a60de4d1eacf84",
    "address": "",
    "city": "",
    "state": "Tamil Nadu",
    "pincode": "",
    "createdAt": "2026-10-15T13:36:22.420Z"
  },
  {
    "id": "cust_1792144272190_591",
    "name": "Vimal",
    "email": "vimal123@gmail.com",
    "phone": "0987654321",
    "password": "1234567890",
    "address": "245/09",
    "city": "Vadapalanji",
    "state": "Tamil Nadu",
    "pincode": "60020",
    "createdAt": "2026-10-16T09:51:12.192Z"
  },
  {
    "id": "cust_1792144568571_508",
    "name": "Surya",
    "email": "surya123@gmail.com",
    "phone": "0987654321",
    "password": "1234567890",
    "address": "245/07",
    "city": "Madurai",
    "state": "Tamil Nadu",
    "pincode": "600020",
    "createdAt": "2026-10-16T09:56:08.572Z"
  },
  {
    "id": "cust_1792144797154_601",
    "name": "Dhanush",
    "email": "d04494513@gmail.com",
    "phone": "0987654321",
    "password": "1234567890",
    "address": "72/1",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "pincode": "600020",
    "createdAt": "2026-10-16T09:59:57.156Z"
  }
];
  const SEED_ADMINS = [
  {
    "id": "user_admin_01",
    "username": "admin",
    "name": "Administrator",
    "role": "super_admin",
    "permissions": [
      "all"
    ],
    "email": "admin@nachiyarherbals.com",
    "password": "admin123",
    "phone": "9876543210"
  }
];
  const SEED_SETTINGS = {
  "gstin": "33AAACH9876K1Z2",
  "brandName": "Nachiyar Herbals & Cosmetics",
  "couponCode": "NACHIYAR25",
  "couponActive": false,
  "storeAddress": "Nachiyar Botanical Heritage, No. 18 Temple Ring Road, Madurai, Tamil Nadu - 625001",
  "storeTimings": "Mon - Sat: 9:30 AM - 8:30 PM",
  "supportEmail": "care@nachiyarherbals.com",
  "supportPhone": "+91 94440 88990",
  "couponTagline": "Surprise Royal Privilege Voucher",
  "paymentMethods": {
    "cod": {
      "label": "Cash on Delivery (COD)",
      "enabled": false,
      "description": "Pay cash to courier executive upon delivery"
    },
    "upi": {
      "label": "UPI (Google Pay, PhonePe, Paytm, BHIM)",
      "upiId": "nachiyarherbals18@okaxis",
      "enabled": true,
      "description": "Instant UPI payment with dynamic QR & VPA",
      "merchantName": "Nachiyar Herbals & Cosmetics"
    },
    "card": {
      "label": "Credit / Debit Card",
      "enabled": true,
      "description": "Visa, MasterCard, RuPay, Maestro"
    },
    "netbanking": {
      "label": "Net Banking",
      "enabled": true,
      "description": "All major Indian banks supported"
    }
  },
  "discountPercent": 25,
  "announcementText": "ROYAL BOTANICAL CARE ✦ FREE PAN-INDIA SHIPPING OVER ₹599 ✦ COLD-PRESSED IN SMALL BATCHES",
  "couponExpiryDate": "2026-10-13",
  "mysteryCouponCode": "NACHIYAR25",
  "mysteryDiscountPct": 15,
  "freeShippingThreshold": 599
};
  const SEED_INV_LOGS = [
  {
    "id": "log_01",
    "productId": "prod_oil_01",
    "productName": "Herbal Hair Oil",
    "channel": "offline",
    "reference": "NH-INV-2026-001",
    "change": -2,
    "prevStock": 92,
    "newStock": 90,
    "timestamp": "2026-10-05T16:20:00.000Z",
    "reason": "Offline Billing counter sale"
  },
  {
    "id": "log_02",
    "productId": "prod_oil_01",
    "productName": "Herbal Hair Oil",
    "channel": "online",
    "reference": "NH-ON-1001",
    "change": -1,
    "prevStock": 90,
    "newStock": 89,
    "timestamp": "2026-10-06T14:32:00.000Z",
    "reason": "Online Website checkout order"
  },
  {
    "id": "log_03",
    "productId": "prod_oil_01",
    "productName": "Herbal Hair Oil",
    "channel": "offline",
    "reference": "NH-INV-2026-002",
    "change": -5,
    "prevStock": 89,
    "newStock": 84,
    "timestamp": "2026-10-07T12:00:00.000Z",
    "reason": "Clinic B2B Wholesale Invoice"
  },
  {
    "id": "log_1791387291508_yw3p",
    "productId": "prod_oil_01",
    "productName": "Herbal Hair Oil",
    "channel": "offline",
    "reference": "NH-INV-2026-003",
    "change": -2,
    "prevStock": 85,
    "newStock": 83,
    "timestamp": "2026-10-07T15:34:51.513Z",
    "reason": "Offline Invoice / Store Sale to Test Walk-in"
  },
  {
    "id": "log_1791387291524_hre8",
    "productId": "prod_oil_01",
    "productName": "Herbal Hair Oil",
    "channel": "online",
    "reference": "NH-ON-1003",
    "change": -3,
    "prevStock": 83,
    "newStock": 80,
    "timestamp": "2026-10-07T15:34:51.524Z",
    "reason": "Online Customer Checkout (Test Online Customer)"
  },
  {
    "id": "log_1791457173732_hvq9",
    "productId": "prod_oil_01",
    "productName": "Herbal Hair Oil",
    "channel": "online",
    "reference": "NH-ON-1004",
    "change": -1,
    "prevStock": 80,
    "newStock": 79,
    "timestamp": "2026-10-08T10:59:33.685Z",
    "reason": "Online Customer Checkout (Bharathi p)"
  },
  {
    "id": "log_1791463836953_h7zn",
    "productId": "prod_oil_01",
    "productName": "Herbal Hair Oil",
    "channel": "online",
    "reference": "NH-ON-1008",
    "change": -1,
    "prevStock": 79,
    "newStock": 78,
    "timestamp": "2026-10-08T12:50:36.922Z",
    "reason": "Online Customer Checkout (Muralitharan T S)"
  },
  {
    "id": "log_1791463836956_gir9",
    "productId": "prod_oil_01",
    "productName": "Herbal Hair Oil",
    "channel": "online",
    "reference": "NH-ON-1008",
    "change": -1,
    "prevStock": 78,
    "newStock": 77,
    "timestamp": "2026-10-08T12:50:36.922Z",
    "reason": "Online Customer Checkout (Muralitharan T S)"
  },
  {
    "id": "log_1791530947076_slo8",
    "productId": "prod_oil_01",
    "productName": "Herbal Hair Oil",
    "channel": "online",
    "reference": "NH-ON-1009",
    "change": -2,
    "prevStock": 77,
    "newStock": 75,
    "timestamp": "2026-10-09T07:29:07.056Z",
    "reason": "Online Customer Checkout (guru vishwa)"
  },
  {
    "id": "log_1791542045365_xtbv",
    "productId": "prod_oil_01",
    "productName": "Herbal Hair Oil",
    "channel": "online",
    "reference": "NH-ON-1010",
    "change": -1,
    "prevStock": 75,
    "newStock": 74,
    "timestamp": "2026-10-09T10:34:05.320Z",
    "reason": "Online Customer Checkout (Smt. Meenakshi Sundaram)"
  },
  {
    "id": "log_1791542311319_lwg6",
    "productId": "prod_oil_01",
    "productName": "Herbal Hair Oil",
    "channel": "online",
    "reference": "NH-ON-1011",
    "change": -1,
    "prevStock": 74,
    "newStock": 73,
    "timestamp": "2026-10-09T10:38:31.297Z",
    "reason": "Online Customer Checkout (Test Customer upi)"
  },
  {
    "id": "log_1791542311345_zr0c",
    "productId": "prod_oil_01",
    "productName": "Herbal Hair Oil",
    "channel": "online",
    "reference": "NH-ON-1012",
    "change": -1,
    "prevStock": 73,
    "newStock": 72,
    "timestamp": "2026-10-09T10:38:31.341Z",
    "reason": "Online Customer Checkout (Test Customer card)"
  },
  {
    "id": "log_1791542311373_mjsw",
    "productId": "prod_oil_01",
    "productName": "Herbal Hair Oil",
    "channel": "online",
    "reference": "NH-ON-1013",
    "change": -1,
    "prevStock": 72,
    "newStock": 71,
    "timestamp": "2026-10-09T10:38:31.356Z",
    "reason": "Online Customer Checkout (Test Customer netbanking)"
  },
  {
    "id": "log_1791542389988_62w6",
    "productId": "prod_oil_01",
    "productName": "Herbal Hair Oil",
    "channel": "online",
    "reference": "NH-ON-1014",
    "change": -1,
    "prevStock": 71,
    "newStock": 70,
    "timestamp": "2026-10-09T10:39:49.967Z",
    "reason": "Online Customer Checkout (Priya Sharma)"
  },
  {
    "id": "log_1791785714760_l4nu",
    "productId": "prod_oil_01",
    "productName": "Herbal Hair Oil",
    "channel": "online",
    "reference": "NH-ON-1015",
    "change": -3,
    "prevStock": 70,
    "newStock": 67,
    "timestamp": "2026-10-12T06:15:14.738Z",
    "reason": "Online Customer Checkout (Muralitharan T S)"
  },
  {
    "id": "log_1791787706244_uccy",
    "productId": "prod_oil_01",
    "productName": "Herbal Hair Oil",
    "channel": "online",
    "reference": "NH-ON-1016",
    "change": -2,
    "prevStock": 67,
    "newStock": 65,
    "timestamp": "2026-10-12T06:48:26.221Z",
    "reason": "Online Customer Checkout (Bharathi Kumar)"
  },
  {
    "id": "log_1791791112368_9vfc",
    "productId": "prod_oil_01",
    "productName": "Herbal Hair Oil",
    "channel": "offline",
    "reference": "NH-INV-2026-004",
    "change": -1,
    "prevStock": 65,
    "newStock": 64,
    "timestamp": "2026-10-12T07:45:12.339Z",
    "reason": "Offline Invoice / Store Sale to Dr. Meenakshi Sundaram"
  },
  {
    "id": "log_1791791184471_q5u0",
    "productId": "prod_oil_01",
    "productName": "Herbal Hair Oil",
    "channel": "offline",
    "reference": "NH-INV-2026-005",
    "change": -1,
    "prevStock": 64,
    "newStock": 63,
    "timestamp": "2026-10-12T07:46:24.454Z",
    "reason": "Offline Invoice / Store Sale to Bharathi Kumar"
  },
  {
    "id": "log_1791791184475_ij0j",
    "productId": "prod_shampoo_02",
    "productName": "Hibiscus Flower Shampoo",
    "channel": "offline",
    "reference": "NH-INV-2026-005",
    "change": -1,
    "prevStock": 68,
    "newStock": 67,
    "timestamp": "2026-10-12T07:46:24.454Z",
    "reason": "Offline Invoice / Store Sale to Bharathi Kumar"
  },
  {
    "id": "log_1791802982114_eocv",
    "productId": "prod_oil_01",
    "productName": "Herbal Hair Oil",
    "channel": "online",
    "reference": "NH-ON-1017",
    "change": -1,
    "prevStock": 63,
    "newStock": 62,
    "timestamp": "2026-10-12T11:03:02.092Z",
    "reason": "Online Customer Checkout (Muralitharan T S)"
  },
  {
    "id": "log_1791803556123_ae6w",
    "productId": "prod_oil_01",
    "productName": "Herbal Hair Oil",
    "channel": "online",
    "reference": "NH-ON-1018",
    "change": -1,
    "prevStock": 62,
    "newStock": 61,
    "timestamp": "2026-10-12T11:12:36.108Z",
    "reason": "Online Customer Checkout (Bharathi Kumar)"
  },
  {
    "id": "log_1791803614103",
    "productId": "prod_oil_01",
    "productName": "Herbal Hair Oil",
    "channel": "manual",
    "reference": "Restock #NH-ON-1018",
    "change": 1,
    "prevStock": 61,
    "newStock": 62,
    "timestamp": "2026-10-12T11:13:34.108Z",
    "reason": "Order Cancelled by Customer (Auto Restock)"
  },
  {
    "id": "log_1791889064886_j322",
    "productId": "prod_oil_01",
    "productName": "Herbal Hair Oil",
    "channel": "online",
    "reference": "NH-ON-1019",
    "change": -18,
    "prevStock": 62,
    "newStock": 44,
    "timestamp": "2026-10-13T10:57:44.859Z",
    "reason": "Online Customer Checkout (Bharathi Kumar)"
  },
  {
    "id": "log_1791889064892_njyh",
    "productId": "prod_shampoo_02",
    "productName": "Hibiscus Flower Shampoo",
    "channel": "online",
    "reference": "NH-ON-1019",
    "change": -9,
    "prevStock": 67,
    "newStock": 58,
    "timestamp": "2026-10-13T10:57:44.859Z",
    "reason": "Online Customer Checkout (Bharathi Kumar)"
  },
  {
    "id": "log_1791889064894_izck",
    "productId": "prod_oil_01",
    "productName": "Herbal Hair Oil",
    "channel": "online",
    "reference": "NH-ON-1019",
    "change": -1,
    "prevStock": 44,
    "newStock": 43,
    "timestamp": "2026-10-13T10:57:44.859Z",
    "reason": "Online Customer Checkout (Bharathi Kumar)"
  },
  {
    "id": "log_1791889064896_tiev",
    "productId": "prod_duo_03",
    "productName": "The Royal Hair Ritual (Duo Set)",
    "channel": "online",
    "reference": "NH-ON-1019",
    "change": -1,
    "prevStock": 42,
    "newStock": 41,
    "timestamp": "2026-10-13T10:57:44.859Z",
    "reason": "Online Customer Checkout (Bharathi Kumar)"
  },
  {
    "id": "log_1791889206488_vr88",
    "productId": "prod_oil_01",
    "productName": "Herbal Hair Oil",
    "channel": "online",
    "reference": "NH-ON-1019",
    "change": 18,
    "prevStock": 43,
    "newStock": 61,
    "timestamp": "2026-10-13T11:00:06.475Z",
    "reason": "Order #NH-ON-1019 Cancellation Accepted & Restocked (+18)"
  },
  {
    "id": "log_1791889206505_dlop",
    "productId": "prod_shampoo_02",
    "productName": "Hibiscus Flower Shampoo",
    "channel": "online",
    "reference": "NH-ON-1019",
    "change": 9,
    "prevStock": 58,
    "newStock": 67,
    "timestamp": "2026-10-13T11:00:06.475Z",
    "reason": "Order #NH-ON-1019 Cancellation Accepted & Restocked (+9)"
  },
  {
    "id": "log_1791889206508_v6ig",
    "productId": "prod_oil_01",
    "productName": "Herbal Hair Oil",
    "channel": "online",
    "reference": "NH-ON-1019",
    "change": 1,
    "prevStock": 61,
    "newStock": 62,
    "timestamp": "2026-10-13T11:00:06.475Z",
    "reason": "Order #NH-ON-1019 Cancellation Accepted & Restocked (+1)"
  },
  {
    "id": "log_1791889206510_0eq4",
    "productId": "prod_duo_03",
    "productName": "The Royal Hair Ritual (Duo Set)",
    "channel": "online",
    "reference": "NH-ON-1019",
    "change": 1,
    "prevStock": 41,
    "newStock": 42,
    "timestamp": "2026-10-13T11:00:06.475Z",
    "reason": "Order #NH-ON-1019 Cancellation Accepted & Restocked (+1)"
  },
  {
    "id": "log_1792153425814_uxwj",
    "productId": "prod_oil_01",
    "productName": "Herbal Hair Oil",
    "channel": "online",
    "reference": "NH-ON-1020",
    "change": -1,
    "prevStock": 62,
    "newStock": 61,
    "timestamp": "2026-10-16T12:23:45.798Z",
    "reason": "Online Customer Checkout (Muralitharan T S)"
  }
];

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
    if (!localStorage.getItem(KEYS.PRODUCTS)) {
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
    // Auto-clean admins: keep only admin (id: admin, pass: admin123) and purge legacy accounts
    const existingAdmins = read(KEYS.ADMINS, SEED_ADMINS);
    const cleanedAdmins = existingAdmins.filter(a => {
      const u = (a.username || '').toLowerCase();
      return u !== 'nimda' && u !== 'murali' && u !== 'bharathi_07' && u !== 'nimda0987' && u !== 'inventory' && u !== 'billing';
    });
    if (!cleanedAdmins.some(a => (a.username || '').toLowerCase() === 'admin')) {
      cleanedAdmins.unshift(SEED_ADMINS[0]);
    }
    write(KEYS.ADMINS, cleanedAdmins);

    try {
      const rawLocal = localStorage.getItem('nachiyar_admin_accounts');
      if (rawLocal) {
        const parsedLocal = JSON.parse(rawLocal);
        const cleanedLocal = parsedLocal.filter(a => {
          const u = (a.username || '').toLowerCase();
          return u !== 'nimda' && u !== 'murali' && u !== 'bharathi_07' && u !== 'nimda0987' && u !== 'inventory' && u !== 'billing';
        });
        if (!cleanedLocal.some(a => (a.username || '').toLowerCase() === 'admin')) {
          cleanedLocal.unshift({
            id: 'admin_master',
            name: 'Super Nimda',
            username: 'admin',
            phone: '9876543210',
            email: 'admin@nachiyarherbals.com',
            role: 'super_admin',
            password: 'admin123',
            createdAt: '2026-10-15'
          });
        }
        localStorage.setItem('nachiyar_admin_accounts', JSON.stringify(cleanedLocal));
      }
    } catch (e) {}
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
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
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
      const idOrSlug = decodeURIComponent(pathname.replace('/api/products/', '').replace(/\/$/, '')).toLowerCase();
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
      const phone = (queryParams.get('phone') || '').replace(/\D/g, '').slice(-10);

      const orders = read(KEYS.ORDERS, SEED_ORDERS);
      const matches = orders.filter(o => {
        const c = o.customer || {};
        const cEmail = (c.email || '').trim().toLowerCase();
        const cPhone = (c.phone || '').replace(/\D/g, '').slice(-10);
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
      const msgId = pathname.replace('/api/messages/', '').replace(/\/$/, '');
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

      // Master admin credentials: id: admin, password: admin123
      if (!matched && idLower === 'admin' && password === 'admin123') {
        matched = {
          id: 'user_admin_01',
          username: 'admin',
          name: 'Administrator',
          role: 'super_admin',
          permissions: ['all']
        };
      }

      if (matched && (matched.password === password || (idLower === 'admin' && password === 'admin123'))) {
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

    if (pathname === '/api/auth/users' || pathname === '/api/auth/users/') {
      const admins = read(KEYS.ADMINS, SEED_ADMINS);
      return jsonResponse({ success: true, users: admins });
    }

    if (pathname.startsWith('/api/auth/users/')) {
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
      const channelsObj = {
        flipkart: { id: 1, name: 'Flipkart', feePercent: 12, themeColor: '#2874F0', active: true, sellerId: 'FK-NACHIYAR-101', activeListings: 3, orders: [] },
        amazon: { id: 2, name: 'Amazon', feePercent: 15, themeColor: '#FF9900', active: true, sellerId: 'AZ-NACHIYAR-882', activeListings: 3, orders: [] },
        meesho: { id: 3, name: 'Meesho', feePercent: 5, themeColor: '#F43397', active: true, sellerId: 'MEE-NACHIYAR-99', activeListings: 3, orders: [] }
      };
      return jsonResponse({
        success: true,
        data: {
          channels: channelsObj,
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
