import React from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { fetchCollectionsStart } from "../../Redux/Shop/shop.action";
import { selectCollectionFetching } from "../../Redux/Shop/shop.selector";

import CollectionsOverviewContainer from "../../components/collections-overview/collection-overview.container";
import CollectionsPageContainer from "../Category/collections.container";

class ShopPage extends React.Component {
  componentDidMount() {
    this.props.fetchCollectionsStart(); // ✅ dispatches plain object
  }

  render() {
    return (
      <div className="shop-page">
        <Routes>
          <Route index element={<CollectionsOverviewContainer />} />
          <Route path=":collectionId" element={<CollectionsPageContainer />} />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectCollectionFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
