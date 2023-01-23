import { useUserStore } from "@/stores/user";

export function userGuard(_from, _to, next) {
  const userStore = useUserStore();
  const { userInfo } = userStore.login;

  if (userInfo) {
    next();
  } else {
    next({ name: "Home" });
  }
}

export function adminGuard(_from, _to, next) {
  const userStore = useUserStore();
  const { userInfo } = userStore.login;

  if (userInfo?.isAdmin) {
    next();
  } else {
    next({ name: "Home" });
  }
}

export function sellerGuard(_from, _to, next) {
  const userStore = useUserStore();
  const userInfo = userStore.login.userInfo;
  if (userInfo && (userInfo.isSeller || userInfo.isAdmin)) {
    next();
  } else {
    next({ name: "Home" });
  }
}
