import React, { useState, useContext, useEffect } from 'react';
import { User } from '../context/User';

const UploadDocument = () => {
  const { newUser } = useContext(User);
  const userid = newUser.userid;

  const [documents, setDocuments] = useState({
    idCard: null,
    bankPassbook: null,
    pdfDocument: null
  });
  const [preview, setPreview] = useState({
    idCard: null,
    bankPassbook: null,
    pdfDocument: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      // Revoke previous object URL to prevent memory leaks
      if (preview[type]) {
        URL.revokeObjectURL(preview[type]);
      }
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

  // Cleanup function to revoke object URLs when component unmounts
  useEffect(() => {
    return () => {
      // Cleanup all preview URLs
      if (preview.idCard) URL.revokeObjectURL(preview.idCard);
      if (preview.bankPassbook) URL.revokeObjectURL(preview.bankPassbook);
      if (preview.pdfDocument) URL.revokeObjectURL(preview.pdfDocument);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Create a new FormData object
      const formData = new FormData();

      // Append the files and userid
      formData.append('userid', userid);
      formData.append('idCard', documents.idCard);
      formData.append('bankPassbook', documents.bankPassbook);
      formData.append('pdfDocument', documents.pdfDocument);

      // Log what we're sending
      console.log('Sending userid:', userid);
      console.log('Sending idCard:', documents.idCard?.name);
      console.log('Sending bankPassbook:', documents.bankPassbook?.name);
      console.log('Sending pdfDocument:', documents.pdfDocument?.name);

      const response = await fetch('http://localhost:3500/startups1/upload-documents', {
        method: 'POST',
        // Do not set Content-Type header - the browser will set it automatically with boundary
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        let msg = 'Documents uploaded successfully! Waiting for verification.';
        if (data.idCardLink) {
          msg += ' ID Card Link: ' + data.idCardLink;
        }
        if (data.bankPassbookLink) {
          msg += ' Bank Passbook Link: ' + data.bankPassbookLink;
        }
        if (data.pdfDocumentLink) {
          msg += ' PDF Document Link: ' + data.pdfDocumentLink;
        }
        setSuccess(msg);
        console.log('Upload successful:', data);
      } else {
        setError(data.message || 'Failed to upload documents');
        console.error('Upload failed:', data);
      }
    } catch (err) {
      setError('An error occurred while uploading documents');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-12 p-10 bg-white rounded-xl shadow-lg">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-semibold mb-4 text-indigo-900">Document Verification</h1>
        <p className="text-lg text-slate-600">Upload your ID card, bank passbook, and PDF document for verification</p>
      </header>

      {error && (
        <div className="text-center p-4 mb-6 rounded-md bg-red-50 text-red-700 border border-red-200">
          {error}
        </div>
      )}
      {success && (
        <div className="text-center p-4 mb-6 rounded-md bg-green-50 text-green-700 border border-green-200">
          {success}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-10"
        encType="multipart/form-data"
      >
        <div className="bg-slate-50 p-8 rounded-lg border-2 border-dashed border-slate-300">
          <h3 className="text-xl font-semibold mb-4 text-slate-700 flex items-center gap-2">
            <span role="img" aria-label="id-card">🪪</span> ID Card
          </h3>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => handleFileChange(e, 'idCard')}
            required
            className="w-full p-4 border border-slate-300 rounded-md bg-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer"
          />
          {preview.idCard && (
            <div className="mt-6 p-4 bg-white rounded-md shadow-sm">
              <img
                src={preview.idCard}
                alt="ID Card Preview"
                className="max-w-full max-h-64 object-contain rounded mx-auto"
              />
            </div>
          )}
        </div>

        <div className="bg-slate-50 p-8 rounded-lg border-2 border-dashed border-slate-300">
          <h3 className="text-xl font-semibold mb-4 text-slate-700 flex items-center gap-2">
            <span role="img" aria-label="bank-card">📔</span> Bank Passbook
          </h3>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => handleFileChange(e, 'bankPassbook')}
            required
            className="w-full p-4 border border-slate-300 rounded-md bg-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer"
          />
          {preview.bankPassbook && (
            <div className="mt-6 p-4 bg-white rounded-md shadow-sm">
              <img
                src={preview.bankPassbook}
                alt="Bank Passbook Preview"
                className="max-w-full max-h-64 object-contain rounded mx-auto"
              />
            </div>
          )}
        </div>

        <div className="bg-slate-50 p-8 rounded-lg border-2 border-dashed border-slate-300">
          <h3 className="text-xl font-semibold mb-4 text-slate-700 flex items-center gap-2">
            <span role="img" aria-label="pdf-document">📄</span> PDF Document
          </h3>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => handleFileChange(e, 'pdfDocument')}
            required
            className="w-full p-4 border border-slate-300 rounded-md bg-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer"
          />
          {preview.pdfDocument && (
            <div className="mt-6 p-4 bg-white rounded-md shadow-sm">
              <object
                data={preview.pdfDocument}
                type="application/pdf"
                width="100%"
                height="250px"
                className="rounded"
              >
                <p>PDF Preview not available. <a href={preview.pdfDocument} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Click to view</a></p>
              </object>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`p-5 text-white font-medium text-lg rounded-lg transition-all duration-200 mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            loading
              ? 'bg-blue-400 cursor-not-allowed opacity-70'
              : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
          }`}
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