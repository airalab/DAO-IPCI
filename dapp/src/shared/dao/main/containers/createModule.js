import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import CreateModule from '../components/createModule';
import Spin from '../../../../shared/components/common/spin'
import { load } from '../../../../modules/dao/actions';

class CreateModuleContainer extends Component {
  componentWillMount() {
    if (!_.isEmpty(this.props.address)) {
      this.props.load(this.props.address)
    }
  }
  render() {
    if (_.isEmpty(this.props.address)) {
      return <p>не выбрано dao</p>
    }
    if (this.props.isLoad) {
      return <CreateModule {...this.props} />
    }
    return <Spin />
  }
}

function mapStateToProps(state, props) {
  let title
  switch (props.module) {
    case 'core':
      title = 'titleCreateCore'
      break
    case 'issuer':
      title = 'titleCreateIssuer'
      break
    case 'auditor':
      title = 'titleCreateAuditor'
      break
    case 'complier':
      title = 'titleCreateComplier'
      break
    case 'market':
      title = 'titleCreateMarket'
      break
    case 'acl':
      title = 'titleCreateAcl'
      break
    case 'token':
      title = 'titleCreateToken'
      break
    case 'tokenAcl':
      title = 'titleCreateTokenAcl'
      break
    case 'docs':
      title = 'titleCreateDocs'
      break
    default:
      title = '';
  }
  return {
    title,
    module: props.module,
    address: state.app.dao_address,
    isLoad: !_.isEmpty(state.dao.name)
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    load
  }, dispatch)
  return {
    load: actions.load
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateModuleContainer)