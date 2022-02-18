package com.gsvl.oneul.user;

import com.gsvl.oneul.user.model.UserDTO;
import com.gsvl.oneul.user.model.UserEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    //회원가입
    int join(UserEntity entity);
    //조회
    UserEntity selUser(UserEntity entity);

    //음식 찜 확인
    int isZzimFood(UserDTO dto);

    //음식 찜 insert
    int insZzimFood(UserDTO dto);

    //음식 찜 delete
    int delZzimFood(UserDTO dto);

    //맛집 찜 확인
    int isZzimJmt(UserDTO dto);

}
