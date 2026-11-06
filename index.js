export default {
  async fetch(request) {
    const url = new URL(request.url);
    const targetUrl = 'https://mathsspot.com' + url.pathname + url.search;

    const headers = new Headers(request.headers);

    // Limpa headers de forwarding
    headers.delete('X-Forwarded-For');
    headers.delete('X-Real-IP');
    headers.delete('Via');
    headers.delete('Host');

    const modifiedRequest = new Request(targetUrl, {
      method: request.method,
      headers: headers,
      body: request.body,
      redirect: 'follow',
    });

    return fetch(modifiedRequest);
  }
};
