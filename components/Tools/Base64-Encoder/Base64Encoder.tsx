import { useState } from 'react';

export default function Base64Encoder() {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');

  const handleEncode = () => {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
    } catch (error) {
      setOutput('Encoding error: Invalid input!');
    }
  };

  const handleDecode = () => {
    try {
      const decoded = atob(input);
      setOutput(decoded);
    } catch (error) {
      setOutput('Decoding error: Invalid input!');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Base64 Encoder / Decoder</h1>
      <textarea
        style={styles.textarea}
        placeholder="Enter your text here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleEncode}>
          Encode
        </button>
        <button style={styles.button} onClick={handleDecode}>
          Decode
        </button>
      </div>
      <textarea
        style={styles.textarea}
        placeholder="Result will appear here..."
        value={output}
        readOnly
      />
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  heading: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#333',
  },
  textarea: {
    width: '100%',
    height: '120px',
    padding: '10px',
    fontSize: '16px',
    marginBottom: '20px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    resize: 'none',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#0070f3',
    color: 'white',
    transition: 'background-color 0.3s',
  },
};
