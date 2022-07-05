import { Text, Textarea as ChakraTextArea } from "@chakra-ui/react";
import { TextareaHTMLAttributes } from "react";

interface ITextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  isInvalid?: boolean;
}

function TextArea({
  value,
  onChange,
  label = "",
  placeholder,
  isInvalid = false,
}: ITextAreaProps) {
  return (
    <div>
      <Text
        fontSize="sm"
        fontWeight="medium"
        mb={1}
        color={isInvalid ? "brand.error" : "unset"}
      >
        {label}
      </Text>
      <ChakraTextArea
        h={100}
        resize="none"
        bg="brand.white"
        value={value}
        isInvalid={isInvalid}
        placeholder={placeholder}
        onChange={onChange}
      >
        {value}
      </ChakraTextArea>
    </div>
  );
}

export { TextArea };
