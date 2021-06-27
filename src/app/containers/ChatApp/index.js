import React from "react";
import styled from "styled-components";
import UserChatWindow from "./userChatWindow";
import UserList from "./users";

function ChatApp() {
  return (
    <RootDiv>
      <ChatScreen>
        <UserList />
        <UserChatWindow />
      </ChatScreen>
    </RootDiv>
  );
}

export default ChatApp;

const RootDiv = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
  background-image: linear-gradient(
    to bottom left,
    rgb(21 23 78) 60%,
    rgb(43 45 170) 100%
  );
`;

const ChatScreen = styled.div`
  display: flex;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 80%;
  height: 80vh;
  position: absolute;
  background-color: white;
  border-radius: 15px;
  border: 1px solid grey;
  box-shadow: 0px 0px 40px rgb(0 0 0 / 90%);
`;
