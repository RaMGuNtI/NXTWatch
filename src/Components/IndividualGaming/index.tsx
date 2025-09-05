import { Component, type ReactNode } from 'react';
import { GameInfo, GamingBoxUI, GamingImage } from './styledComp';
import { Link } from 'react-router-dom';
import { AppContext } from '../../Context/ThemeSaveContext';
// import { ThemeProvider } from 'styled-components';
// import { light, dark } from './styledComp';
interface IndividualGamingProps {
  game: {
    id: string;
    thumbnail_url: string;
    title: string;
    view_count: string;
  };
}

class IndividualGaming extends Component<IndividualGamingProps> {
  static contextType = AppContext;
  declare context: React.ContextType<typeof AppContext>;
  render(): ReactNode {
    const ctx = this.context;
    if (!ctx) return null;
    const { theme } = ctx;
    const { game } = this.props;
    return (
      // <ThemeProvider theme={theme ? dark : light}>
      <Link
        to={`/videos/${game.id}`}
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <GamingBoxUI
          style={{
            color: theme === 'light' ? '#000' : '#fff',
          }}
        >
          <GamingImage>
            <img src={game.thumbnail_url} />
          </GamingImage>
          <GameInfo>
            <h3>{game.title}</h3>
            <p>{game.view_count} Watching Worldwide</p>
          </GameInfo>
        </GamingBoxUI>
      </Link>
      // </ThemeProvider>
    );
  }
}

// ThemeProvider is not working if link is tag is present

export default IndividualGaming;
