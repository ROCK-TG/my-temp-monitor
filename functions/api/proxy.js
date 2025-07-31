// 我的網頁專案/functions/api/proxy.js

// 這是您的翻譯官，它會收到您的網站請求
export async function onRequest(context) {
  try {
    // 這是那個舊的 API 網址，翻譯官會去訪問它
    const targetUrl = 'http://211.72.66.34:3001/read?topic=P';

    // 翻譯官去舊 API 網址拿資料
    const response = await fetch(targetUrl);

    // 如果舊 API 回應有問題，翻譯官也會告訴您
    if (!response.ok) {
      return new Response(`舊 API 出錯了: ${response.statusText}`, { status: response.status });
    }

    // 翻譯官把收到的資料，準備好回傳給您的網站
    // 特別注意：這裡多做了一些設定，讓您的網站能順利收到資料
    const headers = new Headers(response.headers);
    headers.set('Access-Control-Allow-Origin', '*'); // 允許任何來源的網頁都可以訪問這個代理
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');

    // 翻譯官把資料回傳給您的網站
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: headers,
    });

  } catch (error) {
    // 如果翻譯官自己出了什麼問題，也會告訴您
    console.error('翻譯官出錯了:', error);
    return new Response('翻譯官服務內部出錯了。', { status: 500 });
  }
}