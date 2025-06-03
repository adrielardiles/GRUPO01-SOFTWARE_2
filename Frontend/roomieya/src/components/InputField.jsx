import React from 'react';

const InputField = ({ label, type, value, onChange }) => {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', color: '#5D4037', marginBottom: '4px' }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: 'rgb(255, 250, 244)',
          border: '1px solid #FFA040',
          borderRadius: '4px',
          color: '#5D4037',
        }}
      />
    </div>
  );
};

export default InputField;
