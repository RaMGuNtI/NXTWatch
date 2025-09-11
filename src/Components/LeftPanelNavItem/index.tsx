import { Component, type ReactNode } from 'react';
import { SepCatVideo } from './styledComp';

interface Props {
  navigate: (path: string) => void;
  location: {
    pathname: string;
  };
  theme: 'light' | 'dark';
  icon: ReactNode;
  text: string;
  path: string;
}

class LeftPanelNavItem extends Component<Props> {
  render(): ReactNode {
    const { theme, icon, text } = this.props;
    return (
      <SepCatVideo
        style={{
          backgroundColor: theme === 'light' ? '' : '#242424',
          color: theme === 'light' ? '' : '#fff',
        }}
        $active={this.props.location.pathname === this.props.path}
        onClick={() => {
          this.props.navigate(this.props.path);
        }}
      >
        {icon}
        <p>{text}</p>
      </SepCatVideo>
    );
  }
}

export default LeftPanelNavItem;
