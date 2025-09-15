import { Component, type ReactNode } from 'react';
import { GameInfo, GamingBoxUI, GamingImage } from './styledComp';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { RootAppStore } from '../../Store/RootAppStore';
interface IndividualGamingProps {
  game: {
    id: string;
    thumbnail_url: string;
    title: string;
    view_count: string;
  };
  rootAppStore?: RootAppStore;
}

class IndividualGaming extends Component<IndividualGamingProps> {
  render(): ReactNode {
    const { game, rootAppStore } = this.props;
    if (!rootAppStore) return null;
    const theme = rootAppStore.themeStore.theme;

    const linkStyle = {
      textDecoration: 'none',
      color: theme === 'light' ? '#000' : '#fff',
    };

    return (
      <Link to={`/videos/${game.id}`} style={linkStyle}>
        <GamingBoxUI style={{ color: theme === 'light' ? '#000' : '#fff' }}>
          <GamingImage>
            <img src={game.thumbnail_url} alt={game.title} />
          </GamingImage>
          <GameInfo>
            <h3>{game.title}</h3>
            <p>{game.view_count} Watching Worldwide</p>
          </GameInfo>
        </GamingBoxUI>
      </Link>
    );
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default inject('rootAppStore')(observer(IndividualGaming));
