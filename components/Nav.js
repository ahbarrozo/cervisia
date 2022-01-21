import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import { useCallback } from "react";
import { useCurrentUser } from "@/lib/hooks/useUser";
import fetcher from "@/lib/fetcher";
import toast from "react-hot-toast";
import SearchBar from "@/components/SearchBar";

// importing icons
import SvgAdd from "./Icons/Add";
import SvgBreweries from "./Icons/Breweries";
import SvgMap from "./Icons/Map";
import SvgTag from "./Icons/Tag";
import SvgTop from "./Icons/Top";
import SvgLogo from "./Icons/Logo";

export const menu = [
  { slug: "/breweries", title: "Breweries", icon: <SvgBreweries /> },
  { slug: "/tags", title: "Tags", icon: <SvgTag /> },
  { slug: "/top", title: "Top", icon: <SvgTop /> },
  { slug: "/add", title: "Add", icon: <SvgAdd /> },
  { slug: "/map", title: "Map", icon: <SvgMap /> },
];

export default function Nav() {
  const { data: { user } = {}, mutate } = useCurrentUser();

  /*  TODO: CREATE DROPDOWN MENUS FOR ACCOUNT USING
  TEMPLATE BELOW
  import { useRouter } from "next/router";
  
  const [visible, setVisible] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const onRouteChangeComplete = () => setVisible(false);
    router.events.on('routeChangeComplete', onRouteChangeComplete);
    return () =>
      router.events.off('routeChangeComplete', onRouteChangeComplete);
  }); */

  const handleLogout = useCallback(async () => {
    try {
      await fetcher("/api/auth", {
        method: "DELETE",
      });
      toast.success("You have been signed out");
      mutate({ user: null });
    } catch (e) {
      toast.error(e.message);
    }
  }, [mutate]);

  return (
    <NavStyles>
      <div className="nav__section">
        <div className="nav__section--logo">
          <Link href="/">
            <a>
              <SvgLogo />
            </a>
          </Link>
        </div>
        <div className="nav__section--menu">
          {menu.map((item) => (
            <li key={item.title}>
              <Link href={item.slug}>
                <a>
                  <div className="nav__link">
                    {item.icon}
                    {item.title}
                  </div>
                </a>
              </Link>
            </li>
          ))}
        </div>
        <div className="nav__section--search">
          <SearchBar />
        </div>
        {!user ? (
          <div className="nav__section--auth">
            <li key="Register" className="nav__link">
              <Link href="/register">Register</Link>
            </li>
            <li key="Login" className="nav__link">
              <Link href="/login">Login</Link>
            </li>
          </div>
        ) : (
          <div className="nav__section--auth">
            <li key="Account" className="nav__link">
              <Link href="/register">Account</Link>
            </li>
            <li key="Login" className="nav__link">
              <span className="pseudoLink" onClick={handleLogout}>
                Logout
              </span>
            </li>
          </div>
        )}
      </div>
    </NavStyles>
  );
}
