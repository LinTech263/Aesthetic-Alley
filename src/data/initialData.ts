import {
  Category,
  Product,
  Review,
  Order,
  Customer,
  DiscountCode,
  DeliveryZone,
  JournalPost,
  AuditLog,
  SiteContent
} from '../types';

export const INITIAL_CURRENCY_RATES = {
  USD: 1,
  ZiG: 28.5, // 1 USD = 28.5 Zimbabwe Gold (approx official rate)
};

export const DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: 'harare-metro',
    name: 'Harare & Surrounds (Metro)',
    feeUsd: 8,
    estimatedDays: '1–2 Business Days',
    description: 'Borrowdale, Highlands, Chisipite, Avondale, Mount Pleasant, Greystone Park & CBD. Free for orders over $150. Same-day dispatch on orders before 11:00 AM.',
    harareSameDayAvailable: true,
  },
  {
    id: 'bulawayo-metro',
    name: 'Bulawayo Metro & Suburbs',
    feeUsd: 12,
    estimatedDays: '2–3 Business Days',
    description: 'Suburbs, Kumalo, Hillside, Burnside, Matsheumhlope & City Centre via secure tracked express freight.',
  },
  {
    id: 'other-zim',
    name: 'Nationwide Zimbabwe Towns',
    feeUsd: 16,
    estimatedDays: '3–5 Business Days',
    description: 'Victoria Falls, Mutare, Gweru, Kwekwe, Masvingo, Chinhoyi & Kariba via CourierConnect or Swift Tracked.',
  },
  {
    id: 'diaspora-express',
    name: 'Diaspora Global Air Express (UK, USA, SA, EU)',
    feeUsd: 48,
    estimatedDays: '4–7 Business Days',
    description: 'Direct door-to-door courier via DHL Express / FedEx with full insurance, export phytosanitary clearance, and custom wooden crating.',
  },
];

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-furniture',
    slug: 'zambezi-teak-furniture',
    name: 'Zambezi Teak Furniture',
    tagline: 'Centuries of indigenous timber, sculpted into timeless silhouettes.',
    description: 'Archival-grade low tables, consoles, and credenzas sculpted exclusively from fallen and sustainably salvage-harvested Zimbabwean teak (Baikiaea plurijuga). Finished in raw organic beeswax.',
    heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    roomType: 'Living Room',
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 'cat-lighting',
    slug: 'artisanal-lighting',
    name: 'Artisanal Lighting',
    tagline: 'Warm, low-temperature ambient luminosity inspired by African dusk.',
    description: 'Pendant chandeliers, tactile ceramic table lamps, and pierced brass fixtures designed to transform interior acoustics and cast meditative light patterns across stone and plaster walls.',
    heroImage: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
    roomType: 'Living Room',
    isActive: true,
    sortOrder: 2,
  },
  {
    id: 'cat-textiles',
    slug: 'handloomed-textiles',
    name: 'Handloomed Textiles',
    tagline: 'Wild silk, raw linen, and Binga palm weaves touched by human hands.',
    description: 'Subtly textured cushions, weighted floor runners, and botanical throws hand-loomed in small cooperatives across Lupane and Binga using indigenous dye baths from tree bark and clay.',
    heroImage: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=80',
    roomType: 'Bedroom',
    isActive: true,
    sortOrder: 3,
  },
  {
    id: 'cat-sculpture',
    slug: 'sculptural-accents',
    name: 'Sculptural Accents & Vessels',
    tagline: 'Modern monuments: black serpentine stone, turned pod mahogany, and unlacquered bronze.',
    description: 'One-of-a-kind art pieces created in dialogue with Zimbabwe’s celebrated Shona sculpture heritage — reinterpreted for minimalist, contemporary architectural sanctuaries.',
    heroImage: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80',
    roomType: 'Art & Accent',
    isActive: true,
    sortOrder: 4,
  },
  {
    id: 'cat-tableware',
    slug: 'tableware-entertaining',
    name: 'Tableware & Entertaining',
    tagline: 'Sensory stoneware and beaten brass for slow, lingering evenings.',
    description: 'Heavy stoneware platters, wheel-thrown ceramic vessels, and hand-forged Zimbabwean brass servers that elevate intimate hospitality into an art form.',
    heroImage: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1200&q=80',
    roomType: 'Dining Room',
    isActive: true,
    sortOrder: 5,
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-teak-console',
    slug: 'zambezi-fluted-teak-console',
    name: 'The Zambezi Fluted Teak Console',
    tagline: 'Monumental presence with delicate vertical reed carving.',
    description: 'Hand-carved from a single salvaged timber log of Zimbabwean teak, this architectural console table anchors entry foyers and living salons with grounding quiet authority. The hand-reeded apron reveals the natural high-density grain and warm golden-umber heartwood characteristic of indigenous Zambezi forests.',
    sensoryDetails: 'Scent of warm honey beeswax and deep aged timber. Cool, dense grain beneath the fingertips with subtle tactile fluting that catches natural raking light.',
    categoryId: 'cat-furniture',
    room: 'Living Room',
    baseCost: 380,
    sellPrice: 690,
    compareAtPrice: 780,
    isSaleActive: false,
    rating: 4.95,
    reviewCount: 18,
    isNew: true,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 4,
    dimensions: '160cm W × 42cm D × 82cm H (63" × 16.5" × 32.2")',
    materials: '100% Solid Certified Salvaged Zambezi Teak (Baikiaea plurijuga), organic beeswax finish, concealed brass foot levelers.',
    craftsmanshipProvenance: 'Handcrafted in our Harare North atelier by second-generation joiners. Wood seasoned over 36 months in natural high-altitude shade.',
    careInstructions: 'Dust with a soft microfiber cloth. Reapply organic wood wax twice annually. Avoid prolonged direct harsh tropical midday exposure.',
    estimatedHarareDelivery: '1–2 Business Days with complimentary white-glove assembly',
    heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80'
    ],
    imageAlts: [
      'Zambezi fluted teak console table in a minimalist luxury living room with stone wall',
      'Close-up detail of fluted Zimbabwean teak wood grain and organic beeswax luster',
      'Styling view with ceramic lamp and bronze vessel on console table'
    ],
    variants: [
      { id: 'v1', name: '160cm Standard / Natural Teak', type: 'Size', stock: 3, priceDifference: 0, sku: 'AA-ZTC-160-NAT' },
      { id: 'v2', name: '190cm Grand / Natural Teak', type: 'Size', stock: 1, priceDifference: 140, sku: 'AA-ZTC-190-NAT' },
      { id: 'v3', name: '160cm Standard / Smoked Charcoal Teak', type: 'Finish', stock: 0, priceDifference: 60, sku: 'AA-ZTC-160-SMK' },
    ],
    seo: {
      metaTitle: 'The Zambezi Fluted Teak Console Table | Aesthetic Alley Zimbabwe',
      metaDescription: 'Hand-carved Zimbabwean teak console with fluted facade. Sustainable quiet luxury furniture crafted in Harare with nationwide and diaspora delivery.',
      keywords: ['teak console table', 'Zimbabwe furniture', 'Harare luxury decor', 'Zambezi teak', 'bespoke wood furniture']
    },
    frequentlyBoughtWithIds: ['prod-serpentine-vessel', 'prod-mopane-terracotta-lamp'],
    qna: [
      {
        id: 'q1',
        question: 'Can you deliver this up three flights of stairs in an apartment in Borrowdale Brooke?',
        asker: 'Tadiwa M., Harare',
        answer: 'Yes, absolutely. Our Harare metro white-glove team delivers directly to your room of choice, unpacks, positions, and removes all packaging crating.',
        answeredBy: 'Aesthetic Alley White-Glove Concierge',
        date: '2026-08-12'
      },
      {
        id: 'q2',
        question: 'Is this solid timber or veneered MDF?',
        asker: 'David K., London',
        answer: 'It is 100% solid, heavy indigenous Zambezi teak. There are zero veneers, particle boards, or synthetic adhesives in our flagship furniture collection.',
        answeredBy: 'Master Joiner, Aesthetic Alley Atelier',
        date: '2026-07-29'
      }
    ]
  },
  {
    id: 'prod-mopane-terracotta-lamp',
    slug: 'mopane-terracotta-table-lamp',
    name: 'The Mopane Terracotta Table Lamp',
    tagline: 'Hand-thrown high-iron clay with hand-loomed raw linen shade.',
    description: 'Rooted in the ancient pottery traditions of southern Zimbabwe, the base of this lamp is thrown by hand on a kick-wheel using mineral-dense red clay from the Mopane woodlands. The linen drum shade is hand-loomed from unbleached flax, diffusing light into a soft golden amber reminiscent of the Zambezi golden hour.',
    sensoryDetails: 'Matte, earthy unglazed clay texture with delicate wheel ridges. Emits an enveloping 2400K warm glow that flatters stone, wood, and skin.',
    categoryId: 'cat-lighting',
    room: 'Living Room',
    baseCost: 110,
    sellPrice: 220,
    compareAtPrice: 250,
    isSaleActive: false,
    rating: 4.9,
    reviewCount: 24,
    isNew: false,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 8,
    dimensions: '38cm Diameter × 56cm Total Height (15" × 22")',
    materials: 'High-fire indigenous red stoneware terracotta, unlacquered brass hardware, hand-loomed organic linen drum, braided cloth cord.',
    craftsmanshipProvenance: 'Clay sourced and hand-fired in an open-flame wood kiln in rural Mashonaland. Wired and assembled in Harare.',
    careInstructions: 'Wipe base gently with a dry cotton cloth. Use standard E27 LED warm filament bulb (included).',
    estimatedHarareDelivery: '1 Business Day (In stock in Avondale showroom)',
    heroImage: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1000&q=80'
    ],
    imageAlts: [
      'Terracotta table lamp with natural linen shade casting warm glow on plaster wall',
      'Close-up of hand-thrown terracotta surface and unlacquered brass switch',
      'Pair of lamps styled on bedside nightstands'
    ],
    variants: [
      { id: 'vl1', name: 'Raw Ochre Terracotta / Natural Linen', type: 'Finish', stock: 6, priceDifference: 0, sku: 'AA-MTL-OCH' },
      { id: 'vl2', name: 'Charcoal Pit-Fired Clay / Warm Sand Linen', type: 'Finish', stock: 2, priceDifference: 25, sku: 'AA-MTL-BLK' }
    ],
    seo: {
      metaTitle: 'The Mopane Terracotta Table Lamp | Aesthetic Alley Zimbabwe',
      metaDescription: 'Hand-thrown clay table lamp with unbleached organic linen shade. Luxury lighting crafted by Zimbabwean ceramists.',
      keywords: ['terracotta table lamp', 'ceramic lighting', 'handcrafted lamp Harare', 'quiet luxury lighting']
    },
    frequentlyBoughtWithIds: ['prod-binga-palm-cushion', 'prod-pod-mahogany-bowl'],
    qna: [
      {
        id: 'q3',
        question: 'Does this come with Zimbabwean 3-pin plug and 220V wiring?',
        asker: 'Nyasha C., Bulawayo',
        answer: 'Yes, wired to British Standard / Zimbabwean BS 1363 3-pin specs with a grounded braided cord. For diaspora buyers in the US/Canada, we supply a pre-configured 110V dual-voltage kit.',
        answeredBy: 'Aesthetic Alley Tech Team',
        date: '2026-08-04'
      }
    ]
  },
  {
    id: 'prod-serpentine-vessel',
    slug: 'chitungwiza-black-serpentine-vessel',
    name: 'Chitungwiza Black Serpentine Vessel',
    tagline: 'Hand-chiseled raw stone sculpture honoring great Zimbabwean stonemasonry.',
    description: 'Mined from the mineral-rich Great Dyke corridor and hand-chiseled by master sculptor Tendai Musoni in Chitungwiza. Each vessel starts as a dense 40kg boulder of black springstone serpentine, hollowed with hand chisels and finished with raw fire-rubbed beeswax to reveal the deep obsidian luster of the geological strata.',
    sensoryDetails: 'Monumentally heavy, ice-cool stone that warms slowly with room temperature. Satin polished face juxtaposed against rough natural chiseled flank.',
    categoryId: 'cat-sculpture',
    room: 'Art & Accent',
    baseCost: 160,
    sellPrice: 340,
    compareAtPrice: 395,
    isSaleActive: false,
    rating: 5.0,
    reviewCount: 12,
    isNew: true,
    isLimited: true,
    isBestseller: false,
    isFeatured: true,
    inStock: true,
    stockCount: 3,
    dimensions: '26cm Diameter × 34cm Height, approx. 14.5 kg',
    materials: '100% Genuine Great Dyke Black Springstone Serpentine, organic beeswax finish.',
    craftsmanshipProvenance: 'Individual studio sculpture signed by master artist Tendai Musoni. Certificate of Authenticity included with archival registration number.',
    careInstructions: 'Purely decorative or suitable for dry flora/branches. Wipe with mineral oil or natural wax once every two years.',
    estimatedHarareDelivery: '1 Business Day via insured private delivery courier',
    heroImage: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
    ],
    imageAlts: [
      'Black serpentine stone sculptural vessel on minimalist plinth',
      'Close-up of hand-chiseled natural stone texture and artist signature',
      'Vessel styled with dried wild grasses in modern dining room'
    ],
    variants: [
      { id: 'vs1', name: 'Tall Torso Form (34cm)', type: 'Size', stock: 2, priceDifference: 0, sku: 'AA-BSV-TAL' },
      { id: 'vs2', name: 'Low Amphora Basin (22cm)', type: 'Size', stock: 1, priceDifference: -40, sku: 'AA-BSV-BAS' }
    ],
    seo: {
      metaTitle: 'Chitungwiza Black Serpentine Vessel | Aesthetic Alley Zimbabwe',
      metaDescription: 'Authentic Shona springstone serpentine vessel handcrafted in Zimbabwe. Contemporary sculptural art for luxury architectural homes.',
      keywords: ['Shona stone sculpture', 'serpentine vessel', 'Zimbabwe art decor', 'luxury stone vase']
    },
    frequentlyBoughtWithIds: ['prod-teak-console', 'prod-binga-palm-cushion'],
    qna: []
  },
  {
    id: 'prod-binga-palm-cushion',
    slug: 'binga-wild-palm-woven-cushion',
    name: 'The Binga Palm & Wild Silk Cushion',
    tagline: 'Intricately coiled ilala palm front backed in raw unbleached silk.',
    description: 'An ode to the Tonga women of Binga on the northern shores of Lake Kariba. The front is hand-plaited using supple Ilala palm fibers dyed with natural roots, while the reverse is tailored in heavyweight wild silk woven in Mutare. Down feather fill included.',
    sensoryDetails: 'Textured rhythmic weave on the face, velvety smooth raw silk on the back. Faint natural grassy aroma of sun-cured ilala palm.',
    categoryId: 'cat-textiles',
    room: 'Living Room',
    baseCost: 35,
    sellPrice: 85,
    compareAtPrice: 95,
    isSaleActive: false,
    rating: 4.88,
    reviewCount: 31,
    isNew: false,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 14,
    dimensions: '50cm × 50cm (20" × 20")',
    materials: 'Harvested Ilala palm fiber, 100% Zimbabwean wild silk backing, brass concealed zipper, 90/10 Hungarian goose feather insert.',
    craftsmanshipProvenance: 'Plaited by the Zubo Craft Collective in Binga, northern Zimbabwe. Tailored in Harare.',
    careInstructions: 'Spot clean palm surface with damp cloth. Dry clean silk cover only.',
    estimatedHarareDelivery: '1 Business Day',
    heroImage: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1000&q=80'
    ],
    imageAlts: [
      'Binga woven cushion on cream boucle armchair',
      'Detail of geometric handwoven ilala palm pattern',
      'Stacked collection of earth-toned artisanal cushions'
    ],
    variants: [
      { id: 'vc1', name: '50×50cm / Natural Bark & Ochre', type: 'Color', stock: 9, priceDifference: 0, sku: 'AA-BPC-50-OCH' },
      { id: 'vc2', name: '50×50cm / Ebony & Cream Grid', type: 'Color', stock: 5, priceDifference: 0, sku: 'AA-BPC-50-EBN' },
      { id: 'vc3', name: '60×40cm Lumbar / Natural Bark', type: 'Size', stock: 0, priceDifference: 10, sku: 'AA-BPC-60-LUM' }
    ],
    seo: {
      metaTitle: 'Binga Palm & Wild Silk Cushion | Aesthetic Alley Zimbabwe',
      metaDescription: 'Hand-plaited Binga ilala palm cushion with Zimbabwean wild silk. Authentic heritage textile decor for modern homes.',
      keywords: ['Binga baskets Zimbabwe', 'Tonga woven cushion', 'wild silk pillow', 'African luxury textiles']
    },
    frequentlyBoughtWithIds: ['prod-teak-console', 'prod-pod-mahogany-bowl'],
    qna: []
  },
  {
    id: 'prod-pod-mahogany-bowl',
    slug: 'sculpted-pod-mahogany-centerpiece',
    name: 'Sculpted Pod Mahogany Centerpiece Bowl',
    tagline: 'Monumental turned timber with deep natural figured grain.',
    description: 'Turned from fallen Pod Mahogany (Afzelia quanzensis) from the Matabeleland lowveld. Its sweeping concave form celebrates dramatic sapwood-to-heartwood transitions, transitioning from pale cream to deep cognac umber. Sits with heavy poise upon dining tables and credenzas.',
    sensoryDetails: 'Silky smooth, hand-sanded to 1200 grit and treated with cold-pressed marula oil. Feels substantial and grounding.',
    categoryId: 'cat-sculpture',
    room: 'Dining Room',
    baseCost: 75,
    sellPrice: 165,
    compareAtPrice: 190,
    isSaleActive: false,
    rating: 4.92,
    reviewCount: 16,
    isNew: false,
    isBestseller: false,
    isFeatured: true,
    inStock: true,
    stockCount: 6,
    dimensions: '44cm Diameter × 12cm Height (17.3" × 4.7")',
    materials: 'Fallen Pod Mahogany (Afzelia quanzensis), food-safe marula nut oil finish.',
    craftsmanshipProvenance: 'Lathe-turned and hand-carved in Bulawayo workshop.',
    careInstructions: 'Hand wash with mild soap and dry immediately. Not dishwasher safe. Rub with food-grade oil periodically.',
    estimatedHarareDelivery: '1–2 Business Days',
    heroImage: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
    ],
    imageAlts: [
      'Turned wooden centerpiece bowl on concrete dining table',
      'Grain pattern detail of pod mahogany bowl'
    ],
    variants: [
      { id: 'vpm1', name: '44cm Grand Bowl', type: 'Size', stock: 4, priceDifference: 0, sku: 'AA-PMB-44' },
      { id: 'vpm2', name: '32cm Petit Bowl', type: 'Size', stock: 2, priceDifference: -45, sku: 'AA-PMB-32' }
    ],
    seo: {
      metaTitle: 'Sculpted Pod Mahogany Centerpiece Bowl | Aesthetic Alley Zimbabwe',
      metaDescription: 'Hand-turned Pod Mahogany decorative wooden centerpiece bowl. Sustainable African hardwood decor handcrafted in Bulawayo.',
      keywords: ['pod mahogany bowl', 'wooden centerpiece', 'Zimbabwe woodcarving', 'handcrafted tableware']
    },
    frequentlyBoughtWithIds: ['prod-brass-servers', 'prod-mopane-terracotta-lamp'],
    qna: []
  },
  {
    id: 'prod-brass-servers',
    slug: 'beaten-brass-salad-servers',
    name: 'Hand-Forged Brass Feast Servers (Pair)',
    tagline: 'Living metal forged over open charcoal braziers.',
    description: 'A striking duo of salad and feast servers beaten from solid unlacquered architectural brass. Each hammer strike remains visible along the handles, concluding in graceful organic spoon bowls that honor the generous spirit of Zimbabwean family dining.',
    sensoryDetails: 'Weighty balance in hand. Cold unlacquered metal that slowly develops a golden antique patina over years of memorable gatherings.',
    categoryId: 'cat-tableware',
    room: 'Dining Room',
    baseCost: 32,
    sellPrice: 75,
    compareAtPrice: 85,
    isSaleActive: false,
    rating: 4.96,
    reviewCount: 28,
    isNew: false,
    isBestseller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 19,
    dimensions: '29cm Length × 7.5cm Width (11.5" × 3")',
    materials: '100% Solid Unlacquered Heavy Brass.',
    craftsmanshipProvenance: 'Hand-forged by metal artisans in Mbare, Harare. Packed in a signature debossed linen pouch.',
    careInstructions: 'Hand wash with warm soapy water and dry immediately with a soft cloth. Allow to age naturally or restore mirror shine with lemon and salt.',
    estimatedHarareDelivery: '1 Business Day',
    heroImage: 'https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1000&q=80'
    ],
    imageAlts: [
      'Hand-forged brass salad servers resting on ceramic platter',
      'Close-up of beaten hammer marks on unlacquered brass handles'
    ],
    variants: [
      { id: 'vbs1', name: 'Brushed Satin Brass', type: 'Finish', stock: 12, priceDifference: 0, sku: 'AA-BS-SAT' },
      { id: 'vbs2', name: 'Charcoal Fire-Blackened Brass', type: 'Finish', stock: 7, priceDifference: 10, sku: 'AA-BS-BLK' }
    ],
    seo: {
      metaTitle: 'Hand-Forged Brass Salad Servers | Aesthetic Alley Zimbabwe',
      metaDescription: 'Solid unlacquered hand-beaten brass servers. Luxury African cutlery and entertaining accessories handmade in Harare.',
      keywords: ['brass salad servers', 'handcrafted cutlery', 'Harare artisans', 'luxury entertaining']
    },
    frequentlyBoughtWithIds: ['prod-pod-mahogany-bowl', 'prod-stoneware-dinner-set'],
    qna: []
  },
  {
    id: 'prod-teak-low-plinth',
    slug: 'matobo-teak-low-plinth-table',
    name: 'The Matobo Teak Low Plinth Coffee Table',
    tagline: 'Grounded balance inspired by the balancing granite boulders of Matobo Hills.',
    description: 'Resting low to the floor, this monolithic coffee plinth is joined with traditional mortise-and-tenon woodcraft from seasoned Zambezi teak slabs. Its generous square profile provides an expansive architectural canvas for art monographs, sculptural stone bowls, and tea ceremony vessels.',
    sensoryDetails: 'Satin tactile grain, rounded organic bullnose edges, substantial 55kg weight.',
    categoryId: 'cat-furniture',
    room: 'Living Room',
    baseCost: 520,
    sellPrice: 940,
    compareAtPrice: 1100,
    isSaleActive: false,
    rating: 5.0,
    reviewCount: 9,
    isNew: true,
    isLimited: true,
    isBestseller: false,
    isFeatured: true,
    inStock: true,
    stockCount: 2,
    dimensions: '120cm W × 120cm L × 32cm H (47" × 47" × 12.5")',
    materials: 'Solid Salvaged Zambezi Teak, organic plant wax finish.',
    craftsmanshipProvenance: 'Crafted in limited seasonal batches in Harare North.',
    careInstructions: 'Coasters recommended for hot vessels. Clean with damp cloth and dry immediately.',
    estimatedHarareDelivery: '1–2 Business Days with white-glove placement',
    heroImage: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80'
    ],
    imageAlts: [
      'Low square teak coffee table in sunlit contemporary lounge',
      'Grain detail and butterfly joint of Matobo teak table'
    ],
    variants: [
      { id: 'vmt1', name: '120×120cm Natural Teak', type: 'Size', stock: 2, priceDifference: 0, sku: 'AA-MPT-120-NAT' },
      { id: 'vmt2', name: '140×140cm Natural Teak', type: 'Size', stock: 0, priceDifference: 220, sku: 'AA-MPT-140-NAT' }
    ],
    seo: {
      metaTitle: 'The Matobo Teak Low Plinth Table | Aesthetic Alley Zimbabwe',
      metaDescription: 'Monolithic low coffee table carved from solid Zambezi teak. Minimalist quiet luxury furniture designed in Zimbabwe.',
      keywords: ['low coffee table', 'teak coffee plinth', 'luxury living room table', 'Matobo table']
    },
    frequentlyBoughtWithIds: ['prod-serpentine-vessel', 'prod-mopane-terracotta-lamp'],
    qna: []
  },
  {
    id: 'prod-stoneware-dinner-set',
    slug: 'kariba-sand-stoneware-dinner-set',
    name: 'The Kariba Sand Stoneware Dinner Set (16-Piece)',
    tagline: 'Wheel-thrown organic rim stoneware inspired by southern Zambezi shorelines.',
    description: 'Crafted for twelve-course slow dinners or Sunday family feasts. Features 4 dinner plates, 4 lunch/starter plates, 4 all-purpose pasta/soup bowls, and 4 breakfast bowls. The unglazed exterior reveals the mineral speckle of local stoneware, while the interior is glazed in satin ivory dolomite.',
    sensoryDetails: 'Tactile earthy rim with smooth food-safe interior glaze. Hefty reassuring ceramic heft.',
    categoryId: 'cat-tableware',
    room: 'Dining Room',
    baseCost: 140,
    sellPrice: 290,
    compareAtPrice: 340,
    isSaleActive: true,
    rating: 4.94,
    reviewCount: 19,
    isNew: false,
    isBestseller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 5,
    dimensions: 'Dinner: 28cm, Salad: 22cm, Pasta Bowl: 21cm, Soup Bowl: 16cm',
    materials: 'High-temperature vitrified local stoneware clay, non-toxic lead-free dolomite glaze.',
    craftsmanshipProvenance: 'Wheel-thrown by master studio potters in Marondera.',
    careInstructions: 'Microwave and dishwasher safe. Avoid thermal shock.',
    estimatedHarareDelivery: '1 Business Day (Securely foam-cushioned in gift box)',
    heroImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80'
    ],
    imageAlts: [
      'Minimalist ceramic dinner set placed on linen tablecloth',
      'Stack of handcrafted stoneware dinner plates'
    ],
    variants: [
      { id: 'vds1', name: 'Kariba Sand (Speckled Ivory)', type: 'Color', stock: 4, priceDifference: 0, sku: 'AA-KSS-16-IVO' },
      { id: 'vds2', name: 'Binga Basalt (Matte Charcoal)', type: 'Color', stock: 1, priceDifference: 20, sku: 'AA-KSS-16-BLK' }
    ],
    seo: {
      metaTitle: 'Kariba Sand Stoneware Dinner Set | Aesthetic Alley Zimbabwe',
      metaDescription: '16-piece handcrafted ceramic dinnerware set. Wheel-thrown stoneware tableware made in Zimbabwe with global shipping.',
      keywords: ['stoneware dinner set', 'handcrafted plates Harare', 'ceramic dinnerware', 'luxury dining set']
    },
    frequentlyBoughtWithIds: ['prod-brass-servers', 'prod-raw-linen-throw'],
    qna: []
  },
  {
    id: 'prod-pierced-brass-pendant',
    slug: 'chisipite-pierced-brass-dome-pendant',
    name: 'The Chisipite Pierced Brass Dome Pendant',
    tagline: 'Perforated constellation patterns that dapple dining tables with starlight.',
    description: 'Suspended from a minimalist fabric cord, this hand-spun brass dome is meticulously pierced with thousands of micro-apertures inspired by the midnight constellations of Hwange National Park. Downward illumination is bright and focused, while ambient light spills gently through the perforations.',
    sensoryDetails: 'Warm golden shimmer of unlacquered brass. Illuminates rooms with a breathtaking dappled ambient shadowplay.',
    categoryId: 'cat-lighting',
    room: 'Dining Room',
    baseCost: 175,
    sellPrice: 380,
    compareAtPrice: 420,
    isSaleActive: false,
    rating: 5.0,
    reviewCount: 14,
    isNew: true,
    isLimited: false,
    isBestseller: false,
    isFeatured: true,
    inStock: true,
    stockCount: 5,
    dimensions: '52cm Diameter × 28cm Dome Height + 200cm adjustable drop cord',
    materials: 'Spun Solid Brass, hand-pierced detailing, ceiling canopy in matching brass.',
    craftsmanshipProvenance: 'Individually pierced by hand in our Harare metal studio.',
    careInstructions: 'Dust with soft dry cloth. Polishing optional depending on desired patina.',
    estimatedHarareDelivery: '1–2 Business Days',
    heroImage: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80'
    ],
    imageAlts: [
      'Pierced brass dome pendant hanging over dining table',
      'Detail of constellation light pattern illuminated through brass dome'
    ],
    variants: [
      { id: 'vp1', name: '52cm Diameter / Brushed Brass', type: 'Size', stock: 3, priceDifference: 0, sku: 'AA-CPB-52-BRS' },
      { id: 'vp2', name: '68cm Grand Diameter / Brushed Brass', type: 'Size', stock: 2, priceDifference: 120, sku: 'AA-CPB-68-BRS' }
    ],
    seo: {
      metaTitle: 'The Chisipite Pierced Brass Dome Pendant | Aesthetic Alley Zimbabwe',
      metaDescription: 'Hand-pierced architectural brass dome pendant light. Luxury lighting designed and fabricated in Harare.',
      keywords: ['brass pendant light', 'luxury chandelier Harare', 'pierced brass lamp', 'dining room lighting']
    },
    frequentlyBoughtWithIds: ['prod-stoneware-dinner-set', 'prod-brass-servers'],
    qna: []
  },
  {
    id: 'prod-raw-linen-throw',
    slug: 'highlands-hand-loomed-raw-linen-throw',
    name: 'The Highlands Hand-Loomed Raw Linen Throw',
    tagline: 'Pure unbleached Belgian flax loomed by master weavers in Mutare.',
    description: 'Spun from long-staple flax and loomed with generous open-slub texture, this substantial blanket drapes with sculptural weight over sofas and duvet footboards. Finished with hand-knotted eyelash fringe along two borders.',
    sensoryDetails: 'Softens with every wash. Airy yet reassuringly dense with honest artisanal slub irregularities.',
    categoryId: 'cat-textiles',
    room: 'Bedroom',
    baseCost: 48,
    sellPrice: 110,
    compareAtPrice: 130,
    isSaleActive: false,
    rating: 4.91,
    reviewCount: 22,
    isNew: false,
    isBestseller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 11,
    dimensions: '140cm × 220cm (55" × 86")',
    materials: '100% Unbleached Pre-washed Linen, OEKO-TEX certified.',
    craftsmanshipProvenance: 'Loomed on traditional wooden flying shuttles in the Eastern Highlands.',
    careInstructions: 'Machine wash gentle cold with mild plant detergent. Tumble dry low or line dry.',
    estimatedHarareDelivery: '1 Business Day',
    heroImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80'
    ],
    imageAlts: [
      'Draped linen throw on low lounge chair with books',
      'Fringe detail of natural oatmeal linen throw'
    ],
    variants: [
      { id: 'vlt1', name: 'Oatmeal Undyed', type: 'Color', stock: 6, priceDifference: 0, sku: 'AA-HLT-OAT' },
      { id: 'vlt2', name: 'Charcoal Slag', type: 'Color', stock: 5, priceDifference: 0, sku: 'AA-HLT-CHR' }
    ],
    seo: {
      metaTitle: 'The Highlands Hand-Loomed Raw Linen Throw | Aesthetic Alley',
      metaDescription: 'Pure heavyweight unbleached linen throw blanket with eyelash fringe. Artisanal bedroom luxury crafted in Zimbabwe.',
      keywords: ['linen throw blanket', 'handwoven blanket Zimbabwe', 'raw linen throw', 'luxury bedspread']
    },
    frequentlyBoughtWithIds: ['prod-binga-palm-cushion', 'prod-teak-console'],
    qna: []
  },
  {
    id: 'prod-nyanga-slate-platter',
    slug: 'nyanga-mountain-slate-charcuterie-platter',
    name: 'The Nyanga Mountain Slate & Brass Platter',
    tagline: 'Raw-cleaved Eastern Highlands slate paired with cast brass handles.',
    description: 'Harvested from historical stone quarries in the mist-crowned Nyanga mountains. The surface is hand-split to retain its organic geological ridges, then buffed with cold-pressed grapeseed oil. Accented with heavy solid cast brass arch handles for effortless hosting.',
    sensoryDetails: 'Naturally chilled stone that keeps cheeses and canapés cool under warm Harare afternoon entertaining.',
    categoryId: 'cat-tableware',
    room: 'Dining Room',
    baseCost: 40,
    sellPrice: 95,
    compareAtPrice: 115,
    isSaleActive: false,
    rating: 4.86,
    reviewCount: 15,
    isNew: false,
    isBestseller: false,
    isFeatured: false,
    inStock: true,
    stockCount: 8,
    dimensions: '58cm L × 24cm W × 4cm H (23" × 9.5")',
    materials: 'Natural Zimbabwean Mountain Slate, solid cast brass handles, protective felt base feet.',
    craftsmanshipProvenance: 'Hand-shaped in Nyanga; hardware fitted in Harare.',
    careInstructions: 'Hand wash only. Buff with a drop of cooking oil periodically to deepen stone luster.',
    estimatedHarareDelivery: '1 Business Day',
    heroImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?auto=format&fit=crop&w=1000&q=80'
    ],
    imageAlts: [
      'Slate charcuterie board styled with artisanal cheeses and figs',
      'Detail of natural split slate edge and cast brass handle'
    ],
    variants: [
      { id: 'vns1', name: '58cm Long Platter / Brass Handles', type: 'Size', stock: 8, priceDifference: 0, sku: 'AA-NSP-58-BRS' }
    ],
    seo: {
      metaTitle: 'The Nyanga Slate & Brass Platter | Aesthetic Alley Zimbabwe',
      metaDescription: 'Natural mountain slate serving board with solid brass handles. Luxury entertaining platter handcrafted in Zimbabwe.',
      keywords: ['slate serving board', 'brass handle platter', 'charcuterie board Harare', 'Zimbabwe luxury gifts']
    },
    frequentlyBoughtWithIds: ['prod-brass-servers', 'prod-pod-mahogany-bowl'],
    qna: []
  },
  {
    id: 'prod-sculptural-brass-sconce',
    slug: 'shona-monolith-brass-wall-sconce',
    name: 'The Monolith Folded Brass Wall Sconce',
    tagline: 'Quiet geometric luxury casting bidirectional architectural glow.',
    description: 'Formed from a single precision sheet of heavyweight 3mm architectural brass, folded with crisp origami precision. Light emanates softly from both top and bottom apertures, washing vertical walls in an intimate, glare-free wash.',
    sensoryDetails: 'Minimalist golden presence. Brushed satin face catches changing sunbeams throughout the day.',
    categoryId: 'cat-lighting',
    room: 'Living Room',
    baseCost: 90,
    sellPrice: 195,
    compareAtPrice: 225,
    isSaleActive: false,
    rating: 4.95,
    reviewCount: 11,
    isNew: true,
    isLimited: false,
    isBestseller: false,
    isFeatured: false,
    inStock: true,
    stockCount: 6,
    dimensions: '14cm W × 10cm D × 38cm H (5.5" × 4" × 15")',
    materials: 'Solid 3mm Unlacquered Brass, warm LED module (2700K included), universal wall-mount bracket.',
    craftsmanshipProvenance: 'Laser-cut and hand-folded in Harare.',
    careInstructions: 'Dust with soft dry cloth. Hardwired installation recommended.',
    estimatedHarareDelivery: '1–2 Business Days',
    heroImage: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80'
    ],
    imageAlts: [
      'Folded brass wall sconce casting warm architectural light onto lime-washed plaster',
      'Detail of unlacquered brass finish and hand-chamfered edge'
    ],
    variants: [
      { id: 'vsb1', name: 'Brushed Satin Warm Brass', type: 'Finish', stock: 4, priceDifference: 0, sku: 'AA-MBS-BRS' },
      { id: 'vsb2', name: 'Oxidized Gunmetal Bronze', type: 'Finish', stock: 2, priceDifference: 15, sku: 'AA-MBS-GNM' }
    ],
    seo: {
      metaTitle: 'The Monolith Folded Brass Wall Sconce | Aesthetic Alley Zimbabwe',
      metaDescription: 'Bespoke folded brass wall sconce for contemporary interiors. Handmade architectural lighting in Zimbabwe.',
      keywords: ['brass wall sconce', 'modern wall light Harare', 'architectural lighting', 'folded brass lamp']
    },
    frequentlyBoughtWithIds: ['prod-teak-console', 'prod-mopane-terracotta-lamp'],
    qna: []
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-teak-console',
    customerName: 'Chipo R.',
    location: 'Borrowdale Brooke, Harare',
    rating: 5,
    title: 'An absolute masterpiece of Zimbabwean craftsmanship',
    comment: 'The fluting detail is even more breathtaking in person than photographs show. The teak wood has this deep, honey-gold warmth that completely anchors our entrance hall. The delivery crew arrived promptly on Saturday morning, unwrapped it with cotton gloves, and set it perfectly in place. Worth every single cent.',
    verifiedPurchase: true,
    date: '2026-08-28',
    helpfulCount: 14,
    photos: [
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80'
    ],
    status: 'approved',
    staffResponse: 'Thank you so much Chipo. Tendai and the atelier joiners were delighted to hear your lovely feedback. May it grace your family home for decades to come.'
  },
  {
    id: 'rev-2',
    productId: 'prod-mopane-terracotta-lamp',
    customerName: 'Marcus & Sharon V.',
    location: 'Highlands, Harare',
    rating: 5,
    title: 'The ambient glow is pure therapy after long work days',
    comment: 'We replaced two generic store-bought metal lamps with a pair of these Mopane terracotta lamps. The linen shade combined with the earthy clay base creates the warmest, most relaxing mood in our reading room. Packaging was museum-grade.',
    verifiedPurchase: true,
    date: '2026-08-15',
    helpfulCount: 9,
    photos: [],
    status: 'approved'
  },
  {
    id: 'rev-3',
    productId: 'prod-serpentine-vessel',
    customerName: 'Dr. Tatenda G.',
    location: 'Kensington, London (Diaspora)',
    rating: 5,
    title: 'A piece of home that stops every dinner guest in their tracks',
    comment: 'Ordering from the UK, I was worried about courier transit for such a heavy stone artwork. It arrived via DHL in custom wooden bracing without a single scratch. Tendai Musoni’s hand-chiseled springstone is extraordinary. It brings the soul of Zimbabwe straight into our London flat.',
    verifiedPurchase: true,
    date: '2026-08-02',
    helpfulCount: 22,
    photos: [
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=600&q=80'
    ],
    status: 'approved',
    staffResponse: 'Thank you Tatenda. Serving our diaspora family worldwide with bespoke timber crating and insured freight is our highest priority.'
  }
];

export const INITIAL_DISCOUNTS: DiscountCode[] = [
  {
    code: 'SAVANNAH10',
    type: 'percentage',
    value: 10,
    minOrder: 50,
    usageLimit: 500,
    usedCount: 87,
    active: true,
    description: '10% Welcome Privilege for your initial order with Aesthetic Alley'
  },
  {
    code: 'HARARELUX',
    type: 'fixed',
    value: 20,
    minOrder: 150,
    usageLimit: 200,
    usedCount: 42,
    active: true,
    description: '$20 celebratory courtesy on orders over $150'
  },
  {
    code: 'DIASPORA25',
    type: 'fixed',
    value: 25,
    minOrder: 200,
    usageLimit: 100,
    usedCount: 19,
    active: true,
    description: '$25 shipping contribution for our diaspora patrons worldwide'
  }
];

export const INITIAL_CUSTOMER: Customer = {
  id: 'cust-demo-1',
  name: 'Kudzai Moyo',
  email: 'kudzai.moyo@gmail.com',
  phone: '+263 77 412 8990',
  loyaltyPoints: 420, // 420 pts = $42 redeemable
  tier: 'Gold',
  orderCount: 3,
  lifetimeSpend: 1145,
  twoFactorEnabled: true,
  savedAddresses: [
    {
      id: 'addr-1',
      title: 'Borrowdale Residence',
      recipientName: 'Kudzai Moyo',
      phone: '+263 77 412 8990',
      addressLine: '14 Crowhill Road, Gate 3B',
      suburb: 'Borrowdale',
      city: 'Harare',
      country: 'Zimbabwe',
      gateCode: '#4910',
      landmarkInstructions: 'Opposite the large jacaranda cluster, black wrought-iron double gate',
      isDefault: true
    },
    {
      id: 'addr-2',
      title: 'Avondale Design Office',
      recipientName: 'Kudzai Moyo',
      phone: '+263 77 412 8990',
      addressLine: 'Unit 4, King George Office Suites',
      suburb: 'Avondale',
      city: 'Harare',
      country: 'Zimbabwe',
      gateCode: 'Dial 44 on intercom',
      landmarkInstructions: 'Next to the red brick patisserie',
      isDefault: false
    }
  ],
  savedPaymentMethods: [
    {
      id: 'pm-1',
      type: 'ecocash',
      title: 'EcoCash Mobile Wallet (077 412 8990)',
      isDefault: true
    },
    {
      id: 'pm-2',
      type: 'card',
      title: 'Visa Platinum ending in 8421',
      expiry: '09/28',
      isDefault: false
    }
  ]
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'AA-8924',
    date: '2026-09-12 10:14 AM',
    status: 'Out for Delivery',
    customer: {
      name: 'Kudzai Moyo',
      email: 'kudzai.moyo@gmail.com',
      phone: '+263 77 412 8990',
      isGuest: false
    },
    delivery: {
      addressLine: '14 Crowhill Road, Gate 3B',
      suburb: 'Borrowdale',
      city: 'Harare',
      country: 'Zimbabwe',
      gateCode: '#4910',
      landmarkInstructions: 'Black gate opposite jacaranda cluster; please ring bell twice',
      callAhead: true,
      zoneId: 'harare-metro',
      zoneName: 'Harare & Surrounds (Metro)',
      trackingCode: 'ZIM-HRE-98412',
      estimatedDeliveryDate: 'Today, between 2:00 PM – 4:30 PM'
    },
    items: [
      {
        id: 'cart-item-1',
        product: INITIAL_PRODUCTS[0], // Console
        variant: INITIAL_PRODUCTS[0].variants[0],
        quantity: 1,
        unitPrice: 690,
        giftWrap: true,
        giftMessage: 'To our new home, with all our love.'
      },
      {
        id: 'cart-item-2',
        product: INITIAL_PRODUCTS[3], // Binga cushion
        variant: INITIAL_PRODUCTS[3].variants[0],
        quantity: 2,
        unitPrice: 85,
        giftWrap: false
      }
    ],
    pricing: {
      subtotal: 860,
      deliveryFee: 0, // free over $150
      discount: 86, // 10% promo
      tax: 0,
      total: 774,
      currency: 'USD',
      currencyRate: 1,
      promoCodeApplied: 'SAVANNAH10'
    },
    payment: {
      method: 'ecocash',
      status: 'paid',
      transactionRef: 'ECO-9941048201',
      details: 'EcoCash Mobile Money PIN confirmed',
      paidAt: '2026-09-12 10:16 AM'
    },
    statusHistory: [
      { status: 'Placed', timestamp: '2026-09-12 10:14 AM', note: 'Order received and verified via EcoCash escrow' },
      { status: 'Processing', timestamp: '2026-09-12 11:30 AM', note: 'Craft inspection and museum-grade protective packaging completed' },
      { status: 'Dispatched', timestamp: '2026-09-13 08:45 AM', note: 'Transferred to Harare North White-Glove Courier van #3' },
      { status: 'Out for Delivery', timestamp: '2026-09-14 07:15 AM', note: 'Driver Simba en route. Courier will call ahead 15 minutes before arrival.' }
    ],
    notes: 'White-glove room placement requested. Remove packaging upon customer approval.'
  },
  {
    id: 'AA-8419',
    date: '2026-08-20 03:40 PM',
    status: 'Delivered',
    customer: {
      name: 'Kudzai Moyo',
      email: 'kudzai.moyo@gmail.com',
      phone: '+263 77 412 8990',
      isGuest: false
    },
    delivery: {
      addressLine: '14 Crowhill Road, Gate 3B',
      suburb: 'Borrowdale',
      city: 'Harare',
      country: 'Zimbabwe',
      gateCode: '#4910',
      landmarkInstructions: 'Black gate',
      callAhead: true,
      zoneId: 'harare-metro',
      zoneName: 'Harare & Surrounds (Metro)',
      trackingCode: 'ZIM-HRE-78192',
      estimatedDeliveryDate: 'Delivered Aug 21, 2026'
    },
    items: [
      {
        id: 'cart-item-3',
        product: INITIAL_PRODUCTS[1], // Mopane Lamp
        variant: INITIAL_PRODUCTS[1].variants[0],
        quantity: 1,
        unitPrice: 220,
        giftWrap: false
      }
    ],
    pricing: {
      subtotal: 220,
      deliveryFee: 0,
      discount: 0,
      tax: 0,
      total: 220,
      currency: 'USD',
      currencyRate: 1
    },
    payment: {
      method: 'card',
      status: 'paid',
      transactionRef: 'PAYNOW-881920',
      details: 'Visa Card ending in 8421',
      paidAt: '2026-08-20 03:42 PM'
    },
    statusHistory: [
      { status: 'Placed', timestamp: '2026-08-20 03:40 PM', note: 'Order placed' },
      { status: 'Processing', timestamp: '2026-08-20 04:15 PM', note: 'Quality inspection passed' },
      { status: 'Dispatched', timestamp: '2026-08-21 09:00 AM', note: 'Dispatched with morning courier route' },
      { status: 'Out for Delivery', timestamp: '2026-08-21 11:10 AM', note: 'Out for delivery' },
      { status: 'Delivered', timestamp: '2026-08-21 01:45 PM', note: 'Signed and accepted by Kudzai Moyo' }
    ]
  }
];

export const INITIAL_JOURNAL_POSTS: JournalPost[] = [
  {
    id: 'post-1',
    slug: 'sculptural-living-shona-stone-and-zambezi-teak',
    title: 'Sculptural Living: Rooting Contemporary Spaces in Zimbabwean Materiality',
    category: 'Interior Architecture',
    readTime: '5 min read',
    publishedAt: 'September 2026',
    author: 'Chiedza Mandaza, Design Principal',
    excerpt: 'How the tactile tension between raw black springstone and aged indigenous Zambezi teak creates serene, grounded sanctuaries that resist fleeting design fads.',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    contentMarkdown: `When creating spaces in Harare, Bulawayo, or abroad for our diaspora patrons in London and Johannesburg, the goal is never to recreate a generic European catalog. Instead, it is an inquiry into presence.

### The Grounding Density of Zambezi Teak
Zimbabwean teak (*Baikiaea plurijuga*) grows in deep Kalahari sands. Unlike fast-growing plantation timbers, indigenous teak takes over 150 years to mature. Its wood fibers are so dense that termite resistance is biological and its structural integrity withstands multi-generational domestic life.

Pairing a low-profile teak plinth or console with natural linen seating immediately recalibrates the visual temperature of a room. It adds weight where modern drywall architecture can often feel thin.

### Honest Hand-Chiseled Stone
Our collaboration with master stone carvers in Chitungwiza explores pure architectural volumes. Unlike decorative curios, these monolithic springstone vessels allow the natural mineral inclusions — iron streaks, pyrite flecks, and deep black serpentine — to command negative space.

*Design note:* Place your stone vessel where low afternoon sunlight rakes across its surface. The interplay of shadow along the hand-chiseled facets brings an ever-shifting kinetic art to your living room.`,
    shoppableProductIds: ['prod-teak-console', 'prod-serpentine-vessel', 'prod-teak-low-plinth']
  },
  {
    id: 'post-2',
    slug: 'the-art-of-slow-entertaining-from-binga-to-borrowdale',
    title: 'The Art of Slow Entertaining: Curating Tableware for Lingering Evenings',
    category: 'Entertaining & Hospitality',
    readTime: '4 min read',
    publishedAt: 'August 2026',
    author: 'Tatenda Ruvimbo, Culinary & Decor Stylist',
    excerpt: 'Move away from fragile formal porcelain. Discover the quiet warmth of wheel-thrown stoneware, hand-forged beaten brass, and indigenous pod mahogany.',
    heroImage: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1200&q=80',
    contentMarkdown: `Hospitality across Zimbabwe has always been rooted in generosity — open verandas, shared feasts, and conversation that stretches long past the setting of the sun.

### Tactile Ceramics over Machine Symmetry
Machine-pressed dinnerware lacks the subtle thumbprints of the artisan. Our Kariba Sand collection embraces organic rims and mineral specks that catch the warm glow of candlelight. Food looks vibrant and celebrated against earthy matte glazes.

### The Living Warmth of Brass
Unlike stainless steel, unlacquered brass reacts to time, touch, and lemon juices. As you host dinners over years, your servers develop an heirloom character that tells the story of celebrated milestones, laughter, and family gatherings.`,
    shoppableProductIds: ['prod-stoneware-dinner-set', 'prod-brass-servers', 'prod-pod-mahogany-bowl']
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    adminName: 'Owner (Tendai Chidzero)',
    action: 'Inventory Update',
    targetType: 'Product',
    targetId: 'prod-teak-console',
    timestamp: '2026-09-14 07:10 AM',
    details: 'Received batch of 4 finished consoles from Harare North workshop. Adjusted stock to 4 units.'
  },
  {
    id: 'log-2',
    adminName: 'Owner (Tendai Chidzero)',
    action: 'Markup Rule Recalculation',
    targetType: 'Pricing',
    targetId: 'cat-furniture',
    timestamp: '2026-09-13 04:20 PM',
    details: 'Verified 81% markup on base cost for solid timber lines with automated sell price sync.'
  },
  {
    id: 'log-3',
    adminName: 'Staff (Rudo N.)',
    action: 'Order Status Changed',
    targetType: 'Order',
    targetId: 'AA-8924',
    timestamp: '2026-09-14 07:15 AM',
    details: 'Status changed from Dispatched to Out for Delivery. Driver assigned: Simba (Van #3).'
  }
];

export const INITIAL_SITE_CONTENT: SiteContent = {
  announcementText: 'Harare & Bulawayo complimentary white-glove delivery on orders over $150 • Diaspora global express dispatch in bespoke protective crating',
  heroHeadline: 'Quiet Luxury for Discerning Homes',
  heroSubheadline: 'Handcrafted Zambezi teak furniture, architectural lighting, and heritage Shona stonework. Designed in Harare, collected worldwide.',
  heroCtaText: 'Explore The Zambezi Teak Collection',
  heroCtaLink: 'shop',
  heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
  brandStoryTeaser: 'Aesthetic Alley was founded to redefine contemporary living through the lens of Zimbabwe’s extraordinary material legacy: 150-year-old fallen Zambezi teak, mineral-rich great dyke springstone, and centuries-old Binga palm plaiting.'
};
