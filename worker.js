addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // 处理API请求
  if (url.pathname.startsWith('/api/')) {
    return new Response('API endpoint not available in static deployment', {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    })
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
