import { Component } from 'react';
import { PageNF } from './styledComp';
import { inject, observer } from 'mobx-react';
import type { RootStore } from '../../Store/rootStore';

interface Props {
  rootStore?: RootStore;
}

class PageNotFound extends Component<Props> {
  render() {
    const { rootStore } = this.props;
    if (!rootStore) return null;
    const { theme } = rootStore.themeStore;

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
export default inject('rootStore')(observer(PageNotFound));
