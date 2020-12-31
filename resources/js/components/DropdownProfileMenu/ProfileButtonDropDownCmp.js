import React from "react";
import ProfileDropDownButton from "./ProfileDropDownButton";
import ProfileDropDownCard from "./ProfileDropDownCard";

//new Array(7).fill("item name");
const ProfileButtonWithDropDownCmp = ({currentUserUsername}) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = ([
    'Profile',
    'Settings',
    'Log Out',
    'Night Mode',
  ]);
  const drop = React.useRef(null);
  function handleClick(e) {
    if (!e.target.closest(`.${drop.current.className}`) && open) {
      setOpen(false);
    }
  }
  React.useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
  return (
    <div
      className="dropdown"
      ref={drop}
      style={{
        flex: '1 0 auto',
        flex: '1',
        position: "relative",
        //margin: "16px",
        width: "auto",
        display: "inline-block"
      }}
    >
      <ProfileDropDownButton currentUserUsername={currentUserUsername} onClick={() => setOpen(open => !open)} />
      {open && <ProfileDropDownCard options={options} setOpen={setOpen} />}
    </div>
  );
};

export default ProfileButtonWithDropDownCmp;
