import { connect } from "react-redux"
import { compose } from "redux"
import Profile from "./Profile"
import withRouter from "../../hocs/withRouter"
import withRedirect from "../../hocs/withRedirect"

const ProfileContainer = compose(
    withRouter,
    withRedirect
)(Profile)
export default ProfileContainer