package com.gsvl.oneul.user;

import com.gsvl.oneul.common.security.AuthenticationFacade;
import com.gsvl.oneul.common.security.SecurityUserService;
import com.gsvl.oneul.user.model.UserDTO;
import com.gsvl.oneul.user.model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired private UserMapper mapper;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private SecurityUserService securityUserService;
    @Autowired private AuthenticationFacade auth;

    public int join(UserEntity entity){
        //패스워드 암호화
        entity.setU_pw(passwordEncoder.encode(entity.getU_pw()));
        entity.setU_pfnum(1);
        int result = securityUserService.join(entity);
        return result;
    }

    //찜목록
    //음식찜
    public int isZzimFood(UserDTO dto){
        return mapper.isZzimFood(dto);
    }
    public int insZzimFood(UserDTO dto){
        return mapper.insZzimFood(dto);
    }
    public int delZzimFood(UserDTO dto){
        return mapper.delZzimFood(dto);
    }




    public int isZzimJmt(UserDTO dto){
        return mapper.isZzimJmt(dto);
    }



}
