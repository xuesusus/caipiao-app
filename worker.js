addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // 处理API请求
  if (url.pathname.startsWith('/api/')) {
    const apiUrl = 'http://xueshanyuan.xueshanxin.com:51818' + url.pathname;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    } catch (error) {
      return new Response(JSON.stringify({ success: false, message: error.message }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  }

  // 提供index.html
  const html = await fetch('https://raw.githubusercontent.com/xuesusus/91baipiao/main/templates/index.html')
  if (!html.ok) {
    return new Response('Failed to fetch index.html', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    })
  }
  return new Response(await html.text(), {
    headers: { 'Content-Type': 'text/html' }
  })
}
