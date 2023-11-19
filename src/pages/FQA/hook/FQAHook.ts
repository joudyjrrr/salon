import { useTranslation } from "react-i18next";

const FQAHook = () => {
  const { t } = useTranslation();

  return {
    t,
  };
};
export default FQAHook;
