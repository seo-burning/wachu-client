import React from 'react';
import { WebView, BackHandler, WEBVIEW_REF } from 'react-native';
class WebViewPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      canGoBack: false,
    };
    this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.BackHandlerEvent);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress');
  }

  BackHandlerEvent = () => {
    if (this.state.canGoBack) {
      this.refs.WEBVIEW_REF.goBack();
      return true;
    }
    return false;
  };

  onNavigationStateChange(navState) {
    //   TODO in instagram it is not workking, hardware goback doesn't trigger onNavigationStateChange
    this.setState({ canGoBack: navState.canGoBack });
  }

  render() {
    return (
      <WebView
        ref={'WEBVIEW_REF'}
        source={this.props.source}
        style={{ marginTop: 0 }}
        domStorageEnabled={true}
        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
      />
    );
  }
}

export default WebViewPage;
