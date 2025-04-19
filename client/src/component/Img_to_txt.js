// ImgConverter.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { User } from "../context/User";
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/build/pdf';

// Use worker from public folder
GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.js`;

const ImgConverter = () => {
  const [extractedText, setExtractedText] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
    setExtractedText('');
  };

  const newUser = useContext(User);
  const userid = newUser.userid;
  console.log("User:", newUser);

  const extractTextFromPDF = async (file) => {
    const fileReader = new FileReader();

    return new Promise((resolve, reject) => {
      fileReader.onload = async () => {
        try {
          const typedarray = new Uint8Array(fileReader.result);
          const pdf = await getDocument({ data: typedarray }).promise;
          let fullText = '';

          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += `Page ${pageNum}:\n${pageText}\n\n`;
          }
          resolve(fullText);
        } catch (error) {
          reject(error);
        }
      };

      fileReader.onerror = (error) => reject(error);
      fileReader.readAsArrayBuffer(file);
    });
  };

  const handleExtract = async () => {
    if (!pdfFile) {
      alert('Please select a PDF file first.');
      return;
    }

    setLoading(true);
    try {
      // Extract text from PDF
      const text = await extractTextFromPDF(pdfFile);
      setExtractedText(text);

      // Send extracted text along with userid to /img/pitch route
      const payload = { userid, pitch: text };
      const response = await axios.post('/img/pitch', payload);
      console.log('Pitch sent successfully:', response.data);
    } catch (error) {
      console.error('Error extracting text or sending pitch:', error);
      setExtractedText('❌ Failed to extract or send text from PDF.');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: 'auto' }}>
      <h1 style={{ marginBottom: '1rem' }}>📄 PDF Text Extractor</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button
        onClick={handleExtract}
        disabled={loading}
        style={{
          marginLeft: '1rem',
          padding: '0.5rem 1rem',
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px'
        }}
      >
        {loading ? 'Extracting...' : 'Extract Text'}
      </button>
      <div
        style={{
          marginTop: '2rem',
          background: '#f9f9f9',
          padding: '1rem',
          border: '1px solid #ccc',
          whiteSpace: 'pre-wrap',
          maxHeight: '500px',
          overflowY: 'scroll'
        }}
      >
        {extractedText}
      </div>
    </div>
  );
};

export default ImgConverter;
