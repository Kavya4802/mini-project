import React, { useEffect } from 'react';

const BotpressWebchat = () => {
  useEffect(() => {
    // Load Botpress Webchat inject.js
    const injectScript = document.createElement('script');
    injectScript.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
    injectScript.async = true;
    document.head.appendChild(injectScript);

    // Load Botpress Webchat config.js
    const configScript = document.createElement('script');
    configScript.src = 'https://mediafiles.botpress.cloud/a935ad50-6a50-4d0c-8a86-0e26a6e416a1/webchat/config.js';
    configScript.defer = true;
    document.head.appendChild(configScript);

    // Cleanup on component unmount
    return () => {
      document.head.removeChild(injectScript);
      document.head.removeChild(configScript);
    };
  }, []); // Empty dependency array ensures the scripts are loaded only once when the component mounts

  return (
    <div>
      {/* Your React component content */}
    </div>
  );
};

export default BotpressWebchat;
