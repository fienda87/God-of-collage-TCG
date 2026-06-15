import React from 'react';
import StaggeredMenu from './StaggeredMenu';

export const Navbar: React.FC = () => {
  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'Koleksi', ariaLabel: 'View collection', link: '/collection' },
    { label: 'Binder', ariaLabel: 'View binder', link: '/binders' },
    { label: 'Battle Online', ariaLabel: 'Play online battle', link: '/battle' },
    { label: 'Aturan', ariaLabel: 'Read rules', link: '/rules' },
  ];

  const socialItems = [
    { label: 'Instagram', link: '#' },
    { label: 'Discord', link: '#' },
  ];

  return (
    <StaggeredMenu
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      menuButtonColor="#fff"
      openMenuButtonColor="#000"
      changeMenuColorOnOpen={true}
      colors={['#1b5bff', '#7333f1', '#fe2f2f']} // Cobalt, Purple, Red from the brief
      accentColor="#5227FF"
      isFixed={true}
    />
  );
};
