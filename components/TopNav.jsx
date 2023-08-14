import React, { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import verifyUser from "../utils/verify-user";
import Search from "./Search";

const TopNav = () => {
  const { data: session } = useSession();
  const [width, setWidth] = useState();
  useEffect(() => {
    if (session) {
      console.log("Session: " + session);
      verifyUser(session.user);
      // alert(`Hi, ${session.user.name}!`);
    }
  }, [session]);
  useLayoutEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  return (
    <div style={styles.box}>
      <div
        style={
          width > 560
            ? styles.container
            : { ...styles.container, padding: "0 18px" }
        }
      >
        <Image src="/logo.svg" width={165} height={29} alt="logo" />
        <div style={styles.right}>
          {width > 560 && <Search />}
          {!session ? (
            <>
              <button
                style={styles.authButton}
                onClick={() => signIn("google")}
              >
                <Image src="/google.svg" width={19.58} height={20} alt="logo" />
                Login
              </button>
            </>
          ) : (
            <div style={styles.user}>
              <button style={styles.authButton} onClick={() => signOut()}>
                Sign out
              </button>
            </div>
          )}
        </div>
        {width <= 560 && <Search />}
      </div>
    </div>
  );
};

export default TopNav;

const styles = {
  box: {
    boxShadow: "0px 1px 4px 0px rgba(41, 51, 85, 0.08)",
    padding: "12px 0",
    position: "fixed",
    top: 0,
    backgroundColor: "#fff",
    width: "100%",
    zIndex: 200,
  },
  container: {
    maxWidth: 1228,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "auto",
    flexWrap: "wrap",
    gap: 6,
    alignSelf: "center",
    alignItems: "center",
  },
  right: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  authButton: {
    backgroundColor: "#fff",
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    fontSize: 16,
    color: "#6B7088",
    borderColor: "#F2F2FB",
    padding: "12px 36px",
    borderWidth: 1,
    border: "1.5px solid #e8e8f3",
    borderRadius: 12,
    // marginRight: 12,
  },
  user: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
};
