import React from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { getDocs } from "firebase/firestore";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../Category/collections.component";
import WithSpinner from "../../components/with-spinner/with-Spinner";

import {
  firestore,
  convertCollectionsSnapShotToMap,
} from "../../firebase/firebase.utils";
import { collection, onSnapshot } from "firebase/firestore";
import { updateCollections } from "../../Redux/Shop/shop.action";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  state = {
    loading: true,
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = collection(firestore, "collections");
    // fetch('https://firestore.googleapis.com/v1/projects/ecom-project-40b68/databases/(default)/documents')
    // .then(response=>response.json())
    // .then(collections=>console.log(collections)
    // );

    getDocs(collectionRef).then((snapshot) => {
      const collectionsMap = convertCollectionsSnapShotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    });
  }
    //method using snapshot way to interact with firebase
    // this.unsubscribeFromSnapshot = onSnapshot(collectionRef, (snapshot) => {
    //   const collectionsMap = convertCollectionsSnapShotToMap(snapshot);
    //   updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // });
  

  componentWillUnmount() {
    if (this.unsubscribeFromSnapshot) {
      this.unsubscribeFromSnapshot();
    }
  }

  render() {
    const { loading } = this.state;

    return (
      <div className="shop-page">
        <Routes>
          <Route
            index
            element={<CollectionsOverviewWithSpinner isLoading={loading} />}
          />

          <Route
            path=":collectionId"
            element={<CollectionPageWithSpinner isLoading={loading} />}
          />
        </Routes>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
