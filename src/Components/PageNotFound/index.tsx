import { Component } from 'react';
import { PageNF } from './styledComp';
import { AppContext } from '../../Context/ThemeSaveContext';
class PageNotFound extends Component {
  static contextType = AppContext;
  declare context: React.ContextType<typeof AppContext>;
  render() {
    const ctx = this.context;
    if (!ctx) return null;
    const { theme } = ctx;
    return (
      <PageNF
        style={{
          backgroundColor: theme === 'light' ? '' : '#4a4a4a',
          color: theme === 'light' ? '#4a4a4a' : '#fff',
        }}
      >
        {theme === 'light' ? (
          <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png" />
        ) : (
          <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png" />
        )}

        <h1>Page Not Found !!!</h1>
      </PageNF>
    );
  }
}

export default PageNotFound;
