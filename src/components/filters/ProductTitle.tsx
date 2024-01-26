import React from 'react'

interface TitleProps{
  title: string;
}

function ProductTitle({title}:TitleProps) {

  return (
    <div>
      <input type="text" value="search" />
      <button>Search</button>
    </div>
  );
}

export default ProductTitle;