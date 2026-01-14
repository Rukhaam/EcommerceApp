import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCollectionFetching } from "../../Redux/Shop/shop.selector";
import WithSpinner from "../with-spinner/with-Spinner";
import CollectionsOverview from "./collections-overview.component";
import { compose } from "redux";
const mapStateToProps = createStructuredSelector(
    {  isLoading : selectCollectionFetching,

    }

)
 const CollectionsOverviewContainer =compose( connect(mapStateToProps),
WithSpinner
)(CollectionsOverview);
export default CollectionsOverviewContainer;