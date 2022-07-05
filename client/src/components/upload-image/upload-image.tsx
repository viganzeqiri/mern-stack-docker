import {
  Box,
  Button,
  Flex,
  IconButton,
  Text,
  Icon,
  Input,
} from "@chakra-ui/react";
import { useRef } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

interface IUploadImageProps {
  onChange?: (file: File) => void;
  selectedImage: File;
  isInvalid?: boolean;
}

function UploadImage({
  onChange,
  selectedImage,
  isInvalid,
}: IUploadImageProps) {
  const inputFile = useRef<HTMLInputElement>(null);

  function onUpload() {
    inputFile.current?.click();
  }

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Box>
        {selectedImage ? (
          <img
            src={URL.createObjectURL(selectedImage)}
            width={110}
            height={100}
            alt="choose"
          />
        ) : (
          <IconButton
            w={110}
            h={100}
            aria-label="upload"
            onClick={onUpload}
            icon={<Icon as={AiOutlineCloudUpload} width={18} height={18} />}
          />
        )}
      </Box>

      <Box>
        <Text
          fontSize="sm"
          fontWeight="medium"
          mb={2}
          color={isInvalid ? "brand.error" : ""}
        >
          {isInvalid ? "Please provide an image!" : "Picture of the collection"}
        </Text>
        <Button
          onClick={onUpload}
          size="sm"
          bg="brand.white"
          color="brand.black"
        >
          Upload
        </Button>
      </Box>

      <Input
        ref={inputFile}
        display="none"
        id="file"
        type="file"
        accept="image/*"
        onChange={(e) => {
          const files = e.target.files as FileList;
          // @ts-ignore
          const [file] = files;

          if (!!file) {
            onChange?.(file);
          }
        }}
      />
    </Flex>
  );
}

export { UploadImage };
