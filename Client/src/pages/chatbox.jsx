import React, { useState, useEffect } from 'react';
import './Chatbox.css';

const ChatComponent = () => {
    const [state, setState] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');



    const toggleState = () => {
        setState(!state);

    };

    const onSendButton = () => {
        if (inputText === '') {
            return;
        }

        const msg1 = { name: 'User', message: inputText };
        setMessages([...messages, msg1]);

        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: JSON.stringify({ message: inputText }),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((r) => r.json())
            .then((r) => {
                setMessages(prevMessages => [...prevMessages, { name: 'Sam', message: r.answer }]);
                setInputText('');
            })
            .catch((error) => {
                console.error('Error:', error);
                setInputText('');
            });
    };

    const handleKeyPress = (key) => {
        if (key === 'Enter') {
            onSendButton();
        }
    };

    useEffect(() => {
        const openButton = document.querySelector('.chatbox__button');
        const sendButton = document.querySelector('.send__button');
        const node = document.querySelector('.chatbox__support input');

        const handleOpenButtonClick = () => {
            toggleState();
        };

        const handleSendButtonClick = () => {
            onSendButton();
        };

        const handleKeyUp = ({ key }) => {
            handleKeyPress(key);
        };

        if (openButton) {
            openButton.addEventListener('click', handleOpenButtonClick);
        }

        if (sendButton) {
            sendButton.addEventListener('click', handleSendButtonClick);
        }

        if (node) {
            node.addEventListener('keyup', handleKeyUp);
        }

        return () => {
            if (openButton) {
                openButton.removeEventListener('click', handleOpenButtonClick);
            }

            if (sendButton) {
                sendButton.removeEventListener('click', handleSendButtonClick);
            }

            if (node) {
                node.removeEventListener('keyup', handleKeyUp);
            }
        };
    }, [state, inputText, messages]);

    const updateChatText = () => {
        return messages
            .slice()
            // .reverse()
            .map((item, index) => {
                if (item.name === 'Sam') {
                    return (
                        <div key={index} className="messages__item messages__item--visitor">
                            {item.message}
                        </div>
                    );
                } else {
                    return (
                        <div key={index} className="messages__item messages__item--operator">
                            {item.message}
                        </div>
                    );
                }
            });
    };

    return (
        <div className="container">
            <div className="chatbox">
                {state && (
                    <div className="chatbox__support chatbox--active">
                        <div className="chatbox__header">
                            <div className="chatbox__image--header">
                                <img src="https://vi.seaicons.com/wp-content/uploads/2016/08/shop-icon.png" width="30" height="30" alt="image" />
                            </div>
                            <div className="chatbox__content--header">
                                <h4 className="chatbox__heading--header">Trò chuyện nhanh</h4>
                                <p className="chatbox__description--header">Beauty shop hân hạnh phục vụ bạn!</p>
                            </div>
                        </div>
                        <div className="chatbox__messages">
                            <div>{updateChatText()}</div>
                        </div>
                        <div className="chatbox__footer">
                            <input type="text" placeholder="Write a message..." value={inputText}
                                onChange={(e) => setInputText(e.target.value)} />
                            <button className="chatbox__send--footer send__button" ><i className="bi bi-send-fill text-3xl"></i></button>
                        </div>
                    </div>

                )}

                <div className="chatbox__button">
                    <button><img width={50} height={50} src="https://cdn-icons-png.flaticon.com/512/4213/4213934.png" /></button>
                </div>
            </div>
        </div>





    );
};

export default React.memo(ChatComponent);
