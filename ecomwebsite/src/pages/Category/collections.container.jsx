import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCollectionFetching } from "../../Redux/Shop/shop.selector";
import WithSpinner from "../../components/with-spinner/with-Spinner";
import CollectionPage from "./collections.component";
import { compose } from "redux";
const mapStateToProps = createStructuredSelector({
  isLoading: (state) => selectCollectionFetching(state),
});
const CollectionsPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionPage);
export default CollectionsPageContainer;
