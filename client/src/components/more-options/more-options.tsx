import { Box, Flex, Text } from "@chakra-ui/react";

function MoreOptions() {
  return (
    <Box as={Flex} alignSelf="flex-end" alignItems="center" w="auto" h="40px">
      <Text
        fontSize="10px"
        fontWeight="medium"
        bg="brand.white"
        p={1}
        cursor="pointer"
      >
        More Options
      </Text>
    </Box>
  );
}

export { MoreOptions };
