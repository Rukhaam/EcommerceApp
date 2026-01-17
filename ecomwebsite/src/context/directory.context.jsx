import React, { createContext, useState } from 'react';

// Move your data here
export const DirectoryContext = createContext({
  sections: []
});

const DIRECTORY_DATA = [
  {
    title: "hats",
    imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
    id: 1,
    LinkUrl: 'shop/hats' 
  },
  {
    title: "sneakers",
    imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
    id: 2,
    LinkUrl: 'shop/sneakers'
  },
  {
    title: "jackets",
    imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
    id: 3,
    LinkUrl: 'shop/jackets'
  },
  {
    title: "womens",
    imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
    size: "large",
    id: 4,
    LinkUrl: 'shop/womens'
  },
  {
    title: "mens",
    imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
    size: "large",
    id: 5,
    LinkUrl: 'shop/mens'
  },
];

export const DirectoryProvider = ({ children }) => {
  const [sections] = useState(DIRECTORY_DATA);
  const value = { sections };

  return (
    <DirectoryContext.Provider value={value}>
      {children}
    </DirectoryContext.Provider>
  );
};