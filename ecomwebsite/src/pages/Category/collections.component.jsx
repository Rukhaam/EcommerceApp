import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCollection } from "../../Redux/Shop/shop.selector";
import CollectionItem from "../../components/collection-item/collection-item.component";

import "./collections.styles.scss";

const CollectionPage = () => {
  const { collectionId } = useParams(); // ✅ v6 replacement for match.params

  const collection = useSelector(
    (state) => selectCollection(collectionId)(state)
  );

  if (!collection) return <div>Loading...</div>;

  const { title, items } = collection;

  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
