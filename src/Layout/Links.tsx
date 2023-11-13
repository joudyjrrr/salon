import { useTranslation } from "react-i18next";
import { MdCategory } from "react-icons/md";
import NotificationsIcon from '@mui/icons-material/Notifications';
import CategoryIcon from '@mui/icons-material/Category';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
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
    },
    {
      title: t("links.salon"),
      href: "/salon",
      icon: <HomeIcon />,

    }
  ]
  return {
    dashBoardNavLinks
  }
}
export default Links
