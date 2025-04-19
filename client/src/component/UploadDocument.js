import React, { useState, useContext } from 'react';
import { User } from '../context/User';
import { useNavigate } from 'react-router-dom';

const UploadDocument = () => {
  const { newUser } = useContext(User);
  const navigate = useNavigate();
  const userid = newUser.userid;

  const [documents, setDocuments] = useState({
    idCard: null,
    bankPassbook: null
  });
  const [preview, setPreview] = useState({
    idCard: null,
    bankPassbook: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreview(prev => ({
        ...prev,
        [type]: previewUrl
      }));
      // Store file
      setDocuments(prev => ({
        ...prev,
        [type]: file
      }));
    }
  };

  // Add function to convert file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Convert both images to base64
      const idCardBase64 = await convertToBase64(documents.idCard);
      const bankPassbookBase64 = await convertToBase64(documents.bankPassbook);

      // Send base64 strings to server
      const response = await fetch('http://localhost:3500/startups/upload-documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userid,
          idCard: idCardBase64,
          bankPassbook: bankPassbookBase64
        })
      });

      if (response.ok) {
        setSuccess('Documents uploaded successfully! Waiting for verification.');
        console.log('Documents uploaded successfully! Waiting for verification.');
        // navigate('/dashboard');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to upload documents');
      }
    } catch (err) {
      setError('An error occurred while uploading documents');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      maxWidth: '900px',
      margin: '3rem auto',
      padding: '2.5rem',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
    },
    header: {
      textAlign: 'center',
      marginBottom: '3rem',
      color: '#2c3e50'
    },
    title: {
      fontSize: '2.4rem',
      fontWeight: '600',
      marginBottom: '1rem',
      color: '#1a365d'
    },
    subtitle: {
      fontSize: '1.1rem',
      color: '#64748b',
      marginTop: '-0.5rem'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2.5rem'
    },
    uploadSection: {
      backgroundColor: '#f8fafc',
      padding: '2rem',
      borderRadius: '8px',
      border: '2px dashed #e2e8f0'
    },
    sectionTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      marginBottom: '1rem',
      color: '#334155',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    fileInput: {
      width: '100%',
      padding: '1rem',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      backgroundColor: '#ffffff'
    },
    previewContainer: {
      marginTop: '1.5rem',
      padding: '1rem',
      backgroundColor: '#ffffff',
      borderRadius: '6px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
    },
    previewImage: {
      maxWidth: '100%',
      maxHeight: '250px',
      objectFit: 'contain',
      borderRadius: '4px'
    },
    button: {
      padding: '1.2rem',
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1.1rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      marginTop: '1rem',
      boxShadow: '0 2px 4px rgba(59, 130, 246, 0.2)'
    },
    buttonHover: {
      backgroundColor: '#2563eb'
    },
    message: {
      textAlign: 'center',
      padding: '1rem',
      borderRadius: '6px',
      marginBottom: '1.5rem'
    },
    error: {
      backgroundColor: '#fee2e2',
      color: '#dc2626',
      border: '1px solid #fecaca'
    },
    success: {
      backgroundColor: '#dcfce7',
      color: '#16a34a',
      border: '1px solid #bbf7d0'
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Document Verification</h1>
        <p style={styles.subtitle}>Upload your ID card and bank passbook for verification</p>
      </header>

      {error && (
        <div style={{ ...styles.message, ...styles.error }}>
          {error}
        </div>
      )}
      {success && (
        <div style={{ ...styles.message, ...styles.success }}>
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.uploadSection}>
          <h3 style={styles.sectionTitle}>
            <span role="img" aria-label="id-card">🪪</span> ID Card
          </h3>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'idCard')}
            required
            style={styles.fileInput}
          />
          {preview.idCard && (
            <div style={styles.previewContainer}>
              <img
                src={preview.idCard}
                alt="ID Card Preview"
                style={styles.previewImage}
              />
            </div>
          )}
        </div>

        <div style={styles.uploadSection}>
          <h3 style={styles.sectionTitle}>
            <span role="img" aria-label="bank-card">📔</span> Bank Passbook
          </h3>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'bankPassbook')}
            required
            style={styles.fileInput}
          />
          {preview.bankPassbook && (
            <div style={styles.previewContainer}>
              <img
                src={preview.bankPassbook}
                alt="Bank Passbook Preview"
                style={styles.previewImage}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
          onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#2563eb')}
          onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#3b82f6')}
        >
          {loading ? (
            <span>Uploading... 📤</span>
          ) : (
            <span>Upload Documents ✅</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default UploadDocument;