import classNames from "classnames/bind";
import styles from "./Header.module.scss";
const cx = classNames.bind(styles);

import logo from "~/assets/images/logo/logo.png";

import { useState } from "react";

import LoginService from "~/services/LoginService";
import SignUpService from "~/services/SignUpService";

import HeaderActions from "../HeaderActions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { useModal } from "~/context/ModalProvider";
import { useUser } from "~/context/UserProvider";
import { useLangSwitcher } from "~/context/LangSwitcherProvider";

import Modal from "~/components/Modal/Modal";
import LoginForm from "~/components/LoginForm";
import SignUpForm from "~/components/SignUpForm";
import ForgotPasswordForm from "~/components/ForgotPasswordForm";
import LanguageSwitcher from "~/components/LanguageSwitcher";
import { Fragment } from "react";

function Header() {
  const { t } = useLangSwitcher();
  const { currentUser, setCurrentUser, user } = useUser();
  const {
    isLoginOpen,
    isSignUpOpen,
    isForgotPasswordOpen,
    openLoginModal,
    closeLoginModal,
    openSignUpModal,
    closeSignUpModal,
    closeForgotPasswordModal,
  } = useModal();

  const [emailOrPhoneError, setEmailOrPhoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = (emailOrPhone, password) => {
    const { isValid } = LoginService(
      emailOrPhone,
      password,
      user,
      setEmailOrPhoneError,
      setPasswordError,
      setCurrentUser
    );

    if (isValid) {
      closeLoginModal();
    }
  };

  const handleSignUp = (fullName, phoneNumber, email, password) => {
    const newUser = SignUpService(fullName, phoneNumber, email, password);

    if (newUser) {
      alert(t("signUpSuccessful"));
      closeSignUpModal();
      setTimeout(() => {
        openLoginModal();
      }, 100);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("logo-frame")}>
        <img className={cx("logo")} src={logo} alt="Logo" />
        <h1 className={cx("name")}>SnapifyTunes</h1>
      </div>
      {currentUser ? (
        <HeaderActions />
      ) : (
        <>
          <LanguageSwitcher languagesFix iconFix chooseFix />
          <div className={cx("actions")}>
            <button className={cx("sign-up")} onClick={openSignUpModal}>
              <h5>{t("signUp")}</h5>
            </button>
            <button className={cx("log-in")} onClick={openLoginModal}>
              <h5 className={cx("action-btn")}>{t("login")}</h5>
            </button>
            <FontAwesomeIcon className={cx("menu")} icon={faBars} />
          </div>
        </>
      )}
      {isLoginOpen && (
        <Modal isOpen={isLoginOpen} closeModal={closeLoginModal}>
          <LoginForm
            onLogin={handleLogin}
            emailOrPhoneError={emailOrPhoneError}
            passwordError={passwordError}
          />
        </Modal>
      )}

      {isSignUpOpen && (
        <Modal isOpen={isSignUpOpen} closeModal={closeSignUpModal}>
          <SignUpForm onSignUp={handleSignUp} />
        </Modal>
      )}

      {isForgotPasswordOpen && (
        <Modal
          isOpen={isForgotPasswordOpen}
          closeModal={closeForgotPasswordModal}
        >
          <ForgotPasswordForm />
        </Modal>
      )}
    </div>
  );
}

export default Header;
