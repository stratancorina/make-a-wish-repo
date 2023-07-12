import React, { useEffect, useState } from 'react';
import Select from 'react-select';

function DarkMode() {
  const [selectedTheme, setSelectedTheme] = useState(localStorage.getItem('selectedTheme'));

  const options = [
    { value: 'default', label: 'Default' },
    { value: 'dark', label: 'Dark' },
    { value: 'soft', label: 'Soft' },
  ];

  const setTheme = (value) => {
    document.querySelector('body').setAttribute('data-theme', value);
    localStorage.setItem('selectedTheme', value);
    setSelectedTheme(value);
  };

  useEffect(() => {
    const theme = localStorage.getItem('selectedTheme');
    if (theme) {
      setTheme(theme);
    }
  }, []);

  const handleThemeChange = (selectedOption) => {
    const value = selectedOption.value;
    setTheme(value);
  };

  return (
    <div className="dark-mode">
      <Select
        className="dark_mode_dropdown"
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: 'var(--light-purple2)',
            primary: 'var(--light-purple)',
          },
        })}
        styles={{
          option: (base) => ({
            ...base,
            border: `none`,
            height: '100%',
            color: 'var(--pink)'
            // background: 'var(--purple)'
          }),
          control:(base)=>({
            ...base,
            background: 'var(--nav-background)',
            border: 'none'
            
          }),
          menu:(base)=> ({
            ...base,
            background: 'var(--light-pink)',

          })
          
        }}
        options={options}
        value={selectedTheme ? { value: selectedTheme, label: selectedTheme } : null}
        onChange={handleThemeChange}
      />
    </div>
  );
}

export default DarkMode;
