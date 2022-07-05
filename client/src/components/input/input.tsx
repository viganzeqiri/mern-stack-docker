import {
  Flex,
  Icon,
  Input as ChakraInput,
  Text,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { AiOutlineInfoCircle } from "react-icons/ai";

import { InputHTMLAttributes } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  showInfo?: boolean;
  group?: boolean;
  isInvalid?: boolean;
}

function Input({
  label,
  value,
  type,
  placeholder,
  disabled,
  showInfo,
  group,
  isInvalid,
  onChange,
}: IInputProps) {
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

      {group ? (
        <InputGroup>
          <ChakraInput
            disabled={disabled}
            bg="brand.white"
            value={value}
            placeholder={placeholder}
            isInvalid={isInvalid}
            type={type}
            onChange={onChange}
          />
          <InputRightAddon children="Max: 10000" />
        </InputGroup>
      ) : (
        <ChakraInput
          disabled={disabled}
          bg="brand.white"
          value={value}
          type={type}
          placeholder={placeholder}
          isInvalid={isInvalid}
          onChange={onChange}
        />
      )}
    </div>
  );
}

export { Input };
