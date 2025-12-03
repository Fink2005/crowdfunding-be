import { VocabularyModel } from "@/infrastructure/persistence/models/VocabularyModel";
import { connectDB } from "@/infrastructure/persistence/odm/mongoose";

const vocabularyData = [
  // English to Vietnamese - Basic Greetings
  {
    word: "hello",
    meaning: "xin chào",
    sourceLang: "en",
    targetLang: "vi",
    example: "Hello, how are you?",
  },
  {
    word: "goodbye",
    meaning: "tạm biệt",
    sourceLang: "en",
    targetLang: "vi",
    example: "Goodbye, see you later!",
  },
  {
    word: "thank you",
    meaning: "cảm ơn",
    sourceLang: "en",
    targetLang: "vi",
    example: "Thank you for your help.",
  },
  {
    word: "please",
    meaning: "làm ơn",
    sourceLang: "en",
    targetLang: "vi",
    example: "Please help me.",
  },
  {
    word: "sorry",
    meaning: "xin lỗi",
    sourceLang: "en",
    targetLang: "vi",
    example: "Sorry, I'm late.",
  },

  // English to Vietnamese - Common Words
  {
    word: "water",
    meaning: "nước",
    sourceLang: "en",
    targetLang: "vi",
    example: "Can I have some water?",
  },
  {
    word: "food",
    meaning: "thức ăn",
    sourceLang: "en",
    targetLang: "vi",
    example: "The food is delicious.",
  },
  {
    word: "house",
    meaning: "nhà",
    sourceLang: "en",
    targetLang: "vi",
    example: "This is my house.",
  },
  {
    word: "friend",
    meaning: "bạn bè",
    sourceLang: "en",
    targetLang: "vi",
    example: "She is my friend.",
  },
  {
    word: "family",
    meaning: "gia đình",
    sourceLang: "en",
    targetLang: "vi",
    example: "I love my family.",
  },

  // English to Vietnamese - Numbers
  {
    word: "one",
    meaning: "một",
    sourceLang: "en",
    targetLang: "vi",
    example: "I have one apple.",
  },
  {
    word: "two",
    meaning: "hai",
    sourceLang: "en",
    targetLang: "vi",
    example: "I need two books.",
  },
  {
    word: "three",
    meaning: "ba",
    sourceLang: "en",
    targetLang: "vi",
    example: "There are three cats.",
  },
  {
    word: "four",
    meaning: "bốn",
    sourceLang: "en",
    targetLang: "vi",
    example: "I have four brothers.",
  },
  {
    word: "five",
    meaning: "năm",
    sourceLang: "en",
    targetLang: "vi",
    example: "Give me five minutes.",
  },

  // English to Vietnamese - Verbs
  {
    word: "eat",
    meaning: "ăn",
    sourceLang: "en",
    targetLang: "vi",
    example: "I eat breakfast every morning.",
  },
  {
    word: "drink",
    meaning: "uống",
    sourceLang: "en",
    targetLang: "vi",
    example: "I drink coffee in the morning.",
  },
  {
    word: "sleep",
    meaning: "ngủ",
    sourceLang: "en",
    targetLang: "vi",
    example: "I sleep 8 hours a day.",
  },
  {
    word: "work",
    meaning: "làm việc",
    sourceLang: "en",
    targetLang: "vi",
    example: "I work at a company.",
  },
  {
    word: "study",
    meaning: "học",
    sourceLang: "en",
    targetLang: "vi",
    example: "I study English every day.",
  },

  // English to Vietnamese - Adjectives
  {
    word: "good",
    meaning: "tốt",
    sourceLang: "en",
    targetLang: "vi",
    example: "This is a good book.",
  },
  {
    word: "bad",
    meaning: "xấu",
    sourceLang: "en",
    targetLang: "vi",
    example: "That was a bad idea.",
  },
  {
    word: "beautiful",
    meaning: "đẹp",
    sourceLang: "en",
    targetLang: "vi",
    example: "She is beautiful.",
  },
  {
    word: "big",
    meaning: "lớn",
    sourceLang: "en",
    targetLang: "vi",
    example: "This is a big house.",
  },
  {
    word: "small",
    meaning: "nhỏ",
    sourceLang: "en",
    targetLang: "vi",
    example: "That is a small dog.",
  },

  // English to Vietnamese - Time
  {
    word: "today",
    meaning: "hôm nay",
    sourceLang: "en",
    targetLang: "vi",
    example: "Today is Monday.",
  },
  {
    word: "tomorrow",
    meaning: "ngày mai",
    sourceLang: "en",
    targetLang: "vi",
    example: "See you tomorrow!",
  },
  {
    word: "yesterday",
    meaning: "hôm qua",
    sourceLang: "en",
    targetLang: "vi",
    example: "I saw him yesterday.",
  },
  {
    word: "morning",
    meaning: "buổi sáng",
    sourceLang: "en",
    targetLang: "vi",
    example: "Good morning!",
  },
  {
    word: "night",
    meaning: "buổi tối",
    sourceLang: "en",
    targetLang: "vi",
    example: "Good night!",
  },

  // English to Vietnamese - Places
  {
    word: "school",
    meaning: "trường học",
    sourceLang: "en",
    targetLang: "vi",
    example: "I go to school every day.",
  },
  {
    word: "hospital",
    meaning: "bệnh viện",
    sourceLang: "en",
    targetLang: "vi",
    example: "She works at the hospital.",
  },
  {
    word: "market",
    meaning: "chợ",
    sourceLang: "en",
    targetLang: "vi",
    example: "Let's go to the market.",
  },
  {
    word: "restaurant",
    meaning: "nhà hàng",
    sourceLang: "en",
    targetLang: "vi",
    example: "This restaurant is famous.",
  },
  {
    word: "airport",
    meaning: "sân bay",
    sourceLang: "en",
    targetLang: "vi",
    example: "I'll pick you up at the airport.",
  },

  // Additional words to reach 40+
  {
    word: "love",
    meaning: "yêu",
    sourceLang: "en",
    targetLang: "vi",
    example: "I love you.",
  },
  {
    word: "happy",
    meaning: "vui",
    sourceLang: "en",
    targetLang: "vi",
    example: "I'm so happy!",
  },
  {
    word: "sad",
    meaning: "buồn",
    sourceLang: "en",
    targetLang: "vi",
    example: "Why are you sad?",
  },
  {
    word: "car",
    meaning: "xe hơi",
    sourceLang: "en",
    targetLang: "vi",
    example: "This is my new car.",
  },
  {
    word: "book",
    meaning: "sách",
    sourceLang: "en",
    targetLang: "vi",
    example: "I'm reading a book.",
  },
  {
    word: "phone",
    meaning: "điện thoại",
    sourceLang: "en",
    targetLang: "vi",
    example: "Where is my phone?",
  },
  {
    word: "computer",
    meaning: "máy tính",
    sourceLang: "en",
    targetLang: "vi",
    example: "I work on a computer.",
  },
  {
    word: "money",
    meaning: "tiền",
    sourceLang: "en",
    targetLang: "vi",
    example: "How much money do you have?",
  },
  {
    word: "time",
    meaning: "thời gian",
    sourceLang: "en",
    targetLang: "vi",
    example: "What time is it?",
  },
  {
    word: "people",
    meaning: "người",
    sourceLang: "en",
    targetLang: "vi",
    example: "There are many people here.",
  },

  // Japanese to Vietnamese - Basic Greetings
  {
    word: "こんにちは",
    meaning: "xin chào",
    sourceLang: "ja",
    targetLang: "vi",
    example: "こんにちは、お元気ですか？",
  },
  {
    word: "さようなら",
    meaning: "tạm biệt",
    sourceLang: "ja",
    targetLang: "vi",
    example: "さようなら、また会いましょう。",
  },
  {
    word: "ありがとう",
    meaning: "cảm ơn",
    sourceLang: "ja",
    targetLang: "vi",
    example: "ありがとうございます。",
  },
  {
    word: "すみません",
    meaning: "xin lỗi",
    sourceLang: "ja",
    targetLang: "vi",
    example: "すみません、遅れました。",
  },
  {
    word: "おねがいします",
    meaning: "làm ơn",
    sourceLang: "ja",
    targetLang: "vi",
    example: "お願いします。",
  },

  // Japanese to Vietnamese - Common Words
  {
    word: "みず",
    meaning: "nước",
    sourceLang: "ja",
    targetLang: "vi",
    example: "水を飲みます。",
  },
  {
    word: "たべもの",
    meaning: "thức ăn",
    sourceLang: "ja",
    targetLang: "vi",
    example: "食べ物はおいしいです。",
  },
  {
    word: "いえ",
    meaning: "nhà",
    sourceLang: "ja",
    targetLang: "vi",
    example: "これは私の家です。",
  },
  {
    word: "ともだち",
    meaning: "bạn bè",
    sourceLang: "ja",
    targetLang: "vi",
    example: "彼女は私の友達です。",
  },
  {
    word: "かぞく",
    meaning: "gia đình",
    sourceLang: "ja",
    targetLang: "vi",
    example: "家族が大好きです。",
  },

  // Japanese to Vietnamese - Numbers
  {
    word: "いち",
    meaning: "một",
    sourceLang: "ja",
    targetLang: "vi",
    example: "一つのりんごがあります。",
  },
  {
    word: "に",
    meaning: "hai",
    sourceLang: "ja",
    targetLang: "vi",
    example: "本が二冊必要です。",
  },
  {
    word: "さん",
    meaning: "ba",
    sourceLang: "ja",
    targetLang: "vi",
    example: "猫が三匹います。",
  },
  {
    word: "よん",
    meaning: "bốn",
    sourceLang: "ja",
    targetLang: "vi",
    example: "兄弟が四人います。",
  },
  {
    word: "ご",
    meaning: "năm",
    sourceLang: "ja",
    targetLang: "vi",
    example: "五分待ってください。",
  },

  // Japanese to Vietnamese - Verbs
  {
    word: "たべる",
    meaning: "ăn",
    sourceLang: "ja",
    targetLang: "vi",
    example: "毎朝朝ごはんを食べます。",
  },
  {
    word: "のむ",
    meaning: "uống",
    sourceLang: "ja",
    targetLang: "vi",
    example: "朝コーヒーを飲みます。",
  },
  {
    word: "ねる",
    meaning: "ngủ",
    sourceLang: "ja",
    targetLang: "vi",
    example: "毎日8時間寝ます。",
  },
  {
    word: "はたらく",
    meaning: "làm việc",
    sourceLang: "ja",
    targetLang: "vi",
    example: "会社で働いています。",
  },
  {
    word: "べんきょうする",
    meaning: "học",
    sourceLang: "ja",
    targetLang: "vi",
    example: "毎日日本語を勉強します。",
  },

  // Japanese to Vietnamese - Adjectives
  {
    word: "いい",
    meaning: "tốt",
    sourceLang: "ja",
    targetLang: "vi",
    example: "これはいい本です。",
  },
  {
    word: "わるい",
    meaning: "xấu",
    sourceLang: "ja",
    targetLang: "vi",
    example: "悪い考えでした。",
  },
  {
    word: "きれい",
    meaning: "đẹp",
    sourceLang: "ja",
    targetLang: "vi",
    example: "彼女はきれいです。",
  },
  {
    word: "おおきい",
    meaning: "lớn",
    sourceLang: "ja",
    targetLang: "vi",
    example: "大きい家です。",
  },
  {
    word: "ちいさい",
    meaning: "nhỏ",
    sourceLang: "ja",
    targetLang: "vi",
    example: "小さい犬です。",
  },

  // Japanese to Vietnamese - Time
  {
    word: "きょう",
    meaning: "hôm nay",
    sourceLang: "ja",
    targetLang: "vi",
    example: "今日は月曜日です。",
  },
  {
    word: "あした",
    meaning: "ngày mai",
    sourceLang: "ja",
    targetLang: "vi",
    example: "明日会いましょう！",
  },
  {
    word: "きのう",
    meaning: "hôm qua",
    sourceLang: "ja",
    targetLang: "vi",
    example: "昨日彼に会いました。",
  },
  {
    word: "あさ",
    meaning: "buổi sáng",
    sourceLang: "ja",
    targetLang: "vi",
    example: "おはようございます！",
  },
  {
    word: "よる",
    meaning: "buổi tối",
    sourceLang: "ja",
    targetLang: "vi",
    example: "おやすみなさい！",
  },

  // Japanese to Vietnamese - Places
  {
    word: "がっこう",
    meaning: "trường học",
    sourceLang: "ja",
    targetLang: "vi",
    example: "毎日学校に行きます。",
  },
  {
    word: "びょういん",
    meaning: "bệnh viện",
    sourceLang: "ja",
    targetLang: "vi",
    example: "彼女は病院で働いています。",
  },
  {
    word: "いちば",
    meaning: "chợ",
    sourceLang: "ja",
    targetLang: "vi",
    example: "市場に行きましょう。",
  },
  {
    word: "レストラン",
    meaning: "nhà hàng",
    sourceLang: "ja",
    targetLang: "vi",
    example: "このレストランは有名です。",
  },
  {
    word: "くうこう",
    meaning: "sân bay",
    sourceLang: "ja",
    targetLang: "vi",
    example: "空港で迎えに行きます。",
  },

  // Japanese to Vietnamese - Additional words
  {
    word: "あい",
    meaning: "yêu",
    sourceLang: "ja",
    targetLang: "vi",
    example: "愛しています。",
  },
  {
    word: "うれしい",
    meaning: "vui",
    sourceLang: "ja",
    targetLang: "vi",
    example: "とても嬉しいです！",
  },
  {
    word: "かなしい",
    meaning: "buồn",
    sourceLang: "ja",
    targetLang: "vi",
    example: "なぜ悲しいですか？",
  },
  {
    word: "くるま",
    meaning: "xe hơi",
    sourceLang: "ja",
    targetLang: "vi",
    example: "これは私の新しい車です。",
  },
  {
    word: "ほん",
    meaning: "sách",
    sourceLang: "ja",
    targetLang: "vi",
    example: "本を読んでいます。",
  },
  {
    word: "でんわ",
    meaning: "điện thoại",
    sourceLang: "ja",
    targetLang: "vi",
    example: "電話はどこですか？",
  },
  {
    word: "コンピューター",
    meaning: "máy tính",
    sourceLang: "ja",
    targetLang: "vi",
    example: "コンピューターで仕事をします。",
  },
  {
    word: "おかね",
    meaning: "tiền",
    sourceLang: "ja",
    targetLang: "vi",
    example: "お金はいくらありますか？",
  },
  {
    word: "じかん",
    meaning: "thời gian",
    sourceLang: "ja",
    targetLang: "vi",
    example: "今何時ですか？",
  },
  {
    word: "ひと",
    meaning: "người",
    sourceLang: "ja",
    targetLang: "vi",
    example: "ここにたくさんの人がいます。",
  },

  // English to Japanese - Basic Greetings
  {
    word: "hello",
    meaning: "こんにちは",
    sourceLang: "en",
    targetLang: "ja",
    example: "Hello, how are you?",
  },
  {
    word: "goodbye",
    meaning: "さようなら",
    sourceLang: "en",
    targetLang: "ja",
    example: "Goodbye, see you later!",
  },
  {
    word: "thank you",
    meaning: "ありがとう",
    sourceLang: "en",
    targetLang: "ja",
    example: "Thank you for your help.",
  },
  {
    word: "sorry",
    meaning: "すみません",
    sourceLang: "en",
    targetLang: "ja",
    example: "Sorry, I'm late.",
  },
  {
    word: "please",
    meaning: "おねがいします",
    sourceLang: "en",
    targetLang: "ja",
    example: "Please help me.",
  },

  // English to Japanese - Common Words
  {
    word: "water",
    meaning: "みず",
    sourceLang: "en",
    targetLang: "ja",
    example: "Can I have some water?",
  },
  {
    word: "food",
    meaning: "たべもの",
    sourceLang: "en",
    targetLang: "ja",
    example: "The food is delicious.",
  },
  {
    word: "house",
    meaning: "いえ",
    sourceLang: "en",
    targetLang: "ja",
    example: "This is my house.",
  },
  {
    word: "friend",
    meaning: "ともだち",
    sourceLang: "en",
    targetLang: "ja",
    example: "She is my friend.",
  },
  {
    word: "family",
    meaning: "かぞく",
    sourceLang: "en",
    targetLang: "ja",
    example: "I love my family.",
  },

  // English to Japanese - Numbers
  {
    word: "one",
    meaning: "いち",
    sourceLang: "en",
    targetLang: "ja",
    example: "I have one apple.",
  },
  {
    word: "two",
    meaning: "に",
    sourceLang: "en",
    targetLang: "ja",
    example: "I need two books.",
  },
  {
    word: "three",
    meaning: "さん",
    sourceLang: "en",
    targetLang: "ja",
    example: "There are three cats.",
  },
  {
    word: "four",
    meaning: "よん",
    sourceLang: "en",
    targetLang: "ja",
    example: "I have four brothers.",
  },
  {
    word: "five",
    meaning: "ご",
    sourceLang: "en",
    targetLang: "ja",
    example: "Give me five minutes.",
  },

  // English to Japanese - Verbs
  {
    word: "eat",
    meaning: "たべる",
    sourceLang: "en",
    targetLang: "ja",
    example: "I eat breakfast every morning.",
  },
  {
    word: "drink",
    meaning: "のむ",
    sourceLang: "en",
    targetLang: "ja",
    example: "I drink coffee in the morning.",
  },
  {
    word: "sleep",
    meaning: "ねる",
    sourceLang: "en",
    targetLang: "ja",
    example: "I sleep 8 hours a day.",
  },
  {
    word: "work",
    meaning: "はたらく",
    sourceLang: "en",
    targetLang: "ja",
    example: "I work at a company.",
  },
  {
    word: "study",
    meaning: "べんきょうする",
    sourceLang: "en",
    targetLang: "ja",
    example: "I study Japanese every day.",
  },

  // English to Japanese - Adjectives
  {
    word: "good",
    meaning: "いい",
    sourceLang: "en",
    targetLang: "ja",
    example: "This is a good book.",
  },
  {
    word: "bad",
    meaning: "わるい",
    sourceLang: "en",
    targetLang: "ja",
    example: "That was a bad idea.",
  },
  {
    word: "beautiful",
    meaning: "きれい",
    sourceLang: "en",
    targetLang: "ja",
    example: "She is beautiful.",
  },
  {
    word: "big",
    meaning: "おおきい",
    sourceLang: "en",
    targetLang: "ja",
    example: "This is a big house.",
  },
  {
    word: "small",
    meaning: "ちいさい",
    sourceLang: "en",
    targetLang: "ja",
    example: "That is a small dog.",
  },

  // English to Japanese - Time
  {
    word: "today",
    meaning: "きょう",
    sourceLang: "en",
    targetLang: "ja",
    example: "Today is Monday.",
  },
  {
    word: "tomorrow",
    meaning: "あした",
    sourceLang: "en",
    targetLang: "ja",
    example: "See you tomorrow!",
  },
  {
    word: "yesterday",
    meaning: "きのう",
    sourceLang: "en",
    targetLang: "ja",
    example: "I saw him yesterday.",
  },
  {
    word: "morning",
    meaning: "あさ",
    sourceLang: "en",
    targetLang: "ja",
    example: "Good morning!",
  },
  {
    word: "night",
    meaning: "よる",
    sourceLang: "en",
    targetLang: "ja",
    example: "Good night!",
  },

  // English to Japanese - Places
  {
    word: "school",
    meaning: "がっこう",
    sourceLang: "en",
    targetLang: "ja",
    example: "I go to school every day.",
  },
  {
    word: "hospital",
    meaning: "びょういん",
    sourceLang: "en",
    targetLang: "ja",
    example: "She works at the hospital.",
  },
  {
    word: "market",
    meaning: "いちば",
    sourceLang: "en",
    targetLang: "ja",
    example: "Let's go to the market.",
  },
  {
    word: "restaurant",
    meaning: "レストラン",
    sourceLang: "en",
    targetLang: "ja",
    example: "This restaurant is famous.",
  },
  {
    word: "airport",
    meaning: "くうこう",
    sourceLang: "en",
    targetLang: "ja",
    example: "I'll pick you up at the airport.",
  },

  // English to Japanese - Additional
  {
    word: "love",
    meaning: "あい",
    sourceLang: "en",
    targetLang: "ja",
    example: "I love you.",
  },
  {
    word: "happy",
    meaning: "うれしい",
    sourceLang: "en",
    targetLang: "ja",
    example: "I'm so happy!",
  },
  {
    word: "sad",
    meaning: "かなしい",
    sourceLang: "en",
    targetLang: "ja",
    example: "Why are you sad?",
  },
  {
    word: "car",
    meaning: "くるま",
    sourceLang: "en",
    targetLang: "ja",
    example: "This is my new car.",
  },
  {
    word: "book",
    meaning: "ほん",
    sourceLang: "en",
    targetLang: "ja",
    example: "I'm reading a book.",
  },

  // Vietnamese to English - Basic
  {
    word: "xin chào",
    meaning: "hello",
    sourceLang: "vi",
    targetLang: "en",
    example: "Xin chào, bạn khỏe không?",
  },
  {
    word: "tạm biệt",
    meaning: "goodbye",
    sourceLang: "vi",
    targetLang: "en",
    example: "Tạm biệt, hẹn gặp lại!",
  },
  {
    word: "cảm ơn",
    meaning: "thank you",
    sourceLang: "vi",
    targetLang: "en",
    example: "Cảm ơn sự giúp đỡ của bạn.",
  },
  {
    word: "xin lỗi",
    meaning: "sorry",
    sourceLang: "vi",
    targetLang: "en",
    example: "Xin lỗi, tôi đến muộn.",
  },
  {
    word: "làm ơn",
    meaning: "please",
    sourceLang: "vi",
    targetLang: "en",
    example: "Làm ơn giúp tôi.",
  },

  // Vietnamese to Japanese - Basic
  {
    word: "xin chào",
    meaning: "こんにちは",
    sourceLang: "vi",
    targetLang: "ja",
    example: "Xin chào, bạn khỏe không?",
  },
  {
    word: "tạm biệt",
    meaning: "さようなら",
    sourceLang: "vi",
    targetLang: "ja",
    example: "Tạm biệt, hẹn gặp lại!",
  },
  {
    word: "cảm ơn",
    meaning: "ありがとう",
    sourceLang: "vi",
    targetLang: "ja",
    example: "Cảm ơn sự giúp đỡ của bạn.",
  },
  {
    word: "xin lỗi",
    meaning: "すみません",
    sourceLang: "vi",
    targetLang: "ja",
    example: "Xin lỗi, tôi đến muộn.",
  },
  {
    word: "làm ơn",
    meaning: "おねがいします",
    sourceLang: "vi",
    targetLang: "ja",
    example: "Làm ơn giúp tôi.",
  },
];

async function seedVocabulary() {
  try {
    console.log("🌱 Starting vocabulary seed...");

    await connectDB();
    console.log("✅ Connected to database");
    await VocabularyModel.deleteMany({});

    console.log("🗑️  Cleared existing vocabulary data");

    const result = await VocabularyModel.insertMany(vocabularyData);
    console.log(`✅ Successfully seeded ${result.length} vocabulary words`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding vocabulary:", error);
    process.exit(1);
  }
}

seedVocabulary();
