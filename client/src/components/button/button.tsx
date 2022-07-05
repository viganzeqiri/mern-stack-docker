import { Button as ChakraButton } from "@chakra-ui/react";
import { ButtonHTMLAttributes } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

function Button({ children, type }: IButtonProps) {
  return (
    <div>
      <ChakraButton type={type} bg="brand.black" color="brand.white">
        {children}
      </ChakraButton>
    </div>
  );
}

export { Button };
