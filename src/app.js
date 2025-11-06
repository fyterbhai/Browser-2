import React, { useState, useRef } from 'react';

export default function App() {
  const [url, setUrl] = useState('https://www.facebook.com');
  const iframeRef = useRef(null);
  const [scriptFile, setScriptFile] = useState(null);

  const handleGo = () => {
    let tempUrl = url.trim();
    if (!tempUrl.startsWith('http://') && !tempUrl.startsWith('https://')) {
      tempUrl = 'https://' + tempUrl;
    }
    setUrl(tempUrl);
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setScriptFile(file);
      alert(`Automation file uploaded: ${file.name}`);
    }
  };

  const runAutomation = () => {
    if (!scriptFile) {
      alert('पहले स्क्रिप्ट फाइल अपलोड करें');
      return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        alert('Automation script preview (पहले 200 कैरेक्टर):

' + e.target.result.slice(0, 200) + '...');
      } catch(err) {
        alert('स्क्रिप्ट चलाने में त्रुटि: ' + err.message);
      }
    };
    reader.readAsText(scriptFile);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: '#222', padding: '10px', display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="URL दर्ज करें (जैसे facebook.com)"
          style={{ flex: 1, fontSize: '16px', padding: '8px', borderRadius: '4px', border: 'none' }}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleGo()}
        />
        <button onClick={handleGo} style={{ marginLeft: '10px', padding: '8px 16px', fontSize: '16px' }}>
          Go
        </button>
        <input
          type="file"
          accept=".js,.zip"
          style={{ marginLeft: '20px' }}
          onChange={handleFileChange}
          title="ऑटोमेशन स्क्रिप्ट/ज़िप अपलोड करें"
        />
        <button onClick={runAutomation} style={{ marginLeft: '10px', padding: '8px 16px', fontSize: '16px' }}>
          ऑटोमेशन चलाएं
        </button>
      </div>
      <iframe
        ref={iframeRef}
        src={url}
        title="Browser Frame"
        style={{ flex: 1, border: 'none', width: '100%' }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      ></iframe>
    </div>
  );
  }
