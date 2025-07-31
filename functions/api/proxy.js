// functions/api/proxy.js

export async function onRequest(context) {
  // 處理 CORS 預檢請求 (OPTIONS request)
  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204, // No Content
      headers: {
        'Access-Control-Allow-Origin': '*', // 允許所有來源
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // 允許的方法
        'Access-Control-Allow-Headers': 'Content-Type', // 允許的頭部
        'Access-Control-Max-Age': '86400', // 預檢請求的結果可以快取多久 (秒)
      },
    });
  }

  // 處理實際的 GET 請求
  try {
    const targetUrl = 'http://211.72.66.34:3001/read?topic=P';
    
    const response = await fetch(targetUrl);

    if (!response.ok) {
      return new Response(`舊 API 出錯了: ${response.statusText}`, { status: response.status });
    }

    const headers = new Headers(response.headers);
    headers.set('Access-Control-Allow-Origin', '*'); // 允許所有來源
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: headers,
    });

  } catch (error) {
    console.error('翻譯官出錯了:', error);
    return new Response('翻譯官服務內部出錯了。', { status: 500 });
  }
}
