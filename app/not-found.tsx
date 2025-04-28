import Link from 'next/link';
export default function NotFoundPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.text}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/" style={styles.link}>
        Go Back Home
      </Link>
    </div>
  );
}
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
    padding: '20px',
  },
  heading: {
    fontSize: '48px',
    marginBottom: '20px',
    color: '#333',
  },
  text: {
    fontSize: '18px',
    marginBottom: '30px',
    color: '#666',
  },
  link: {
    padding: '10px 20px',
    backgroundColor: '#0070f3',
    color: 'white',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '18px',
  },
};
