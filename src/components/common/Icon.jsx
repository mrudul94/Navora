import {
  LuArrowRight,
  LuBadgeCheck,
  LuBuilding2,
  LuCheck,
  LuChevronRight,
  LuCircleAlert,
  LuCircleCheck,
  LuClipboardList,
  LuFileText,
  LuGlobe,
  LuHandshake,
  LuImage,
  LuLeaf,
  LuMenu,
  LuPackage,
  LuPackageSearch,
  LuSearch,
  LuShoppingBag,
  LuSprout,
  LuStore,
  LuTag,
  LuTrendingUp,
  LuTruck,
  LuUsers,
  LuUtensils,
  LuX,
  LuMapPin,
  LuPhone,
  LuMail,
  LuClock,
  LuArrowUpRight,
  LuBadgeCheck as LuVerified,
} from "react-icons/lu";
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";

/**
 * Named icon map, so content files can reference an icon by a semantic name
 * (`icon: "sourcing"`) without importing from react-icons.
 */
const icons = {
  // What we offer
  sourcing: LuSprout,
  market: LuGlobe,
  product: LuPackage,
  partnership: LuHandshake,

  // Who we work with
  import: LuTruck,
  retail: LuStore,
  foodservice: LuUtensils,
  farmer: LuLeaf,
  brand: LuTag,
  label: LuShoppingBag,

  // Responsible sourcing
  source: LuSearch,
  spec: LuClipboardList,
  evidence: LuFileText,
  support: LuUsers,
  improve: LuTrendingUp,

  // UI
  arrowRight: LuArrowRight,
  chevronRight: LuChevronRight,
  check: LuCheck,
  checkCircle: LuCircleCheck,
  alert: LuCircleAlert,
  verified: LuBadgeCheck,
  menu: LuMenu,
  close: LuX,
  image: LuImage,
  emptyProducts: LuPackageSearch,
  company: LuBuilding2,

  // Contact + social
  pin: LuMapPin,
  phone: LuPhone,
  mail: LuMail,
  clock: LuClock,
  external: LuArrowUpRight,
  linkedin: FaLinkedinIn,
  whatsapp: FaWhatsapp,
  assured: LuVerified,
};

function Icon({ name, className, ...rest }) {
  const Component = icons[name];
  if (!Component) return null;
  return <Component className={className} aria-hidden="true" focusable="false" {...rest} />;
}

export default Icon;
