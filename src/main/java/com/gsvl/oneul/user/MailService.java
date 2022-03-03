package com.gsvl.oneul.user;

import com.gsvl.oneul.user.model.MailDto;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MailService {
//    @Autowired
//    private JavaMailSender javaMailSender;
//
////    private static final String FROM_ADDRESS = "ju39001@naver.com";
//    public void mailSend(MailDto mailDto){
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(mailDto.getAddress());
//        message.setSubject(mailDto.getTitle());
//        message.setText(mailDto.getMessage());
//        javaMailSender.send(message);
//    }

}
