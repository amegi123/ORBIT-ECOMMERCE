import { NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'REDACTED_GEMINI_KEY';

const MODEL_ENDPOINTS = [
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent',
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
  'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent',
];

interface ProductCard {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
}

const CATALOG_PRODUCTS: Record<string, ProductCard[]> = {
  tvs: [
    {
      id: 'orbit-tv-65-smart-4k',
      name: 'Orbit 65" Smart 4K UHD TV',
      price: 95000,
      oldPrice: 110000,
      image: '/img/android20orbit65.webp',
      category: 'Televisions',
    },
    {
      id: 'orbit-tv-55-smart',
      name: 'Orbit 55" Smart 4K UHD TV',
      price: 72000,
      oldPrice: 85000,
      image: '/img/smart204320hd.webp',
      category: 'Televisions',
    },
    {
      id: 'orbit-tv-75-qled',
      name: 'Orbit 75" QLED Cinema 4K TV',
      price: 165000,
      oldPrice: 190000,
      image: '/img/android20orbit75.webp',
      category: 'QLED TVs',
    },
  ],
  washers: [
    {
      id: 'orbit-wash-12kg',
      name: 'Orbit 12KG Front Load Smart Washer',
      price: 68000,
      oldPrice: 78000,
      image: '/img/product-washing1.jpeg',
      category: 'Washing Machines',
    },
    {
      id: '8kg-auto-toploader',
      name: '8kg Automatic Top Loader Washer',
      price: 45000,
      oldPrice: 51000,
      image: '/img/product-washing3.webp',
      category: 'Washing Machines',
    },
    {
      id: 'orbit-wash-twin-8kg',
      name: 'Orbit 8KG Twin Tub Semi-Auto Washer',
      price: 32000,
      oldPrice: 38000,
      image: '/img/product-washing2.jpeg',
      category: 'Washing Machines',
    },
  ],
  fridges: [
    {
      id: 'side-by-side-fridge',
      name: 'Orbit Side-by-Side Refrigerator (520L)',
      price: 115000,
      oldPrice: 130000,
      image: '/img/550a_compressed.webp',
      category: 'Refrigerators',
    },
    {
      id: 'normal-800-refrigerator',
      name: 'Normal 800 Refrigerator (600L Net)',
      price: 63000,
      oldPrice: 65000,
      image: '/img/showcase660a.webp',
      category: 'Refrigerators',
    },
    {
      id: 'water-dispenser-hot-cold',
      name: 'Orbit Hot & Cold Water Dispenser',
      price: 18500,
      oldPrice: 22000,
      image: '/img/water1_compressed.webp',
      category: 'Water Dispensers',
    },
  ],
  stoves: [
    {
      id: 'gas-cooker-stove-4b',
      name: 'Orbit 4-Burner Gas Cooker Stove',
      price: 34000,
      oldPrice: 39000,
      image: '/img/stoves50X50.jpeg',
      category: 'Stoves',
    },
    {
      id: 'builtin-gas-stove-pro',
      name: 'Orbit Built-In 4-Burner Glass Stove',
      price: 42000,
      oldPrice: 48000,
      image: '/img/stoves-full-electric.webp',
      category: 'Stoves',
    },
  ],
};

function getMatchingProducts(query: string): ProductCard[] {
  const q = query.toLowerCase();
  if (
    q.includes('tv') ||
    q.includes('4k') ||
    q.includes('screen') ||
    q.includes('television') ||
    q.includes('android') ||
    q.includes('ቲቪ') ||
    q.includes('ቴሌቪዥን')
  ) {
    return CATALOG_PRODUCTS.tvs;
  }
  if (
    q.includes('wash') ||
    q.includes('laundry') ||
    q.includes('clean') ||
    q.includes('machine') ||
    q.includes('ማጠቢያ') ||
    q.includes('ልብስ')
  ) {
    return CATALOG_PRODUCTS.washers;
  }
  if (
    q.includes('fridge') ||
    q.includes('refrigerat') ||
    q.includes('cool') ||
    q.includes('freez') ||
    q.includes('water') ||
    q.includes('ፍሪጅ') ||
    q.includes('ማቀዝቀዣ')
  ) {
    return CATALOG_PRODUCTS.fridges;
  }
  if (
    q.includes('stove') ||
    q.includes('cooker') ||
    q.includes('gas') ||
    q.includes('oven') ||
    q.includes('ምድጃ') ||
    q.includes('ጋዝ')
  ) {
    return CATALOG_PRODUCTS.stoves;
  }
  return [];
}

function isAmharicText(text: string): boolean {
  const amharicRegex = /[\u1200-\u137F]/;
  return amharicRegex.test(text);
}

function generateSmartFallbackReply(userQuery: string): { reply: string; products: ProductCard[] } {
  const query = userQuery.toLowerCase();
  const matchedProds = getMatchingProducts(userQuery);
  const isAmharic = isAmharicText(userQuery);

  if (
    query.includes('tv') ||
    query.includes('4k') ||
    query.includes('screen') ||
    query.includes('television') ||
    query.includes('android') ||
    query.includes('ቲቪ') ||
    query.includes('ቴሌቪዥን')
  ) {
    return {
      reply: isAmharic
        ? `📺 **የኦርቢት ስማርት 4K UHD እና QLED ቴሌቪዥኖች**፡
• **Orbit 65" Smart 4K UHD TV** - 95,000 ETB (ከ 110,000 ETB የ 15% ቅናሽ)
• **Orbit 55" Smart 4K UHD TV** - 72,000 ETB
• **Orbit 75" QLED Cinema 4K TV** - 165,000 ETB

✨ **ዋና ባህሪያት**፡ አንድሮይድ TV OS፣ የዶልቢ ሳውንድ ድምፅ፣ የ 2 ዓመት ዋስትና እና በነፃ ግድግዳ ላይ ገጠማ በአዲስ አበባ!`
        : `📺 Here are our top recommended **Orbit Smart 4K UHD & QLED TVs** with Android TV OS, HDR10+, Dolby Audio, 2-Year Warranty, and Free Wall Mount in Addis Ababa:`,
      products: matchedProds,
    };
  }

  if (
    query.includes('wash') ||
    query.includes('laundry') ||
    query.includes('clean') ||
    query.includes('machine') ||
    query.includes('ማጠቢያ') ||
    query.includes('ልብስ')
  ) {
    return {
      reply: isAmharic
        ? `🧺 **የኦርቢት ከፍተኛ ብቃት ያላቸው ልብስ ማጠቢያ ማሽኖች**፡
• **12KG Front Load Smart Washer** - 68,000 ETB (ለትልቅ ቤተሰብ ተመራጭ)
• **8KG Automatic Top Loader Washer** - 45,000 ETB
• **8KG Twin Tub Semi-Auto Washer** - 32,000 ETB

✨ ሁሉም ማሽኖች የካይስ ሞተር፣ አይዝጌ ብረት ከበሮ እና የ 2 ዓመት ዋስትና አላቸው!`
        : `🧺 Here are our high-efficiency **Orbit Washing Machines** equipped with copper motors and stainless steel drums:`,
      products: matchedProds,
    };
  }

  if (
    query.includes('fridge') ||
    query.includes('refrigerat') ||
    query.includes('cool') ||
    query.includes('freez') ||
    query.includes('ፍሪጅ') ||
    query.includes('ማቀዝቀዣ')
  ) {
    return {
      reply: isAmharic
        ? `❄️ **የኦርቢት ፍሪጆች እና የውሃ ማከፋፈያዎች**፡
• **Side-by-Side Refrigerator (520L)** - 115,000 ETB
• **Normal 800 Refrigerator (600L Net)** - 63,000 ETB
• **የሙቅ እና የቀዝቃዛ ውሃ ማከፋፈያ** - 18,500 ETB

✨ የኃይል ቆጣቢ ኢንቨርተር ቴክኖሎጂ እና የ 2 ዓመት ኦፊሴላዊ ዋስትና!`
        : `❄️ Check out these featured **Orbit Premium Inverter Refrigerators & Water Dispensers**:`,
      products: matchedProds,
    };
  }

  if (
    query.includes('stove') ||
    query.includes('cooker') ||
    query.includes('gas') ||
    query.includes('oven') ||
    query.includes('ምድጃ') ||
    query.includes('ጋዝ')
  ) {
    return {
      reply: isAmharic
        ? `🍳 **የኦርቢት የጋዝ ምድጃዎች እና ኦቨን**፡
• **Orbit 4-Burner Gas Cooker Stove** - 34,000 ETB
• **Built-In 4-Burner Glass Stove** - 42,000 ETB
• **Built-In Convection Electric Oven** - 58,000 ETB

✨ ጠንካራ የብረት አካል፣ አውቶማቲክ እሳት ማብሪያ እና የደህንነት መከላከያ ያለው!`
        : `🍳 Here are our heavy-duty **Orbit Gas Cookers & Built-In Ovens**:`,
      products: matchedProds,
    };
  }

  if (
    query.includes('pay') ||
    query.includes('telebirr') ||
    query.includes('chapa') ||
    query.includes('cbe') ||
    query.includes('money') ||
    query.includes('ቴሌብር') ||
    query.includes('ክፍያ')
  ) {
    return {
      reply: `💳 **በኦርቢት ኤሌክትሮኒክስ የሚሰሩ የክፍያ አማራጮች** / **Payment Options**:
1. **ቴሌብር (Telebirr)**፡ በኦርቢት ቢዝነስ ሾርትኮድ በቀላሉ ይክፈሉ።
2. **Chapa**፡ በቪዛ፣ ማስተርካርድ እና የባንክ ካርዶች።
3. **እቃው ሲደርስ የሚከፈል (Cash on Delivery)** በአዲስ አበባ።
4. **የባንክ ሒሳብ ማስተላለፍ**፡ ንግድ ባንክ (CBE)፣ ዳሽን፣ አዋሽ።
5. **በወር ክፍያ (EMI)**፡ እስከ 12 ወር በባንክ ክፍያ!`,
      products: CATALOG_PRODUCTS.tvs.slice(0, 2),
    };
  }

  if (
    query.includes('warrant') ||
    query.includes('guarantee') ||
    query.includes('deliver') ||
    query.includes('location') ||
    query.includes('ዋስትና') ||
    query.includes('ማድረሻ') ||
    query.includes('አዲስ አበባ')
  ) {
    return {
      reply: `🛡️ **የዋስትና እና የማድረሻ መረጃ** / **Warranty & Delivery**:
• **የ 2 ዓመት ኦፊሴላዊ ዋስትና**፡ በሁሉም የኦርቢት እቃዎች ላይ።
• **ፈጣን ማድረስ**፡ በአዲስ አበባ ውስጥ ከ 1 እስከ 2 ቀን ይደርሳል።
• **የደንበኞች አገልግሎት**፡ በ **6226** ይደውሉ!`,
      products: [],
    };
  }

  return {
    reply: isAmharic
      ? `👋 እንኳን ወደ ኦርቢት ኤሌክትሮኒክስ በደህና መጡ! እኔ የኦርቢት AI ረዳት ነኝ።
ስለ ኦርቢት ስማርት 4K ቴሌቪዥኖች፣ ልብስ ማጠቢያዎች፣ ፍሪጆች፣ ምድጃዎች፣ የ 2 ዓመት ዋስትና ወይም በቴሌብር ክፍያ ማንኛውንም ጥያቄ ይጠይቁኝ!`
      : `👋 Welcome to Orbit Electronics Ethiopia! I am Orbit AI. Ask me any question in English or Amharic (አማርኛ) about 4K TVs, washing machines, refrigerators, 2-Year Warranty, or Telebirr payment!`,
    products: CATALOG_PRODUCTS.tvs,
  };
}

export async function POST(req: Request) {
  try {
    const { messages, userQuery } = await req.json();
    const queryToProcess = userQuery || (Array.isArray(messages) && messages.length > 0 ? messages[messages.length - 1].text : '');
    const matchedProds = getMatchingProducts(queryToProcess);

    const systemInstruction = `You are Orbit AI, the official intelligent shopping assistant for Orbit Electronics Ethiopia.
Orbit Electronics is Ethiopia's premier brand for Smart 4K UHD & QLED TVs, washing machines, side-by-side refrigerators, gas cookers, and water dispensers.
Key Info: 2-Year Official Warranty, Express Addis Ababa Delivery (1-2 days), Telebirr & Chapa payments, hotline 6226.
Language Rule: If the user writes or asks in Amharic (አማርኛ / Fidel script), ALWAYS respond in natural, fluent Amharic (አማርኛ). If the user writes in English, respond in English. Always quote prices in ETB.`;

    const contents = [];
    contents.push({
      role: 'user',
      parts: [{ text: systemInstruction }],
    });
    contents.push({
      role: 'model',
      parts: [
        {
          text: 'Understood! I am Orbit AI. If asked in Amharic (አማርኛ), I will reply in fluent Amharic. If asked in English, I will reply in English.',
        },
      ],
    });

    if (Array.isArray(messages) && messages.length > 0) {
      for (const msg of messages) {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        });
      }
    } else if (queryToProcess) {
      contents.push({
        role: 'user',
        parts: [{ text: queryToProcess }],
      });
    }

    // Attempt Gemini API endpoints in order
    for (const endpoint of MODEL_ENDPOINTS) {
      try {
        const apiUrl = `${endpoint}?key=${GEMINI_API_KEY}`;
        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents }),
        });

        if (res.ok) {
          const data = await res.json();
          const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            return NextResponse.json({ reply: replyText, products: matchedProds });
          }
        }
      } catch (e) {
        // Continue to next endpoint attempt
      }
    }

    const fallbackData = generateSmartFallbackReply(queryToProcess);
    return NextResponse.json(fallbackData);
  } catch (error: any) {
    console.error('AI Assistant Route Exception:', error);
    const fallbackData = generateSmartFallbackReply('');
    return NextResponse.json(fallbackData);
  }
}
