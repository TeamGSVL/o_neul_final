package com.gsvl.oneul.user.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserDTO {
    private String u_id;
    private String u_pw;
    private String u_nm;
    private String u_email;
    private String auth = "ROLE_USER";
}
