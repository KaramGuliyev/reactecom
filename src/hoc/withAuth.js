import useAuth from "../customHooks/useAuth";
import { withRouter } from "react-router";

const WithAuth = props => useAuth(props) && props.children;

export default withRouter(WithAuth);