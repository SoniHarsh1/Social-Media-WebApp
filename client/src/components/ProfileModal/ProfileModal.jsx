import { Modal, useMantineTheme } from "@mantine/core";
import React from "react";
import "./ProfileModal.css";
import "../../pages/Auth/Auth.css"

function ProfileModal({ modalOpened, setModalOpened }) {
  const theme = useMantineTheme();

  return (
    <Modal
      overlayProps={{
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoform">
        <h3>Your Info</h3>
        <div>
          <input
            type="text"
            placeholder="First Name"
            className="infoInput"
            name="firstname"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="infoInput"
            name="lastname"
          />
        </div>
        <div>
        <input
            type="text"
            placeholder="Works At"
            className="infoInput"
            name="worksAt"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Lives In"
            className="infoInput"
            name="livesIn"
          />
          <input
            type="text"
            placeholder="Country"
            className="infoInput"
            name="country"
          />
        </div>
        <div>
        <input
            type="text"
            placeholder="RelationShip Status"
            className="infoInput"
            name="relationStatus"
          />
        </div>
        <div>
            Profile Image
            <input type="file" name="profileImg" />
            Cover Image
            <input type="file" name="coverImg" />
        </div>

        <button className="button infoButton" type="submit">Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
