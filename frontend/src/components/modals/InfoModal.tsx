import { ModalsType } from "@types";
import Modal from "./Modal";
import { TextInput } from "@components/inputs";
import { Button } from "@components/common";
import { useForm } from "react-hook-form";
import { commonApi } from "@api";
import { useState } from "react";

interface InfoModalProps extends ModalsType {
  title: string;
}

const InfoModal: React.FC<InfoModalProps> = ({ title, open, onClose }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
  }>();

  const sendEmilAndDummyLogin = async ({ email }: { email: string }) => {
    setLoading(true);
    await commonApi.subscribe(email);

    onClose();
  };

  return (
    <Modal
      title={title}
      isOpen={open}
      onClose={onClose}
      modalNumber={1}
      content={
        <div className="flex flex-col justify-center items-center w-full h-full p-5">
          <h1 className="text-center text-2xl font-bold text-black">
            Momentálně se nacházíte na demo verzi aplikace.
          </h1>
          <p className="text-center text-gray-600" data-testid="privacy-policy">
            Zadejte email a my Vás budeme informovat o spuštění plné verze.
          </p>
          <form
            className="flex flex-col gap-5 mt-5 justify-center items-center w-full"
            onSubmit={handleSubmit((data) => {
              sendEmilAndDummyLogin(data);
            })}
          >
            <TextInput
              label="Email"
              type="text"
              register={register}
              registerName="email"
              placeholder="novak@email.cz"
              registerProps={{
                required: "Email je povinný",
                pattern: {
                  value: /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Email není ve správném formátu",
                },
              }}
              error={errors.email}
            />
            <Button
              variant="secondary"
              type="submit"
              data-testid="login-button"
              className="w-1/2 h-15 rounded-md"
              loading={loading}
              loadingText="Odesílám..."
            >
              Odeslat
            </Button>
          </form>
        </div>
      }
    />
  );
};

export default InfoModal;
