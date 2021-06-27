import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectUsers } from "../../../store/ducks/chatApp/selector";
import { addUserPost } from "../../../store/ducks/chatApp/slice";

function UserChatWindow() {
  const dispatch = useDispatch();
  const { selectedUser, posts } = useSelector(selectUsers);

  const [message, setMessage] = useState();

  const addMessagesToDom = (
    msg,
    ulEle,
    animationDelay = 0.1,
    scrollbarDelay = 500
  ) => {
    const li = document.createElement("li");
    li.style.animationDelay = `${animationDelay}s`;
    li.setAttribute("id", "cw-msg-grp");
    li.innerHTML = `<img src="img/user.png" />
          <div id="cw-msg">
            ${msg?.title}
          </div>`;
    ulEle?.appendChild(li);
    setTimeout(() => {
      ulEle.scrollTop = ulEle.clientHeight;
    }, scrollbarDelay);
  };

  const loadMessages = useCallback(() => {
    const messagesListEle = document.getElementById(`cw-messages`);
    if (message !== "") {
      messagesListEle.innerHTML = "";
      posts.forEach((msg, i) => {
        addMessagesToDom(msg, messagesListEle, 0.1 * i);
      });
    } else {
      const index = posts.length - 1;
      addMessagesToDom(posts[index], messagesListEle, 0.1, 120);
    }
  }, [posts, message]);

  useEffect(() => {
    if (posts?.length && posts[0]?.userId === selectedUser?.id) loadMessages();
  }, [selectedUser, posts, loadMessages]);

  const sendMessage = () => {
    const payload = {
      title: message,
      body: message,
      userId: selectedUser.id,
    };
    dispatch(addUserPost({ data: payload }));
    setMessage("");
  };
  return Object.keys(selectedUser)?.length === 0 ? (
    <WelcomeText>
      <div>
        <h3>Welcome User!</h3>
        <h4>Please select a user to see his messages</h4>
      </div>
    </WelcomeText>
  ) : (
    <UserChatWindowDiv>
      <div id="cw-heading">
        <h4>Chat Messages</h4>
      </div>
      <div id="cw-content">
        <ul id="cw-messages" className="custom-scrollbar"></ul>
        <div id="cw-input-box">
          <p>New message</p>
          <div id="cw-text">
            <textarea
              className="custom-scrollbar"
              rows="3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>
              <span>
                Send
                <i className="fas fa-paper-plane" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </UserChatWindowDiv>
  );
}

export default UserChatWindow;

const WelcomeText = styled.div`
  width: 70%;
  color: #103195;
  background: #f5f7fac7;
  border-top-right-radius: 10px;
  position: relative;
  div {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
  }
`;

const UserChatWindowDiv = styled.div`
  width: 70%;
  color: #103195;
  background: #f5f7fac7;
  border-top-right-radius: 10px;

  #cw-heading {
    color: white;
    padding: 20px;
    background-image: linear-gradient(
      -145deg,
      #091379,
      #00dcff 50%,
      #091379 100%
    );
    border-top-right-radius: inherit;
  }
  #cw-messages {
    height: calc(80vh - 200px);
    overflow-y: auto;
    li {
      opacity: 0;
      animation: fadeIn 0.1s;
      animation-fill-mode: forwards;
    }
  }
  @keyframes fadeIn {
    0% {
      opacity: 1;
      margin-left: -100px;
    }
    25% {
      opacity: 1;
      margin-left: -75px;
    }
    50% {
      opacity: 1;
      margin-left: -50px;
    }
    75% {
      opacity: 1;
      margin-left: -25px;
    }
    100% {
      opacity: 1;
      margin-left: 0px;
    }
  }
  #cw-msg-grp {
    display: flex;
    align-items: center;
    padding: 0 20px;

    img {
      margin-right: 5px;
    }
    #cw-msg {
      margin: 10px;
      border-radius: 25px;
      background-image: linear-gradient(to right, #87dcbd 50%, #88dc90 100%);
      padding: 10px 15px;
    }
  }
  #cw-text {
    display: flex;
    align-items: center;
    button {
      padding: 5px 15px;
      border-radius: 20px;
      margin-left: 5px;
      border: 2px solid #103195;
      color: #103195;
      outline: none;
      cursor: pointer;
      span {
        display: inline-flex;
      }
      i {
        margin-left: 5px;
      }
    }
  }
  #cw-input-box {
    bottom: 0;
    height: 120px;
    width: 70%;
    padding: 0 20px;
    position: absolute;
    p {
      position: relative;
      :after {
        content: "";
        width: calc(100% - 102px);
        height: 2px;
        background: #103195;
        right: 0;
        top: 50%;
        position: absolute;
      }
    }
    textarea {
      border: 0px;
      padding: 0px;
      resize: none;
      outline: none;
      box-shadow: none;
      width: 100%;
      height: 50px;
      z-index: 1;
      font-size: 16px;
      background-color: transparent;
    }
  }
`;
