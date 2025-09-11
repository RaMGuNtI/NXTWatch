import { InputSection } from './styledComponent';

interface InputProps {
  fetchVideos: () => void;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

const InputElement = (props: InputProps) => {
  return (
    <InputSection data-testid="input-section">
      <input
        placeholder="Search"
        value={props.searchInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          props.setSearchInput(e.target.value)
        }
      />
      <button onClick={() => props.fetchVideos()}>🔍</button>
    </InputSection>
  );
};

export default InputElement;
