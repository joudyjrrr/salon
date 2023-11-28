import { useTranslation } from "react-i18next";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CategoryIcon from "@mui/icons-material/Category";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import FlagIcon from "@mui/icons-material/Flag";
import DiscountIcon from "@mui/icons-material/Discount";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import FeedbackIcon from "@mui/icons-material/Feedback";
import UpdateIcon from "@mui/icons-material/Update";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import SecurityIcon from '@mui/icons-material/Security';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
const Links = () => {

  const { t } = useTranslation();

  const dashBoardNavLinks = [
    {
      title: t("links.cpMangment"),
      href: "/cp-management",
      icon: <GroupIcon />,
    },
    {
      title: t("links.Permission"),
      href: "/permission",
      icon: <SecurityIcon />,
    },
    {
      title: t("links.category"),
      href: "/category",
      icon: <CategoryIcon />,
    },
    {
      title: t("links.notification"),
      href: "/notifications",
      icon: <NotificationsIcon />,
    },
    {
      title: t("links.country"),
      href: "/country",
      icon: <FlagIcon />,
    },
    {
      title: t("links.city"),
      href: "/city",
      icon: <LocationCityIcon />,
    },
    {
      title: t("links.salon"),
      href: "/salon",
      icon: <HomeIcon />,
    },
    {
      title: t("links.coupon"),
      href: "/coupon",
      icon: <DiscountIcon />,
    },
    {
      title: t("links.banner"),
      href: "/banner",
      icon: <ViewCarouselIcon />,
    },
    {
      title: t("links.FeedBack"),
      href: "/feedBack",
      icon: <FeedbackIcon />,
    },
    {
      title: t("links.version"),
      href: "/version",
      icon: <UpdateIcon />
    },
    {
      title: t("links.booking"),
      href: "/booking",
      icon: <ShoppingCartCheckoutIcon />,
    },
    {
      title: t("links.fqa"),
      href: "/fQa",
      icon: <HelpOutlineIcon />,
    },
  ];
  return {
    dashBoardNavLinks,
  };
};
export default Links;
