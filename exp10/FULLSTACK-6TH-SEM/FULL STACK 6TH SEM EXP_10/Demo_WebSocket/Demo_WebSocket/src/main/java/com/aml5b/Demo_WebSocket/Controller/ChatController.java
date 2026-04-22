package com.aml2b.Demo_WebSocket.Controller;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.stereotype.Controller;

import com.aml2b.Demo_WebSocket.Model.Message;

@Controller
public class ChatController {

    @MessageMapping("/chat")          // client sends here
    @SendTo("/topic/messages")        // broadcast to all
    public Message sendMessage(Message message) {
        System.out.println(message.getSender()+" : "+ message.getContent());
        return message;
    }
}