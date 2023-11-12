import { useTranslation } from "react-i18next";
import { MdCategory } from "react-icons/md";
import NotificationsIcon from '@mui/icons-material/Notifications';
import CategoryIcon from '@mui/icons-material/Category';
import GroupIcon from '@mui/icons-material/Group';
const Links = () => {
  const { t } = useTranslation();




  const dashBoardNavLinks = [
    {
      title: t("links.cpMangment"),
      href: "/cp-management",
      icon: <GroupIcon />,

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

    }
  ]
  return {
    dashBoardNavLinks
  }
}
export default Links
