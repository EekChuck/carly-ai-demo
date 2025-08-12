import Link from 'next/link';

export default function SimplePage() {
  return (
    <html>
      <head>
        <title>Carly AI Test</title>
      </head>
      <body style={{ backgroundColor: '#111827', color: 'white', padding: '20px' }}>
        <h1>Carly AI Platform</h1>
        <p>If you can see this, the server is working!</p>
        <Link href="/" style={{ color: '#22d3ee' }}>Go to main page</Link>
      </body>
    </html>
  );
}