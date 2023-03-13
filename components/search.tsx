/* eslint-disable react/no-children-prop */
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

interface Props {
  handleSearch: (value: string) => void;
}

export default function Search({ handleSearch }: Props) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };

  return (
    // eslint-disable-next-line react/jsx-no-comment-textnodes
    <InputGroup mb={4}>
      <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
      <Input
        type="text"
        placeholder="Search by content"
        onChange={handleInputChange}
      />
    </InputGroup>
  );
}
