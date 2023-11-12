import { useTranslation } from "react-i18next";
import { MdCategory, MdFeedback, MdViewCarousel } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { MdPublic } from "react-icons/md";
import { FaCity } from "react-icons/fa"
import { BiSolidCoupon, BiSolidOffer, BiStoreAlt } from "react-icons/bi"
import { IoMdColorWand } from "react-icons/io"
import NotificationsIcon from '@mui/icons-material/Notifications';
import { SiBrandfolder } from "react-icons/si"
import { BsFillCartCheckFill } from "react-icons/bs"
import { MdSecurity } from "react-icons/md"

const Links = () => {
  const { t } = useTranslation();




  const dashBoardNavLinks = [
    {
      title: t("links.cpMangment"),
      href: "/cp-management",
      icon: <MdManageAccounts />,

    },
    {
      title: t("links.category"),
      href: "/category",
      icon: <MdCategory />,

    },
    {
      title: t("links.notification"),
      href: "/notifications",
      icon: <NotificationsIcon />,

    }, {
      title: t("links.category"),
      href: "/category",
      icon: <MdCategory />,

    }, {
      title: t("links.category"),
      href: "/category",
      icon: <MdCategory />,

    }, {
      title: t("links.category"),
      href: "/category",
      icon: <MdCategory />,

    }, {
      title: t("links.category"),
      href: "/category",
      icon: <MdCategory />,

    }, {
      title: t("links.category"),
      href: "/category",
      icon: <MdCategory />,

    }, {
      title: t("links.category"),
      href: "/category",
      icon: <MdCategory />,

    }, {
      title: t("links.category"),
      href: "/category",
      icon: <MdCategory />,

    },
    {
      title: t("links.category"),
      href: "/category",
      icon: <MdCategory />,

    },
  ]
  return {
    dashBoardNavLinks
  }
}
export default Links
