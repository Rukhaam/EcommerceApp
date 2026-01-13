import React from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../Category/collections.component";
import WithSpinner from "../../components/with-spinner/with-Spinner";
import { fetchCollectionsStartAsync } from "../../Redux/Shop/shop.action";
import { selectCollectionFetching } from "../../Redux/Shop/shop.selector";
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }
  render() {
    const { isCollectionFetching } = this.props;
    return (
      <div className="shop-page">
        <Routes>
          <Route
            index
            element={
              <CollectionsOverviewWithSpinner
                isLoading={isCollectionFetching}
           
              />
            }
          />
          <Route
            path=":collectionId"
            element={
              <CollectionPageWithSpinner
                isLoading={isCollectionFetching}
              
              />
            }
          />
        </Routes>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectCollectionFetching,
});
const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
