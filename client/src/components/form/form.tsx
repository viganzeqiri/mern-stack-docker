import { Alert, AlertIcon, Box } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  FormTitle,
  UploadImage,
  Input,
  TextArea,
  Button,
  Select,
  MoreOptions,
} from "components";
import { FormStateTypes } from "types/form-state-types";

import "./form.scss";

function Form() {
  const [alert, setAlert] = useState({ type: "success", message: "" });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormStateTypes>({
    defaultValues: {
      image: null,
      chain: "eth",
      storage: "ipfs",
      collectionName: "",
      collectionSymbol: "",
      amount: 0,
      address: "0x7db3c4099660a6f33bBfF63B3318CBf9b4D07743",
      description: "",
    },
  });

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;

    if (alert) {
      timerId = setTimeout(() => setAlert({ type: "", message: "" }), 3000);
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert.message]);

  async function onSubmit(data: FormStateTypes) {
    const formData = new FormData();

    formData.append("image", data.image!);
    formData.append("chain", data.chain);
    formData.append("storage", data.storage);
    formData.append("collectionName", data.collectionName);
    formData.append("collectionSymbol", data.collectionSymbol);
    formData.append("amount", data.amount.toString());
    formData.append("address", data.address);
    formData.append("description", data.description);

    try {
      const response = await fetch("http://localhost:4000/createCollection", {
        body: formData,
        method: "POST",
      });
      await response.json();
      setAlert({
        type: "success",
        message: "Data uploaded to the server. Congrats!!!",
      });
      reset();
    } catch (err) {
      setAlert({
        type: "error",
        message: "Failed to save data on server. Uppss!!!",
      });
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!!alert.message && (
        <Alert status={alert.type as "success" | "error"} variant="solid">
          <AlertIcon />
          {alert.message}
        </Alert>
      )}
      <Box className="form-container">
        <FormTitle />

        <Controller
          name="image"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => {
            return (
              <UploadImage
                onChange={onChange}
                selectedImage={value as File}
                isInvalid={!!errors?.image}
              />
            );
          }}
        />

        <Controller
          name="chain"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => {
            return (
              <Select
                onChange={onChange}
                value={value}
                label="Blockchain *"
                showInfo
                options={[
                  { option: "ETH", value: "eth" },
                  { option: "Polygon", value: "matic" },
                ]}
              />
            );
          }}
        />

        <Controller
          name="storage"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => {
            return (
              <Select
                onChange={onChange}
                value={value}
                label="Save my data on *"
                options={[
                  { option: "IPFS", value: "ipfs" },
                  { option: "Arweave", value: "arweave" },
                ]}
                showInfo
              />
            );
          }}
        />

        <Controller
          name="collectionName"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => {
            return (
              <Input
                isInvalid={!!errors?.collectionName}
                onChange={onChange}
                value={value}
                label="Name of the collection *"
                placeholder="Enter a name"
              />
            );
          }}
        />

        <Controller
          name="collectionSymbol"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => {
            return (
              <Input
                isInvalid={!!errors?.collectionSymbol}
                onChange={onChange}
                value={value}
                label="Symbol of the collection *"
                placeholder="Enter a symbol"
              />
            );
          }}
        />

        <Controller
          name="amount"
          control={control}
          rules={{ required: true, validate: (value) => value < 10000 }}
          render={({ field: { onChange, value } }) => {
            return (
              <Input
                type="number"
                isInvalid={!!errors?.amount}
                onChange={onChange}
                value={value}
                label="Amount of the NFTs in the collection *"
                placeholder="Enter an amount"
                group
              />
            );
          }}
        />

        <Controller
          name="address"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => {
            return (
              <Input
                isInvalid={!!errors?.address}
                onChange={onChange}
                value={value}
                label="Owner *"
                disabled
                showInfo
              />
            );
          }}
        />

        <MoreOptions />

        <Controller
          name="description"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => {
            return (
              <TextArea
                isInvalid={!!errors?.description}
                onChange={onChange}
                value={value}
                label="Description *"
                placeholder="Enter a description"
              />
            );
          }}
        />

        <Button type="submit">Continue</Button>
      </Box>
    </form>
  );
}

export { Form };
