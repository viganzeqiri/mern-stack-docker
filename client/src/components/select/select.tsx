import { Flex, Icon, Select as ChakraSelect, Text } from "@chakra-ui/react";
import { SelectHTMLAttributes } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options?: any[];
  label?: string;
  showInfo?: boolean;
  isInvalid?: boolean;
}

function Select({
  value,
  label,
  showInfo = false,
  options,
  isInvalid,
  onChange,
}: ISelectProps) {
  return (
    <div>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        color={isInvalid ? "brand.error" : "unset"}
      >
        <Text fontSize="sm" fontWeight="medium" mb={1}>
          {label}
        </Text>

        {showInfo && <Icon as={AiOutlineInfoCircle} />}
      </Flex>
      <ChakraSelect
        bg="brand.white"
        value={value}
        onChange={onChange}
        isInvalid={isInvalid}
      >
        {options?.map(({ option, value }) => (
          <option key={option} value={value}>
            {option}
          </option>
        ))}
      </ChakraSelect>
    </div>
  );
}

export { Select };
