package com.gsvl.oneul.user;

import com.gsvl.oneul.common.security.SecurityUserService;
import com.gsvl.oneul.user.model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired private UserMapper mapper;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private SecurityUserService securityUserService;

    public int join(UserEntity entity){
        //패스워드 암호화
        entity.setU_pw(passwordEncoder.encode(entity.getU_pw()));
        entity.setU_pfnum(1);
        int result = securityUserService.join(entity);
        return result;
    }


}
