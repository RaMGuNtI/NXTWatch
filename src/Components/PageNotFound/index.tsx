import { Component } from 'react';
import { PageNF } from './styledComp';
import { inject, observer } from 'mobx-react';
import { RootAppStore } from '../../Store/RootAppStore';
interface Props {
  rootAppStore?: RootAppStore;
}

class PageNotFound extends Component<Props> {
  render() {
    const { rootAppStore } = this.props;
    if (!rootAppStore) return null;
    const { theme } = rootAppStore.themeStore;

    return (
      <PageNF
        style={{
          backgroundColor: theme === 'light' ? '' : '#4a4a4a',
          color: theme === 'light' ? '#4a4a4a' : '#fff',
        }}
      >
        {theme === 'light' ? (
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
            alt="not found light"
          />
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png"
            alt="not found dark"
          />
        )}

        <h1>Page Not Found !!!</h1>
      </PageNF>
    );
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default inject('rootAppStore')(observer(PageNotFound));
