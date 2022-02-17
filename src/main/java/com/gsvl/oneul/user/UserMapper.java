package com.gsvl.oneul.user;

import com.gsvl.oneul.user.model.UserEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    //회원가입
    int join(UserEntity entity);
    //조회
    UserEntity selUser(UserEntity entity);
}
