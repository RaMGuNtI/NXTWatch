import { InputSection } from './styledComponent';

interface InputProps {
  fetchVideos: () => void;
  searchInput: string;
  setterInput: (text: string) => void;
}

const InputElement = (props: InputProps) => {
  return (
    <InputSection data-testid="input-section">
      <input
        placeholder="Search"
        value={props.searchInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          props.setterInput(e.target.value)
        }
      />
      <button onClick={() => props.fetchVideos()}>🔍</button>
    </InputSection>
  );
};

export default InputElement;
