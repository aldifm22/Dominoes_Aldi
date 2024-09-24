import { useState } from "react";
import {
  Heading,
  Button,
  Box,
  SimpleGrid,
  Text,
  Input,
} from "@chakra-ui/react";
import { sort, countDoubleNumber } from "./utils";
import "./App.css";

const initialDominoes = [
  [1, 2],
  [1, 1],
  [4, 1],
  [3, 4],
  [6, 1],
  [5, 1],
  [3, 2],
  [2, 3],
  [3, 1],
  [5, 1],
];

export default function App() {
  const [dominoes, setDominoes] = useState(initialDominoes);
  const [sortOrder, setSortOrder] = useState("asc");
  const [totalToRemove, setTotalToRemove] = useState("");

  const countDoubles = () => countDoubleNumber(dominoes);
  const sortDominoes = (order) => {
    const sorted = sort(dominoes, order);
    setDominoes(sorted);
    setSortOrder(order);
  };
  const removeDuplicates = () => {
    const uniqueDominoes = dominoes.filter(
      (domino, index, self) =>
        index ===
        self.findIndex(
          ([a, b]) =>
            (a === domino[0] && b === domino[1]) ||
            (a === domino[1] && b === domino[0])
        )
    );
    setDominoes(uniqueDominoes);
  };
  const flipCards = () => {
    const flippedDominoes = dominoes.map(([a, b]) => [b, a]);
    setDominoes(flippedDominoes);
  };
  const removeByTotal = () => {
    const total = parseInt(totalToRemove, 10);
    if (!isNaN(total)) {
      const filtered = dominoes.filter(([a, b]) => a + b !== total);
      setDominoes(filtered);
    }
  };
  const resetData = () => {
    setDominoes(initialDominoes);
    setTotalToRemove("");
  };

  return (
    <Box p={5}>
      <Heading mb={6}>Domino Cards</Heading>

      <Box mb={4}>
        <Button mr={2} colorScheme="teal" onClick={() => sortDominoes("asc")}>
          Sort Asc
        </Button>
        <Button mr={2} colorScheme="teal" onClick={() => sortDominoes("desc")}>
          Sort Desc
        </Button>
        <Button mr={2} colorScheme="teal" onClick={removeDuplicates}>
          Remove Duplicates
        </Button>
        <Button mr={2} colorScheme="teal" onClick={flipCards}>
          Flip Cards
        </Button>
        <Input
          placeholder="Enter total to remove"
          value={totalToRemove}
          onChange={(e) => setTotalToRemove(e.target.value)}
          width="200px"
          mr={2}
        />
        <Button mr={2} colorScheme="teal" onClick={removeByTotal}>
          Remove by Total
        </Button>
        <Button colorScheme="red" onClick={resetData}>
          Reset Data
        </Button>
      </Box>

      <SimpleGrid columns={10} spacing={1}>
        {dominoes.map(([a, b], index) => (
          <Box
            key={index}
            className="domino"
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Text className="domino-number">{a}</Text>
            <Text className="domino-number">{b}</Text>
          </Box>
        ))}
      </SimpleGrid>

      <Box mt={4}>
        <Text fontSize="xl">
          <strong>Doubles Detected:</strong> {countDoubles()}
        </Text>
      </Box>
    </Box>
  );
}
